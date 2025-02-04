import express, { Request, Response } from 'express';
import { z } from 'zod';
import cors from 'cors';
import { getEmbeddings } from './model';
import ValidateUser from './validation';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', async (req: Request, res: Response) => {
  try {
    const token = typeof req.query.token === 'string' ? req.query.token : '';
    if (!token) {
      res.status(403).json({
        message: 'Unauthorized request',
      });
      return;
    }
    const validation = ValidateUser(token);
    if (!validation) {
      res.status(403).json({
        message: 'Unauthorized request',
      });
      return;
    }

    const data = req.body.data;
    z.string().parse(data);
    const embeddings = await getEmbeddings(data);
    if (embeddings) {
      res.status(200).json({ embeddings });
      return;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json('Invalid payload');
      return;
    }
    res.status(500).json('Something went wrong');
    return;
  }
});

app.listen(7078, () => {
  console.log('server is listing on 7078');
});
