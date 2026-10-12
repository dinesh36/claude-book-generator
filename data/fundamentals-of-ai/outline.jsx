import { Outline } from '@components';

const chapters = [
  {
    id: 'what-is-ai',
    title: 'What Is AI?',
    sections: [
      { id: 'what-ai-means', title: 'What AI means, and what it does not' },
      { id: 'short-history-of-ai', title: 'A short history of AI' },
      { id: 'ai-ml-deep-learning', title: 'AI, machine learning and deep learning' },
    ],
  },
  {
    id: 'how-machines-learn',
    title: 'How Machines Learn',
    sections: [
      { id: 'learning-from-data', title: 'Learning from data, not from rules' },
      { id: 'three-ways-to-learn', title: 'Three ways to learn' },
      { id: 'why-data-quality-matters', title: 'Why data quality matters' },
    ],
  },
  {
    id: 'how-modern-ai-models-work',
    title: 'How Modern AI Models Work',
    sections: [
      { id: 'neural-networks-in-plain-words', title: 'Neural networks in plain words' },
      { id: 'what-a-large-language-model-is', title: 'What a large language model is' },
      { id: 'strengths-and-limits', title: 'What these models do well, and where they fail' },
    ],
  },
  {
    id: 'using-ai-wisely',
    title: 'Using AI Wisely',
    sections: [
      { id: 'bias-privacy-safety', title: 'Bias, privacy and safety' },
      { id: 'checking-ai-answers', title: 'Checking AI answers' },
      { id: 'where-ai-is-heading', title: 'Where AI is heading' },
    ],
  },
];

export default function BookOutline() {
  return <Outline bookTitle="Fundamentals of AI" chapters={chapters} />;
}
