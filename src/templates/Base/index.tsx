import { ReactNode } from 'react';
import { useSession } from 'next-auth/client';

import { Container } from 'components/Container/styles';
import Menu from 'components/Menu';
import Footer from 'components/Footer';

import * as S from './styles';

export type BaseTemplateProps = {
	children: ReactNode;
};

export default function Base({ children }: BaseTemplateProps) {
	const [session, loading] = useSession()

	return (
		<S.Wrapper>
			<Container>
				<Menu username={session?.user?.name} loading={loading} />
			</Container>

			<S.Content>{ children }</S.Content>

			<S.SectionFooter>
				<Container>
					<Footer />
				</Container>
			</S.SectionFooter>
		</S.Wrapper>
	);
};