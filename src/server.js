import app from './app';

app.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
