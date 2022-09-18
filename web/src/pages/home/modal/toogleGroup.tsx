import * as ToggleGroup from '@radix-ui/react-toggle-group';

interface DataProps {
	value: string;
	description: string;
}

interface ToogleGroupProps {
	data: DataProps[];
	label?: string;
	onToogleChange: (value: string[]) => void;
	selectedValues: string[];
}

export default function ToogleGroup({ data, label = '', onToogleChange, selectedValues }: ToogleGroupProps) {
	return (
		<ToggleGroup.Root
			type="multiple"
			aria-label={label}
			className="flex flex-wrap  gap-1"
			onValueChange={onToogleChange}
		>
			{data.map(({ value, description }, index) => (
				<ToggleGroup.Item
					key={description}
					value={`${index + 1}`}
					title={description}
					className={`h-10 w-10 bg-zinc-900  rounded hover:bg-violet-500 ${
						selectedValues.includes(String(index + 1)) && 'bg-violet-500'
					}`}
				>
					{value}
				</ToggleGroup.Item>
			))}
		</ToggleGroup.Root>
	);
}
