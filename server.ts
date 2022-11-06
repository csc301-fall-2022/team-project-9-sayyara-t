import express, {application, Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
var corsOptions = {
    origin: 'http://localhost:8000'
}

const app: Express = express();
const port = process.env.PORT;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.get('/', (req: Request, res: Response) => {
    res.send('Home again');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
});