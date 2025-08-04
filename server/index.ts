import express from 'express';
import conceptsRoute from './routes/concepts';

const app = express();
const port = 4000;

app.use(express.json());
app.use('/api', conceptsRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});