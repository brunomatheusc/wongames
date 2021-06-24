import { Container } from 'components/Container';
import Footer from 'components/Footer';
import Heading from 'components/Heading';
import Menu from 'components/Menu';

import * as S from './styles';

export default function Home({ heading }: any) {
	return (
		<S.Wrapper>
			<Container>
	            <Menu />
			</Container>

			<Container>
				<Heading color="black" lineLeft lineColor="secondary">News</Heading>
			</Container>

			<Container>
				<Heading lineLeft lineColor="secondary">{heading}</Heading>
			</Container>

			<Container>
				<Heading lineLeft lineColor="secondary">Upcoming</Heading>
			</Container>

			<Container>
				<Heading lineLeft lineColor="secondary">Free Games</Heading>
			</Container>

			<Container>
				<Footer />
			</Container>
		</S.Wrapper>
	);
};