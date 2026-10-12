import { ContentContainer, ChapterTitle, Section, Alert, List, ListItem, Card } from '@components';

export default function HowMachinesLearn() {
  return (
    <ContentContainer>
      <ChapterTitle
        id="how-machines-learn"
        title="How Machines Learn"
        subtitle="See how a machine can find patterns in data, and why the quality of that data decides everything."
      />

      <Section id="learning-from-data" title="Learning from data, not from rules">
        <p>
          Normally, a programmer writes exact rules: if this happens, do that. This works well for tasks
          with clear rules. It fails for tasks where the rules are too many or too hard to write down,
          such as telling spam emails from real ones.
        </p>
        <p>
          <strong>Machine learning</strong> takes a different path. Instead of writing the rules, you give
          the machine many examples. Its algorithms learn patterns from this <strong>training data</strong>{' '}
          and then make inferences about new data they have not seen before.
        </p>

        <h3>The key words</h3>
        <List>
          <ListItem>
            <strong>Features:</strong> The facts about each example, turned into numbers. A house, for
            example, can be described by its area, number of bedrooms and age.
          </ListItem>
          <ListItem>
            <strong>Model:</strong> What the machine learns. It is a set of adjustable values, called
            parameters, tuned during training.
          </ListItem>
          <ListItem>
            <strong>Inference:</strong> Using the trained model on new data to get an output.
          </ListItem>
          <ListItem>
            <strong>Generalisation:</strong> The real goal. A model that does well on its training data
            should also do well in real use.
          </ListItem>
        </List>

        <Alert variant="important" label="Memorising is not learning">
          A model can memorise its training data and then fail on anything new. This is called
          overfitting. Testing the model on data it has not seen helps catch this early.
        </Alert>

        <p>
          Think of a student who memorises last year's question paper. They score well on that paper and
          badly on the real exam. A model that has learned the pattern behaves like a student who
          understood the subject.
        </p>
      </Section>

      <Section id="three-ways-to-learn" title="Three ways to learn">
        <p>
          Machines learn in three main ways. The difference is what kind of feedback they get.
        </p>

        <Card title="Supervised learning: learning with an answer key">
          Each training example comes with the correct answer, called a label. The model learns to
          predict the right output. A spam filter trained on emails marked "spam" and "not spam" is a
          classic case. If the answer is a category, this is classification. If it is a number, such as a
          price, this is regression.
        </Card>
        <Card title="Unsupervised learning: finding patterns alone">
          There are no answers given. The model looks for structure in the data by itself. It can group
          similar items together, for example shoppers with similar habits. It can also find items that
          often go together, which is how many recommendation systems work.
        </Card>
        <Card title="Reinforcement learning: learning by trial and error">
          The model takes actions and gets a reward when it does well. Over time it learns which actions
          earn the most reward. This is used in robotics and in video games.
        </Card>

        <Alert variant="tip" label="Which one is it?">
          Ask what feedback the machine gets. A correct answer for every example means supervised. No
          answers at all means unsupervised. A reward or score after actions means reinforcement.
        </Alert>
      </Section>

      <Section id="why-data-quality-matters" title="Why data quality matters">
        <p>
          Google's machine learning course puts it simply: your model is only as good as the data it
          trains on. A good dataset helps the model reach its goal. A poor one holds it back.
        </p>

        <h3>Common problems with data</h3>
        <List>
          <ListItem><strong>Missing values:</strong> Some facts are blank.</ListItem>
          <ListItem><strong>Duplicates:</strong> The same record appears many times.</ListItem>
          <ListItem><strong>Wrong values:</strong> A number was typed or measured incorrectly.</ListItem>
          <ListItem><strong>Wrong labels:</strong> A spam email marked "not spam", or the other way round.</ListItem>
          <ListItem><strong>Faulty sources:</strong> One part of the data comes from a broken sensor or process.</ListItem>
        </List>

        <p>
          Data must also fit the task. Google gives this example: when building a spam detector, you may
          keep messages sent by bots, because bots send spam. When studying how people search, you would
          remove them.
        </p>

        <h3>When data is not fair</h3>
        <p>
          IBM explains that bias can enter an AI system through its training data. If the data is too
          small, incomplete or does not represent all the people it will be used on, the model learns that
          gap. This is called sample or selection bias.
        </p>

        <Alert variant="important" label="Bad data means bad answers">
          A clever model cannot fix poor data. Before you trust an AI result, ask: what data was this
          trained on, and who is missing from it?
        </Alert>

      </Section>
    </ContentContainer>
  );
}
