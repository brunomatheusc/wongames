import { ReactNode } from 'react';

import { Container } from 'components/Container/styles';
import Menu from 'components/Menu';
import Footer from 'components/Footer';

import * as S from './styles';

export type BaseTemplateProps = {
	children: ReactNode;
};

export default function Base({ children }: BaseTemplateProps) {
	return (
		<S.Wrapper>
			<Container>
				<Menu />
			</Container>

			{ children }

			<S.SectionFooter>
				<Container>
					<Footer />
				</Container>
			</S.SectionFooter>
		</S.Wrapper>
	);
};