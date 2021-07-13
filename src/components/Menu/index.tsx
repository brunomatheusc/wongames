import { useState } from 'react';
import Link from 'next/link';
import { MdShoppingCart as ShoppingCartIcon, MdSearch as SearchIcon, MdClose as CloseIcon } from 'react-icons/md';
import { RiMenu2Fill as MenuIcon } from 'react-icons/ri';

import Logo from '../../components/Logo';
import Button from 'components/Button';
import MediaMatch from 'components/MediaMatch';

import * as S from './styles';

export type MenuProps = {
	username?: string;
}

export default function Menu({ username }: MenuProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<S.Wrapper>
			<MediaMatch lessThan="medium">
				<S.IconWrapper onClick={() => setIsOpen(true)}>
					<MenuIcon aria-label="Open menu" />
				</S.IconWrapper>
			</MediaMatch>

			<S.LogoWrapper>
				<Logo hideOnMobile />
			</S.LogoWrapper>

			<MediaMatch greaterThan="medium">
				<S.MenuNav>
					<S.MenuLink href="#">Home</S.MenuLink>
					<S.MenuLink href="#">Explore</S.MenuLink>
				</S.MenuNav>
			</MediaMatch>

			<S.MenuGroup>
				<S.IconWrapper>
					<SearchIcon aria-label="Search" />
				</S.IconWrapper>

				<S.IconWrapper>
					<ShoppingCartIcon aria-label="Open Shopping Cart" />
				</S.IconWrapper>

			{ !username &&
				<MediaMatch greaterThan="medium">
					<Link href="/sign-in" passHref>
						<Button as="a">Sign in</Button>
					</Link>
				</MediaMatch>
			}
			</S.MenuGroup>

			<S.MenuFull isOpen={isOpen} aria-hidden={!isOpen}>
				<CloseIcon aria-label="Close menu" onClick={() => setIsOpen(false)} />

				<S.MenuNav>
					<S.MenuLink href="#">Home</S.MenuLink>
					<S.MenuLink href="#">Explore</S.MenuLink>

					{ !!username && (
					<>
						<S.MenuLink href="#">My account</S.MenuLink>
						<S.MenuLink href="#">Wishlist</S.MenuLink>
					</>
					)}
				</S.MenuNav>

				{ !username &&
				<S.RegisterBox>
					<Link href="/sign-in" passHref>
						<Button fullWidth size="large" as="a">Sign In</Button>
					</Link>

					<span>or</span>

					<Link href="/sign-up" passHref>
						<S.CreateAccount title="Sign up">Sign Up</S.CreateAccount>
					</Link>
				</S.RegisterBox>
				}
			</S.MenuFull>
		</S.Wrapper>
	);
};