# Research: Chapter 3 — How Modern AI Models Work

Researched 12 Oct 2026. Only claims a source supports are listed.

## Findings

### 3.1 Neural networks
1. A neural network is a machine learning model made of simple units called neurons, arranged in stacked layers: an input layer, hidden layers and an output layer. [S1]
2. Weights act like dials that set how strongly each input affects the output. [S1]
3. Training loop: the network makes a prediction, measures its error with a loss function, and sends the error backward (backpropagation) to find how much each weight contributed. Gradient descent then adjusts weights slightly to reduce the error. This repeats over the training data. [S1]
4. A network that is too complex can memorise its training data and do badly on new data (overfitting). [S1]
5. "Deep" neural networks are modern systems with many layers and millions or billions of parameters. [S1]

### 3.2 What a large language model is
6. LLMs are deep learning models trained on huge amounts of data. They understand and generate natural language and other content, and use the transformer architecture. [S2]
7. Training data: billions or trillions of words from books, articles, websites and code, cleaned to remove errors and duplicates. Text is split into tokens (words, parts of words or characters). [S2]
8. LLMs are described as "giant statistical prediction machines that repeatedly predict the next word in a sequence." [S2]
9. After pre-training, models can be refined with supervised fine-tuning, RLHF or instruction tuning. [S2]
10. The Transformer was introduced in 2017 and is based solely on attention, with no recurrence or convolutions. [S3]

### 3.3 Strengths and limits
11. Limits named by IBM: hallucinations (false but plausible output), bias from training data, and heavy compute, energy and cost. [S2]
12. Kalai et al. (arXiv, 4 Sep 2025) argue that hallucinations persist because training and evaluation reward guessing over admitting uncertainty; most benchmarks grade like exams where a confident guess can beat "I don't know". [S4]
13. Stanford's AI Index 2026 describes "jagged" capabilities: the top model reads analog clocks correctly only 50.1% of the time, while agent task success on OSWorld rose from 12% to about 66%. [S5]

## Use in the book
- 3.1 uses 1–5. 3.2 uses 6–10. 3.3 uses 11–13.

## Gaps / not verified
- IBM's neural network page gives no formal definition of "deep". The book says only what the source says.
- AI Index figures are as reported in the 2026 report summary page; the book cites them as that report's findings, with its date.

## Sources
- [S1] IBM, What is a neural network? — https://www.ibm.com/think/topics/neural-networks
- [S2] IBM, What are large language models (LLMs)? — https://www.ibm.com/think/topics/large-language-models
- [S3] Vaswani et al., Attention Is All You Need, arXiv, 12 Jun 2017 — https://arxiv.org/abs/1706.03762
- [S4] Kalai, Nachum, Vempala, Zhang, Why Language Models Hallucinate, arXiv, 4 Sep 2025 — https://arxiv.org/abs/2509.04664
- [S5] Stanford HAI, AI Index Report 2026 — https://hai.stanford.edu/ai-index/2026-ai-index-report
