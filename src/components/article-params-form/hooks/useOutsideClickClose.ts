import React, { useEffect } from 'react';

type UseOutsideClickCloseProps = {
	isOpen: boolean;
	rootRef: React.RefObject<HTMLDivElement>;
	onChange: (value: boolean) => void;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onChange,
}: UseOutsideClickCloseProps) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleClick = (e: MouseEvent) => {
			if (!rootRef.current) return;
			if (e.target instanceof Node && !rootRef.current.contains(e.target)) {
				onChange(false);
			}
		};

		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, [isOpen, rootRef, onChange]);
};
