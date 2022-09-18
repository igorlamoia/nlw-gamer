interface GameBannerProps {
	name: string;
	ads: number;
	imgUrl: string;
}

export default function GameBanner({ name, ads, imgUrl }: GameBannerProps) {
	return (
		<a href="" className="relative rounded-lg overflow-hidden">
			<img src={imgUrl} alt="" />
			<div className="grid gap-1 w-full  p-4 text-white absolute left-0 bottom-0 right-0 bg-box-game">
				<strong className="text-white font-bold">{name}</strong>
				<span className="text-zinc-300 text-sm">{ads} anúncios</span>
			</div>
		</a>
	);
}
