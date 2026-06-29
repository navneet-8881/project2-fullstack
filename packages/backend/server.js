import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const items = [
  { id: 1, name: 'Demo Item 1' },
  { id: 2, name: 'Demo Item 2' }
];

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from Express backend!', items });
});

app.post('/api/echo', (req, res) => {
  res.json({ received: req.body });
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
