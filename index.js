const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");
const quizes = require("./src/data");

const resolvers = {
  Query: {
    info: () => `This is the API of dev quizzer`,
    quizes: () => quizes,
    quiz: (_, { quizId }) => quizes.find((quiz) => quiz.quizId === quizId),
  },
  Quiz: {
    quizId: (parent) => parent.quizId,
    quizName: (parent) => parent.quizName,
    quizCardIcon: (parent) => parent.quizCardIcon,
    totalQuestions: (parent) => parent.questions.length,
    questions: (parent) => parent.questions,
    answers: (parent) => parent.answers,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, "./src/schema.graphql"),
    "utf8"
  ),
  resolvers,
});

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log(`Server is running on ${url}`));
