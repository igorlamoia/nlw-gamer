import { ReactNode } from 'react';

interface DivFieldProps {
	children: ReactNode;
}

export default function DivField({ children }: DivFieldProps) {
	return <div className="mt-4 flex flex-col gap-2">{children}</div>;
}
