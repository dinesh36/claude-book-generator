import { ContentContainer, ChapterTitle, Section, Alert, List, ListItem, Card } from '@components';

export default function HowModernAIModelsWork() {
  return (
    <ContentContainer>
      <ChapterTitle
        id="how-modern-ai-models-work"
        title="How Modern AI Models Work"
        subtitle="Look inside neural networks and large language models, and learn what they can and cannot do."
      />

      <Section id="neural-networks-in-plain-words" title="Neural networks in plain words">
        <p>
          Most modern AI is built on <strong>neural networks</strong>. A neural network is a machine
          learning model made of many simple units called neurons, arranged in stacked layers.
        </p>

        <Card title="Input layer">Takes in the raw facts, such as the words of an email or the pixels of a photo.</Card>
        <Card title="Hidden layers">Combine the inputs step by step into new, more useful patterns.</Card>
        <Card title="Output layer">Gives the final result, such as a number or a probability.</Card>

        <p>
          Every link between neurons has a <strong>weight</strong>. A weight works like a dial. It sets
          how strongly one input affects the result. Learning means turning these dials to the right
          positions.
        </p>

        <h3>How a network trains</h3>
        <List>
          <ListItem><strong>Predict:</strong> The network makes a guess for a training example.</ListItem>
          <ListItem><strong>Measure the error:</strong> A loss function shows how far the guess is from the right answer.</ListItem>
          <ListItem>
            <strong>Send the error backward:</strong> This step is called backpropagation. It finds how
            much each weight added to the mistake.
          </ListItem>
          <ListItem>
            <strong>Adjust slightly:</strong> A method called gradient descent nudges the weights to
            reduce the error.
          </ListItem>
          <ListItem><strong>Repeat:</strong> The cycle runs over the training data again and again.</ListItem>
        </List>

        <Alert variant="note" label="What does 'deep' mean?">
          Modern "deep" networks have many layers and millions or billions of parameters. This is where
          the name deep learning comes from.
        </Alert>
      </Section>

      <Section id="what-a-large-language-model-is" title="What a large language model is">
        <p>
          A <strong>large language model (LLM)</strong> is a deep learning model trained on huge amounts
          of text. It can understand and write human language. Chatbots like ChatGPT are built on LLMs.
        </p>

        <h3>How an LLM is built</h3>
        <List>
          <ListItem>
            <strong>Collect text.</strong> Billions or even trillions of words from books, articles,
            websites and code. The text is cleaned to remove errors and duplicates.
          </ListItem>
          <ListItem>
            <strong>Split into tokens.</strong> Text is cut into small pieces called tokens. A token can
            be a word, part of a word, or a single character.
          </ListItem>
          <ListItem>
            <strong>Learn to predict the next token.</strong> IBM describes LLMs as "giant statistical
            prediction machines that repeatedly predict the next word in a sequence."
          </ListItem>
          <ListItem>
            <strong>Fine-tune.</strong> After the first round of training, the model can be refined so it
            follows instructions better and gives more helpful replies.
          </ListItem>
        </List>

        <p>
          LLMs use a design called the <strong>Transformer</strong>. It was introduced in 2017 in the
          paper "Attention Is All You Need". It relies on a technique called attention, and it dropped the
          older recurrent and convolutional designs that came before it.
        </p>

        <Alert variant="tip" label="Key idea">
          An LLM does not look up answers in a database. It writes text one token at a time, choosing what
          is likely to come next based on patterns it learned in training.
        </Alert>
      </Section>

      <Section id="strengths-and-limits" title="What these models do well, and where they fail">
        <p>
          LLMs can write, summarise, translate and explain. They work fast and handle many tasks with one
          model. But they have clear limits that every user should know.
        </p>

        <Card title="Hallucinations">
          Models can produce false or misleading information that sounds believable. Researchers Kalai
          and colleagues (2025) argue this persists because training and testing reward a confident guess
          more than an honest "I do not know".
        </Card>
        <Card title="Bias">
          Models can copy and even increase the biases found in their training data, which can lead to
          unfair or offensive output.
        </Card>
        <Card title="Cost">
          Training and running these models needs a lot of computing power, energy and money.
        </Card>

        <p>
          Their skills are also uneven. The Stanford AI Index 2026 describes "jagged" abilities. It notes
          that the top model read analog clocks correctly only 50.1% of the time, while success on a
          computer-use task test called OSWorld rose from 12% to about 66%. A model can be very strong at
          one task and weak at a simple one.
        </p>

        <Alert variant="important" label="Do not judge by one good answer">
          A model that answers a hard question well can still fail an easy one. Always check results that
          matter.
        </Alert>

      </Section>
    </ContentContainer>
  );
}
