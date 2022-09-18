import { useCallback, useEffect, useState } from 'react';
import '../../styles/main.css';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdBanner, GameBanner } from '../../components';
import logoImg from '../../assets/Logo.svg';
import { api } from '../../services/api';
import CreateAdModal from './modal/create-ad-modal';

interface Game {
	id: string;
	title: string;
	bannerUrl: string;
	_count: {
		ads: number;
	};
}

export default function Home() {
	const [games, setGames] = useState<Game[]>([]);

	const fetchGames = async () => {
		try {
			const { data } = await api.get('games');
			setGames(data.payload);
		} catch (error: any) {
			// alert('Erro ao buscar jogos: ' + error.message);
		}
	};

	useEffect(() => {
		fetchGames();
	}, []);

	return (
		<div className="max-w-[1344px] mx-auto flex items-center flex-col my-20">
			<img src={logoImg} alt="Logo nlw e-sports" />
			<h1 className="text-6xl text-white font-black mt-20 ">
				Seu <span className="bg-nlw-grad text-transparent bg-clip-text ">duo</span> está aqui
			</h1>
			<div className="grid grid-cols-6 gap-6 mt-16">
				{games.map((game) => (
					<GameBanner key={game.id} name={game.title} ads={game._count.ads} imgUrl={game.bannerUrl} />
				))}
			</div>

			<CreateAdModal games={games} setGames={setGames}>
				<CreateAdBanner />
			</CreateAdModal>
		</div>
	);
}
