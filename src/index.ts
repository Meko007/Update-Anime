import express from 'express';
import routes from './routes/index';


const app = express();
const port = process.env.PORT ?? 3000;

app.get('/', (req, res) => {
	res.send('Ohayo sekai');
});

app.use('/', routes);

app.listen(port, () => {
	console.log(`server is listening on port ${port}`);
});

