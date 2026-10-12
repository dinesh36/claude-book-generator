import { ContentContainer, ChapterTitle, Section, Alert, List, ListItem, Card } from '@components';

export default function UsingAIWisely() {
  return (
    <ContentContainer>
      <ChapterTitle
        id="using-ai-wisely"
        title="Using AI Wisely"
        subtitle="Learn the main risks of AI, how to check its answers, and where the field is going next."
      />

      <Section id="bias-privacy-safety" title="Bias, privacy and safety">
        <h3>Bias</h3>
        <p>
          IBM defines AI bias as biased results that come from human biases skewing the training data or
          the AI algorithm. It can enter in several ways:
        </p>
        <List>
          <ListItem><strong>Unrepresentative data:</strong> The data is too small or leaves out groups of people.</ListItem>
          <ListItem><strong>Left-out data:</strong> Important facts were never included.</ListItem>
          <ListItem><strong>Poor problem framing:</strong> The goal given to the system was unclear or wrong.</ListItem>
          <ListItem><strong>Human labelling:</strong> People who label data bring their own assumptions.</ListItem>
        </List>
        <p>
          The effects can be serious. IBM points to harm for marginalised groups in hiring, policing and
          credit scoring.
        </p>

        <h3>Privacy</h3>
        <p>AI needs data, and some of that data is personal. IBM lists these privacy risks:</p>
        <List>
          <ListItem>Training data can include sensitive health, finance or biometric information.</ListItem>
          <ListItem>People may not know their data is being collected.</ListItem>
          <ListItem>Data shared for one purpose can end up training an AI for another.</ListItem>
          <ListItem>A model can accidentally leak one user's private details to others.</ListItem>
        </List>

        <h3>Safety</h3>
        <p>
          Safety problems are growing along with use. The Stanford AI Index 2026 counts 362 documented
          AI incidents in the latest year, up from 233 in 2024. In the US, the standards body NIST
          released its AI Risk Management Framework on 26 January 2023. It is a voluntary guide for
          managing AI risks to people, organisations and society.
        </p>

        <Alert variant="important" label="Protect your own data">
          Do not type passwords, bank details, medical records or other private information into an AI
          tool unless you are sure how it is stored and used.
        </Alert>
      </Section>

      <Section id="checking-ai-answers" title="Checking AI answers">
        <p>
          AI replies often sound sure and polished, even when they are wrong. As you saw in Chapter 3,
          models can write false statements that read like facts. The fix is a simple habit: check before
          you rely on it.
        </p>

        <Card title="1. Check the numbers and names">
          Dates, amounts, names and quotes are the parts most often wrong. Confirm each one in a trusted
          source.
        </Card>
        <Card title="2. Ask for sources, then open them">
          If a reply names a source, open it. Make sure it exists and really says what the AI claims.
        </Card>
        <Card title="3. Cross-check with a second source">
          Compare the answer with an official site, a textbook or an expert. Do not rely on one AI reply
          alone.
        </Card>
        <Card title="4. Be extra careful with high-stakes topics">
          For health, money, law and safety, treat AI as a starting point and talk to a qualified person.
        </Card>

        <Alert variant="note" label="About this checklist">
          These four steps are practical advice for readers. They are not taken from a single source.
          They follow from the known problem that models can sound sure when they are wrong.
        </Alert>
      </Section>

      <Section id="where-ai-is-heading" title="Where AI is heading">
        <p>
          AI is spreading quickly. The Stanford AI Index 2026 reports that:
        </p>
        <List>
          <ListItem>88% of organisations now use AI.</ListItem>
          <ListItem>Generative AI reached 53% of people in three years.</ListItem>
          <ListItem>
            AI agents, which carry out multi-step tasks on a computer, improved from about 12% to about
            66% success on one standard test.
          </ListItem>
        </List>
        <p>
          People disagree on what this means for jobs. In the same report, 73% of experts expect a
          positive effect on jobs, while only 23% of the public do.
        </p>

        <h3>Rules are arriving</h3>
        <p>
          Governments are writing rules. The European Union's AI Act came into force on 1 August 2024. It
          sorts AI by risk:
        </p>
        <List>
          <ListItem><strong>Unacceptable risk:</strong> Banned, for example social scoring.</ListItem>
          <ListItem><strong>High risk:</strong> The strictest rules apply.</ListItem>
          <ListItem><strong>Limited risk:</strong> People must be told they are dealing with AI, such as a chatbot.</ListItem>
          <ListItem><strong>Minimal risk:</strong> Not regulated.</ListItem>
        </List>

        <Alert variant="tip" label="Keep learning">
          This field changes fast. Pick one or two trusted sources, such as the Stanford AI Index or
          official guidance from NIST, and read them once a year. Dates and figures in this book are as of
          October 2026.
        </Alert>

      </Section>
    </ContentContainer>
  );
}
