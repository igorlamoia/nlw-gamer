import React, { FormEvent, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Checkbox, DivField, Input, Selection } from '../../../components';
import { GameController } from 'phosphor-react';
import ToogleGroup from './toogleGroup';
import { api } from '../../../services/api';
import { createAdSchema } from '../../../utils/helpers/validation/create-ad-schema';

interface Game {
	id: string;
	title: string;
	bannerUrl: string;
	_count: {
		ads: number;
	};
}
interface CreateAdModalProps {
	games: Game[];
	children: React.ReactNode;
	setGames: (game: Game[]) => void;
}

const weekDays = [
	{
		value: 'D',
		description: 'Domingo',
	},
	{
		value: 'S',
		description: 'Segunda',
	},
	{
		value: 'T',
		description: 'Terça',
	},
	{
		value: 'Q',
		description: 'Quarta',
	},
	{
		value: 'Q',
		description: 'Quinta',
	},
	{
		value: 'S',
		description: 'Sexta',
	},
	{
		value: 'S',
		description: 'Sábado',
	},
];

export default function CreateAdModal({ games, setGames, children }: CreateAdModalProps) {
	const [open, setOpen] = useState(false);
	const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([]);
	const isCheckboxChecked = useRef<boolean>(false);
	const selectedGameIdRef = useRef<string>('');

	const handleSelectedGameIdRef = (gameId: string) => {
		selectedGameIdRef.current = gameId;
	};
	const handleCheckboxChange = (checked: boolean) => {
		isCheckboxChecked.current = checked;
	};
	const handleToogleGroupChanges = (values: string[]) => {
		setSelectedWeekDays(values);
	};

	const handleForm = async (e: FormEvent) => {
		// Fazendo com Js puro sem hook form ou formik
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(formData);

		try {
			await createAdSchema.validate({
				game: selectedGameIdRef.current,
				weekDays: selectedWeekDays,
				...data,
			});
			api.post(`/games/${selectedGameIdRef.current}/ads`, {
				name: data.name,
				yearsPlaying: +data.yearsPlaying,
				discord: data.discord,
				weekDays: selectedWeekDays,
				hourStart: data.hourStart,
				hourEnd: data.hourEnd,
				useVoiceChannel: isCheckboxChecked.current,
			});
			// Persistir os dados após a inserção
			const newGames = games.map((game) => {
				if (game.id === selectedGameIdRef.current) {
					return {
						...game,
						_count: {
							ads: game._count.ads + 1,
						},
					};
				}
				return game;
			});
			setGames(newGames);
			setOpen(false);
		} catch (error: any) {
			if (error.name === 'ValidationError') {
				console.log(error.errors);
				error.errors.forEach((element: any) => {
					alert(element);
				});
			}
		}
	};

	const toogleModal = () => {
		selectedGameIdRef.current = '';
		isCheckboxChecked.current = false;
		setSelectedWeekDays([]);
		setOpen((old) => !old);
	};

	return (
		<Dialog.Root open={open} onOpenChange={toogleModal}>
			{children}
			<Dialog.Portal>
				<Dialog.Overlay className=" bg-black/60 inset-0 fixed" />
				<Dialog.Content className="w-[488px] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2A2634] text-white py-8 px-10 rounded-lg">
					<Dialog.Title className="font-black text-3xl mb-8">Publique um anúncio</Dialog.Title>
					<form onSubmit={handleForm}>
						<DivField>
							<label htmlFor="game">Qual o game?</label>
							<Selection
								onValueChange={handleSelectedGameIdRef}
								placeholder="Selecione o game que deseja jogar"
								data={games}
								ariaLabel="games"
							/>
						</DivField>
						<DivField>
							<label htmlFor="name">Seu nome (ou nickname)</label>
							<Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
						</DivField>
						<div className="grid grid-cols-2 gap-6">
							<DivField>
								<label htmlFor="yearsPlaying">Joga há quantos anos?</label>
								<Input name="yearsPlaying" id="yearsPlaying" placeholder="Tudo bem ser ZERO" />
							</DivField>
							<DivField>
								<label htmlFor="discord">Qual seu Discord?</label>
								<Input name="discord" id="discord" placeholder="Usuario#0000" />
							</DivField>
							<DivField>
								<label htmlFor="weekDays">Quando costuma jogar?</label>
								<ToogleGroup
									label="weekDays"
									selectedValues={selectedWeekDays}
									onToogleChange={handleToogleGroupChanges}
									data={weekDays}
								/>
							</DivField>
							<DivField>
								<label htmlFor="hours">Qual horário (De | até)?</label>
								<div className="flex gap-2">
									<Input
										name="hourStart"
										type="time"
										required
										placeholder="De"
										className="bg-violet-500 text-violet-500"
									/>
									<Input name="hourEnd" type="time" required placeholder="Até" />
								</div>
							</DivField>
						</div>
						<div className="flex  gap-2 mt-6 mb-8">
							<Checkbox onCheckedChange={handleCheckboxChange} label="Costumo me conectar ao chat de voz" />
						</div>
						<div className="flex gap-4 justify-end">
							<Dialog.Close className="py-3 px-5 bg-zinc-500 hover:bg-zinc-600 transition-colors rounded-md">
								Cancelar
							</Dialog.Close>
							<button
								type="submit"
								className="bg-violet-500 transition-colors hover:bg-violet-600 rounded-md text-white py-3 px-4 flex justify-between items-center"
							>
								<GameController className="mr-3" size="1.4rem" />
								Encontrar duo
							</button>
						</div>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
