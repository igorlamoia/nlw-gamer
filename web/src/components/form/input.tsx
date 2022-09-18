import { InputHTMLAttributes } from 'react';

export default function Input({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			type="text"
			{...props}
			className="placehold:text-zinc-500 placeholder:text-sm bg-zinc-900 w-full py-3 px-4 rounded"
		/>
	);
}
