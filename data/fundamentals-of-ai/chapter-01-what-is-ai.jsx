import { ContentContainer, ChapterTitle, Section, Alert, List, ListItem, Card } from '@components';

export default function WhatIsAI() {
  return (
    <ContentContainer>
      <ChapterTitle
        id="what-is-ai"
        title="What Is AI?"
        subtitle="Learn what artificial intelligence really means, where it came from, and how it fits with machine learning."
      />

      <Section id="what-ai-means" title="What AI means, and what it does not">
        <p>
          You hear the words "artificial intelligence" every day. News, phones, apps and ads all use them.
          But the words are used so loosely that they can mean almost anything. This section gives you a
          clear, simple meaning you can rely on.
        </p>

        <h3>A working definition</h3>
        <p>
          The OECD is a group of countries that writes shared rules and guidance on technology. It defines
          an <strong>AI system</strong> as a machine-based system that works out, from the input it
          receives, how to produce an output. The output can be a prediction, new content, a
          recommendation or a decision. It is built to reach goals that humans set.
        </p>
        <p>In simple words, an AI system does three things:</p>

        <Card title="1. Takes input">
          Data comes in. It can be a photo, a sentence, a voice clip, or numbers from a sensor.
        </Card>
        <Card title="2. Works out an answer">
          The system does not follow one fixed script for every case. It infers, which means it
          works out the answer from what it received.
        </Card>
        <Card title="3. Gives an output">
          A prediction, a recommendation, a decision, or new content such as text or an image.
        </Card>

        <p>
          A spam filter fits this. It takes an email as input. It works out whether the email looks like
          spam. It gives a decision: send it to the spam folder, or keep it in the inbox.
        </p>

        <Alert variant="note" label="Good to know">
          AI systems differ in how independently they act. Some keep learning and adjusting after they
          are put to use, such as a video app that adapts to what you watch.
        </Alert>

        <h3>What AI is not</h3>
        <List>
          <ListItem>
            <strong>It is not a human mind.</strong> IBM describes AI as technology that lets machines
            <em> simulate</em> human learning and similar abilities. Simulating something is not the same
            as being it.
          </ListItem>
          <ListItem>
            <strong>It is not one single thing.</strong> A route suggestion in a maps app, a face-grouping
            feature in a photo app and a chatbot are all AI, but they work in very different ways.
          </ListItem>
          <ListItem>
            <strong>It is not magic or always right.</strong> An AI system works out answers from the data
            and goals it was given. That is why it can be wrong.
          </ListItem>
        </List>

        <h3>Narrow AI and general AI</h3>
        <p>
          Almost every AI you use today is <strong>narrow AI</strong>. It is built for a specific task or
          a small set of tasks, such as a voice assistant that sets alarms and answers simple questions.
        </p>
        <p>
          <strong>Artificial general intelligence (AGI)</strong> is a different idea. It would learn and
          use knowledge across a wide range of tasks, at the level of a person or better.
        </p>

        <Alert variant="important" label="AGI does not exist today">
          IBM states that this level of AI is theoretical and that no known system comes close to it.
          Treat claims that a product is "human-level in everything" with care.
        </Alert>

        <p>
          In the next section you will see where the term came from. A group of researchers used the words
          "artificial intelligence" in a funding proposal in 1955, and the field has gone through big
          hopes and hard slumps since then.
        </p>

      </Section>

      <Section id="short-history-of-ai" title="A short history of AI">
        <p>
          AI is not new. People have worked on it for more than seventy years. The story has big hopes,
          sharp disappointments and a few moments that changed everything.
        </p>

        <h3>Key moments</h3>
        <List>
          <ListItem>
            <strong>1950:</strong> Alan Turing publishes the paper "Computing Machinery and Intelligence".
            It begins with a simple question: "Can machines think?"
          </ListItem>
          <ListItem>
            <strong>1955–1956:</strong> Four researchers, John McCarthy, Marvin Minsky, Nathaniel
            Rochester and Claude Shannon, propose a two-month summer study at Dartmouth College. Their
            proposal uses the words "artificial intelligence". It rests on one idea: intelligence can be
            described so precisely that a machine can be made to simulate it.
          </ListItem>
          <ListItem>
            <strong>1974–1980:</strong> The first "AI winter". Funding and interest fall after a critical
            1973 report in the UK, called the Lighthill report, and after the US agency DARPA cuts its
            support for academic AI research.
          </ListItem>
          <ListItem>
            <strong>Mid-1980s:</strong> Interest in neural networks, a way of building AI that is loosely
            inspired by the brain, returns.
          </ListItem>
          <ListItem>
            <strong>From 1987:</strong> A second slump begins. The market for special LISP computers
            collapses, and the AI systems of that time prove costly and fragile.
          </ListItem>
          <ListItem>
            <strong>May 1997:</strong> IBM's Deep Blue beats world chess champion Garry Kasparov 3.5 to
            2.5 in a six-game match. It is the first computer to beat a reigning champion under standard
            tournament rules.
          </ListItem>
          <ListItem>
            <strong>2012:</strong> A system called AlexNet wins the ImageNet image-recognition contest.
            This helps start the machine-learning boom you see today.
          </ListItem>
          <ListItem>
            <strong>2017:</strong> Researchers publish "Attention Is All You Need". It introduces the
            Transformer, the design behind today's large language models.
          </ListItem>
          <ListItem>
            <strong>30 November 2022:</strong> OpenAI releases ChatGPT. It reaches one million users in
            five days and 100 million monthly users in about two months.
          </ListItem>
        </List>

        <Alert variant="note" label="A pattern to notice">
          AI has moved in waves: high hopes, then disappointment and lower funding, then a new idea that
          restarts the climb. Knowing this helps you stay calm when a new claim sounds too big.
        </Alert>

        <p>
          Why does this matter? Many of today's tools are built on ideas that are decades old. What
          changed is the amount of data and computing power available to run them.
        </p>
      </Section>

      <Section id="ai-ml-deep-learning" title="AI, machine learning and deep learning">
        <p>
          People use "AI", "machine learning" and "deep learning" as if they mean the same thing. They do
          not. They fit inside each other, like nested boxes.
        </p>

        <Card title="Artificial intelligence (the biggest box)">
          Any technology that lets machines simulate human learning and related abilities.
        </Card>
        <Card title="Machine learning (inside AI)">
          A group of methods where algorithms learn patterns from data, instead of being given every rule.
        </Card>
        <Card title="Deep learning (inside machine learning)">
          Machine learning that uses neural networks with many layers. Today's chatbots and image
          generators are built this way.
        </Card>

        <h3>How deep learning differs from classic machine learning</h3>
        <List>
          <ListItem>
            <strong>Features:</strong> In classic machine learning, human experts choose which details of
            the data matter. Deep learning finds most of them on its own.
          </ListItem>
          <ListItem>
            <strong>Type of data:</strong> Classic machine learning usually works on neat, structured
            data. Deep learning can work on raw data such as text and images.
          </ListItem>
          <ListItem>
            <strong>Labels:</strong> Classic methods often need labelled examples. Deep learning does not
            always need them.
          </ListItem>
          <ListItem>
            <strong>Amount of data:</strong> Deep learning needs much more data to reach high accuracy.
          </ListItem>
        </List>

        <Alert variant="tip" label="Easy way to remember">
          Every deep learning system is machine learning, and every machine learning system is AI. But
          not every AI system uses machine learning.
        </Alert>

        <p>
          The next chapter looks inside the middle box. You will see how machines learn from data.
        </p>

      </Section>
    </ContentContainer>
  );
}
