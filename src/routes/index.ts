import express from 'express';
import { update } from '../script/update';

const router = express.Router();

router.get('/run', async (req: express.Request, res: express.Response) => {
	const url = req.query.url as string;

	try {
		await update(url);
		res.status(200).json({ message: 'Updated successfully' });
	} catch (err) {
		throw new Error ('Can\'t update');
	}
});

export default router;