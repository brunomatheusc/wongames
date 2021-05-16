import * as S from './styles';
import { MdShoppingCart as ShoppingCartIcon, MdSearch as SearchIcon, MdClose as CloseIcon } from 'react-icons/md';
import { RiMenu2Fill as MenuIcon } from 'react-icons/ri';

import Logo from '../../components/Logo';
import { useState } from 'react';

export default function Menu() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<S.Wrapper>
			<S.IconWrapper onClick={() => setIsOpen(true)}>
				<MenuIcon aria-label="Open menu" />
			</S.IconWrapper>

			<S.LogoWrapper>
				<Logo hideOnMobile />
			</S.LogoWrapper>

			<S.MenuGroup>
				<S.IconWrapper>
					<SearchIcon aria-label="Search" />
				</S.IconWrapper>

				<S.IconWrapper>
					<ShoppingCartIcon aria-label="Open Shopping Cart" />
				</S.IconWrapper>
			</S.MenuGroup>

			<S.MenuFull isOpen={isOpen} aria-hidden={!isOpen}>
				<CloseIcon aria-label="Close menu" onClick={() => setIsOpen(false)} />
			</S.MenuFull>
		</S.Wrapper>
	);
};