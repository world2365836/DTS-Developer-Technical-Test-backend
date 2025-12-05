import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { AppRouter } from './config/appRouter';
import './controllers/controller';






const   PORT = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(AppRouter.getInstance());



app.listen(3000, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;