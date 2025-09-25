import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	type ArticleStateType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	appliedState: ArticleStateType;
	onApply: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	appliedState,
	onApply,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement | null>(null);

	const [formState, setFormState] = useState<ArticleStateType>(appliedState);

	// Кастомный хук для закрытия сайдбара по клику вне него
	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	// При открытии сайдбара синхронизируем форму с текущим применённым состоянием
	useEffect(() => {
		if (isOpen) {
			setFormState(appliedState);
		}
	}, [isOpen, appliedState]);

	// Элементы управления обновляют только formState
	const handleFontFamilyChange = (
		option: ArticleStateType['fontFamilyOption']
	) => setFormState((prev) => ({ ...prev, fontFamilyOption: option }));

	const handleFontSizeChange = (option: ArticleStateType['fontSizeOption']) =>
		setFormState((prev) => ({ ...prev, fontSizeOption: option }));

	const handleFontColorChange = (option: ArticleStateType['fontColor']) =>
		setFormState((prev) => ({ ...prev, fontColor: option }));

	const handleBackgroundChange = (
		option: ArticleStateType['backgroundColor']
	) => setFormState((prev) => ({ ...prev, backgroundColor: option }));

	const handleContentWidthChange = (option: ArticleStateType['contentWidth']) =>
		setFormState((prev) => ({ ...prev, contentWidth: option }));

	// Применение изменений
	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		onApply(formState);
		setIsOpen(false);
	};

	// Сброс к дефолтному состоянию
	const handleReset: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
		setIsOpen(false);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Select
						options={fontFamilyOptions}
						placeholder={''}
						selected={formState.fontFamilyOption}
						onChange={handleFontFamilyChange}
						title={'ШРИФТ'}
					/>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleFontSizeChange}
						title={'РАЗМЕР ШРИФТА'}
					/>
					<Select
						options={fontColors}
						placeholder={''}
						selected={formState.fontColor}
						onChange={handleFontColorChange}
						title={'ЦВЕТ ШРИФТА'}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						placeholder={''}
						selected={formState.backgroundColor}
						onChange={handleBackgroundChange}
						title={'ЦВЕТ ФОНА'}
					/>
					<Select
						options={contentWidthArr}
						placeholder={''}
						selected={formState.contentWidth}
						onChange={handleContentWidthChange}
						title={'ШИРИНА КОНТЕНТА'}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
