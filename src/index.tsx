import { createRoot } from 'react-dom/client';
import React, { StrictMode, useState, type CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from 'components/article';
import { ArticleParamsForm } from 'components/article-params-form';
import {
	defaultArticleState,
	type ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Состояние, которое управляет стилями статьи
	const [appliedState, setAppliedState] =
		useState<ArticleStateType>(defaultArticleState);

	interface CustomCSSProperties extends CSSProperties {
		'--font-family'?: string;
		'--font-size'?: string;
		'--font-color'?: string;
		'--container-width'?: string;
		'--bg-color'?: string;
	}

	const mainStyle: CustomCSSProperties = {
		'--font-family': appliedState.fontFamilyOption.value,
		'--font-size': appliedState.fontSizeOption.value,
		'--font-color': appliedState.fontColor.value,
		'--container-width': appliedState.contentWidth.value,
		'--bg-color': appliedState.backgroundColor.value,
	};

	return (
		<main className={clsx(styles.main)} style={mainStyle}>
			<ArticleParamsForm
				appliedState={appliedState}
				onApply={setAppliedState} // передаем колбэк для применения новых настроек
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
