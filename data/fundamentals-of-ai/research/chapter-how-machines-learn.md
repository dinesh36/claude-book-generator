# Research: Chapter 2 — How Machines Learn

Researched 12 Oct 2026. Only claims a source supports are listed. "Own example" means written for the book, not sourced.

## Findings

### 2.1 Learning from data, not from rules
1. Machine learning is a subset of AI in which algorithms "learn" patterns from training data and then make inferences about new data. [S1]
2. The core goal is generalisation: good performance on training data should carry over to real-world use. [S1]
3. Data is turned into numbers called features. A house might be [square footage, bedrooms, age]. Parameters are adjustable values (such as weights) that training tunes. Inference means applying a trained model to new data. [S1]
4. Overfitting: a model memorises its training data and fails to generalise. Validation helps detect it. [S1]

### 2.2 Three ways to learn
5. **Supervised learning** trains a model to predict the correct output for an input, using labelled examples. It covers regression (a number, like price) and classification (a category). Example: a spam filter trained on emails labelled SPAM or NOT SPAM. [S1]
6. **Unsupervised learning** finds patterns in unlabelled data. Examples: clustering (grouping similar items, such as customer segments), association (finding links, used by recommendation engines), and dimensionality reduction. [S1]
7. **Reinforcement learning** trains a model by trial and error to take actions that earn a reward. Examples: robotics and video games. [S1]

### 2.3 Why data quality matters
8. "Your ML model is only as good as the data it trains on." High-quality data helps a model meet its goal; low-quality data holds it back. [S2]
9. Common causes of unreliable data: missing values, duplicate records, incorrect feature values, wrong labels, and faulty data segments. [S2]
10. What counts as relevant data depends on the task. Example from the source: keep bot queries when building a spam detector, but remove them when studying human search. [S2]
11. Bias can enter through training data. Sample or selection bias means the data is too small, unrepresentative or incomplete. [S3]

## Use in the book
- 2.1 uses findings 1–4. 2.2 uses 5–7. 2.3 uses 8–11.

## Gaps / not verified
- The spam-filter and house examples come from the sources. Other examples (grocery recommendations, a delivery robot) are the book's own and marked as examples.

## Sources
- [S1] IBM, What is machine learning (ML)? — https://www.ibm.com/think/topics/machine-learning
- [S2] Google for Developers, Machine Learning Crash Course: Datasets — https://developers.google.com/machine-learning/crash-course/overfitting/data-characteristics
- [S3] IBM, What is AI bias? — https://www.ibm.com/think/topics/ai-bias
