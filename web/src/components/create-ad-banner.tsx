import { MagnifyingGlassPlus } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';

export default function CreateAdBanner() {
	return (
		<div className="pt-1 mt-8 bg-nlw-grad self-stretch mx-4 rounded-lg overflow-hidden">
			<div className="bg-[#2A2634]  px-8 py-6 flex rounded-lg justify-between items-center">
				<div>
					<strong className="text-white block text-2xl font-black text-bold">Não encontrou seu duo?</strong>
					<span className="text-zinc-400">Publique um anúncio para encontrar novos players!</span>
				</div>
				<Dialog.Trigger className="bg-violet-500 transition-colors hover:bg-violet-600 rounded-md text-white py-3 px-4 flex justify-between items-center">
					<MagnifyingGlassPlus className="mr-3" size="1.4rem" />
					Publicar anúncio
				</Dialog.Trigger>
			</div>
		</div>
	);
}
