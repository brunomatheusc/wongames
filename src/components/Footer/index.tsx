import Heading from 'components/Heading';
import Logo from 'components/Logo';
import * as S from './styles';
import Link from 'next/link';

export default function Footer() {
	return (
		<S.Wrapper>
            <Logo color="black" />

			<S.Content>
				<S.Column>
					<Heading color="black" size="small" lineBottom lineColor="secondary">
						Contact
					</Heading>

					<a href="mailto:sac@wongames.com">sac@wongames.com</a>
				</S.Column>

				<S.Column>
					<Heading color="black" lineColor="secondary" lineBottom size="small">Follow us</Heading>

					<nav aria-labelledby="social-media">
						<a href="https://www.instagram.com/won-games" target="_blank" rel="noopenner, norefereer">Instagram</a>
						<a href="https://www.twitter.com/won-games" target="_blank" rel="noopenner, norefereer">Twitter</a>
						<a href="https://www.youtube.com/won-games" target="_blank" rel="noopenner, norefereer">YouTube</a>
						<a href="https://www.facebook.com/won-games" target="_blank" rel="noopenner, norefereer">Facebook</a>
					</nav>
				</S.Column>

				<S.Column>
					<Heading color="black" lineColor="secondary" lineBottom size="small">Link</Heading>

					<nav aria-labelledby="footer resources">
						<Link href="/">Home</Link>
						<Link href="/">Store</Link>
						<Link href="/">Buscar</Link>
					</nav>
				</S.Column>

				<S.Column aria-labelledby="footer-contact">
					<Heading color="black" lineColor="secondary" lineBottom size="small">Location</Heading>

					<span>Lorem ipsum dolor sit.</span>
					<span>Lorem Ipsum</span>
					<span>Lorem, ipsum dolor.</span>
				</S.Column>
			</S.Content>

			<S.Copywright>Won Games 2020 @ All rights reserved.</S.Copywright>
		</S.Wrapper>
	);
};