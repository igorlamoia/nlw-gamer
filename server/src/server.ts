import { PrismaClient } from '@prisma/client';
import Express from 'express';
import cors from 'cors';
import { convertMinutesToStringTime, convertTimeStringToMinute } from './utils/time-helper';
// query game?id=5 route game/5 body

const app = Express();
app.use(Express.json());
app.use(cors());

const prisma = new PrismaClient({
	log: ['query', 'info', 'warn'],
});

app.get('/', (req, res) => {
	res.json({ message: 'Hello world!', payload: {} });
});

app.get('/games', async (req, res) => {
	const games = await prisma.game.findMany({
		include: {
			_count: {
				select: {
					ads: true,
				},
			},
		},
	});
	res.json({ message: 'Games listados com sucesso', payload: games });
});

app.get('/games/:id/ads', async (req, res) => {
	const gameId = req.params.id;

	const ads = await prisma.ad.findMany({
		select: {
			id: true,
			name: true,
			weekDays: true,
			useVoiceChannel: true,
			yearsPlaying: true,
			hourStart: true,
			hourEnd: true,
		},
		where: { gameId: gameId },
		orderBy: { createAt: 'desc' },
	});

	res.json({
		message: 'Games listados com sucesso',
		payload: ads.map((ad) => ({
			...ad,
			weekDays: ad.weekDays.split(','),
			hourStart: convertMinutesToStringTime(ad.hourStart),
			hourEnd: convertMinutesToStringTime(ad.hourEnd),
		})),
	});
});

app.post('/games/:id/ads', async (req, res) => {
	const gameId = req.params.id;
	const payload = req.body;

	const payloadDTO = {
		gameId,
		...payload,
		weekDays: payload.weekDays.join(','),
		hourStart: convertTimeStringToMinute(payload.hourStart),
		hourEnd: convertTimeStringToMinute(payload.hourEnd),
	};
	const createAd = await prisma.ad.create({ data: payloadDTO });

	return res.json({ message: 'Anúncio criado com sucesso', payload: createAd });
});

app.get('/ads/:id/discord', async (req, res) => {
	const adId = req.params.id;

	const adDiscord = await prisma.ad.findUniqueOrThrow({
		select: {
			discord: true,
		},
		where: { id: adId },
	});

	res.json({
		message: 'Games listados com sucesso',
		payload: { discord: adDiscord.discord },
	});
});

app.listen(3000, () => {
	console.log('Listening on port 3000');
});
