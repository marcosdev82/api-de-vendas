import express from 'express';
import cors from 'cors';
import routes from './routes';


const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

// a porta 3333 não funcionou
app.listen(3000, () => {
  console.log('Server started on port 3000!');
});
