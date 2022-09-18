import * as Select from '@radix-ui/react-select';
import { CaretDown, CaretUp, Check } from 'phosphor-react';

interface DatProps {
	id: string;
	title: string;
}

interface SelectionProps extends Select.SelectProps {
	data: DatProps[];
	placeholder: string;
	ariaLabel?: string;
}

export default function Selection({ data, placeholder, ariaLabel, ...rest }: SelectionProps) {
	return (
		<Select.Root {...rest}>
			<Select.Trigger
				aria-label={ariaLabel}
				className="flex justify-between items-center  bg-zinc-900 w-full py-3 px-4 rounded "
			>
				<Select.Value
					className="text-zinc-500 text-sm "
					placeholder={<span className="text-zinc-400 text-sm">{placeholder}</span>}
				/>
				<CaretDown className="text-zinc-400" size="1rem" />
			</Select.Trigger>

			<Select.Portal>
				<Select.Content className="flex w-full py-3 px-4 flex-col p-2 bg-zinc-900 text-white rounded">
					<Select.ScrollUpButton className="mx-auto">
						<CaretUp />
					</Select.ScrollUpButton>
					<Select.Viewport className="px-6 pl-8 py-2 relative">
						{data.map(({ id, title }: DatProps) => (
							<Select.Item
								key={id}
								value={id}
								className="flex gap-1 pl-2 items-center cursor-pointer  hover:bg-violet-500"
							>
								<Select.ItemIndicator className="absolute left-0">
									<Check className="text-violet-500" />
								</Select.ItemIndicator>
								<Select.ItemText className="pl-3">{title}</Select.ItemText>
							</Select.Item>
						))}
					</Select.Viewport>
					<Select.ScrollDownButton className="mx-auto">
						<CaretDown />
					</Select.ScrollDownButton>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	);
}
