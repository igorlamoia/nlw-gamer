import React from 'react';
import * as CheckboxRadix from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';

interface CheckboxProps extends CheckboxRadix.CheckboxProps {
	label: string;
	onCheckedChange: (checked: boolean) => void;
}

export default function Checkbox({ label, onCheckedChange }: CheckboxProps) {
	return (
		<div className="flex gap-x-2 items-center">
			<CheckboxRadix.Root onCheckedChange={onCheckedChange} id="check" className="rounded bg-zinc-900  h-6 w-6">
				<CheckboxRadix.Indicator>
					<Check className="text-violet-500 m-auto" />
				</CheckboxRadix.Indicator>
			</CheckboxRadix.Root>
			<label htmlFor="check">{label}</label>
		</div>
	);
}
