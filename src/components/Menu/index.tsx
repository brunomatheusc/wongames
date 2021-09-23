import { useState } from 'react';
import Link from 'next/link';
import { MdSearch as SearchIcon, MdClose as CloseIcon } from 'react-icons/md';
import { RiMenu2Fill as MenuIcon } from 'react-icons/ri';

import Logo from '../../components/Logo';
import Button from 'components/Button';
import MediaMatch from 'components/MediaMatch';

import * as S from './styles';
import CartDropdown from 'components/CartDropdown';
import CartIcon from 'components/CartIcon';
import UserDropdown from 'components/UserDropdown';

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
				<Link href="/" passHref>
					<a>
						<Logo hideOnMobile />
					</a>
				</Link>
			</S.LogoWrapper>

			<MediaMatch greaterThan="medium">
				<S.MenuNav>
					<Link href="/" passHref>
						<S.MenuLink>Home</S.MenuLink>
					</Link>

					<Link href="/games" passHref>
						<S.MenuLink>Explore</S.MenuLink>
					</Link>
				</S.MenuNav>
			</MediaMatch>

			<S.MenuGroup>
				<S.IconWrapper>
					<SearchIcon aria-label="Search" />
				</S.IconWrapper>

				<S.IconWrapper>
					<MediaMatch greaterThan="medium">
						<CartDropdown />
					</MediaMatch>

					<MediaMatch lessThan="medium">
						<Link href="/cart" passHref>
							<a>
								<CartIcon />
							</a>
						</Link>
					</MediaMatch>
				</S.IconWrapper>

			<MediaMatch greaterThan="medium">
			{ !username ? (
				<Link href="/sign-in" passHref>
					<Button as="a">Sign in</Button>
				</Link>
			) : (<UserDropdown username={username} />)
			}
			</MediaMatch>
			</S.MenuGroup>

			<S.MenuFull isOpen={isOpen} aria-hidden={!isOpen}>
				<CloseIcon aria-label="Close menu" onClick={() => setIsOpen(false)} />

				<S.MenuNav>
					<Link href="/" passHref>
						<S.MenuLink>Home</S.MenuLink>
					</Link>

					<Link href="/games" passHref>
						<S.MenuLink>Explore</S.MenuLink>
					</Link>

					{ !!username && (
					<>
						<Link href="/profile/me" passHref>
							<S.MenuLink>My profile</S.MenuLink>
						</Link>

						<Link href="/profile/wishlist" passHref>
							<S.MenuLink>Wishlist</S.MenuLink>
						</Link>
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