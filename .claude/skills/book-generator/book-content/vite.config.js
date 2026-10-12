import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// This app lives at <host-project>/.claude/skills/book-generator/book-content
// — i.e. shipped as part of the book-generator skill itself, not as
// project-specific tooling — so it can be copied into any project's
// .claude/skills/ wholesale and keep working. `components/` (with its
// `assets/fonts`) lives right inside this same folder, so `@components`
// needs no repo-wide path at all, while `hostProjectRoot` walks up out of
// the skill to find the host project's own `data/` folder, which is
// project content and can never live inside the portable skill.
const hostProjectRoot = path.resolve(__dirname, '../../../..');
const hostDataDir = path.join(hostProjectRoot, 'data');

export default defineConfig({
  plugins: [
    react(),
    {
      // Vite's dev-server file watcher only covers its own `root` (this
      // app's own folder) by default — it has no built-in option to also
      // watch a glob-import's target directory when that directory sits
      // outside root, which `data/` always does here (see App.jsx's
      // import.meta.glob calls). Without this, chokidar never emits an
      // 'add' event for a newly created chapter-*.jsx, so Vite's own
      // built-in glob-HMR full-reload (which only runs on 'add'/'unlink',
      // not periodic re-scans) never fires and the dev server has to be
      // restarted by hand to pick up a new chapter file. Explicitly adding
      // `data/` to the watcher on server start is what makes that
      // automatic instead.
      name: 'watch-host-data-dir',
      configureServer(server) {
        server.watcher.add(hostDataDir);
        // Serve data/** as /data/** so the preview's PDF tab can embed
        // /data/<book>/book.pdf in an iframe.
        server.middlewares.use('/data', (req, res, next) => {
          const file = path.join(hostDataDir, decodeURIComponent(req.url.split('?')[0]));
          if (!file.startsWith(hostDataDir + path.sep)) return next();
          if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
            res.statusCode = 404;
            return res.end('Not found — build it first with `npm run pdf`');
          }
          // SVGs require their image MIME type to render when referenced
          // directly through /data/. Preserve the correct type for other
          // generated media too, instead of serving every asset as a download.
          const mediaTypes = {
            '.svg': 'image/svg+xml', '.png': 'image/png',
            '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
            '.webp': 'image/webp', '.gif': 'image/gif', '.avif': 'image/avif',
            '.pdf': 'application/pdf', '.mp4': 'video/mp4',
            '.webm': 'video/webm', '.mp3': 'audio/mpeg', '.wav': 'audio/wav',
            '.txt': 'text/plain; charset=utf-8', '.md': 'text/plain; charset=utf-8',
            '.srt': 'text/plain; charset=utf-8', '.json': 'application/json',
          };
          res.setHeader('Content-Type', mediaTypes[path.extname(file).toLowerCase()] ?? 'application/octet-stream');
          res.setHeader('Cache-Control', 'no-store');
          fs.createReadStream(file).pipe(res);
        });
      },
    },
  ],
  resolve: {
    // Chapter files under data/ resolve react from the host project's own
    // node_modules while components/ resolves it from this skill's — dedupe
    // forces one shared copy so hooks/context don't break across the two.
    dedupe: ['react', 'react-dom'],
    alias: {
      // Chapter files under data/ import these packages directly. Pointing them
      // at this skill's own node_modules means the host project needs no
      // package.json / node_modules of its own (and gives one shared copy).
      react: path.resolve(__dirname, '../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
      'lucide-react': path.resolve(__dirname, '../node_modules/lucide-react'),
      '@components': path.resolve(__dirname, 'components'),
    },
  },
  server: {
    fs: {
      // Chapter files live under <host-project>/data/**, outside both this
      // app's own directory and the skill it ships in — allow Vite to read
      // the whole host project, not just the skill folder.
      allow: [hostProjectRoot],
    },
  },
});
