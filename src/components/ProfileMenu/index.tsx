import { AccountCircle, CreditCard, ExitToApp, FormatListBulleted } from '@styled-icons/material-outlined';
import Link from 'next/link';
import { signOut } from 'next-auth/client';

import * as S from './styles';

export type ProfileMenuProps = {
	activeLink?: string;
}

export default function ProfileMenu({ activeLink }: ProfileMenuProps) {
	return (
		<S.Nav>
            <Link href="/profile/me" passHref>
				<S.Link isActive={!!(activeLink == "/profile/me")} title="My Profile">
					<AccountCircle size={24} />
					<span>My Profile</span>
				</S.Link>
			</Link>

            <Link href="/profile/cards" passHref>
				<S.Link isActive={!!(activeLink == "/profile/cards")} title="My Cards">
					<CreditCard size={24} />
					<span>My Cards</span>
				</S.Link>
			</Link>

            <Link href="/profile/orders" passHref>
				<S.Link isActive={!!(activeLink == "/profile/orders")} title="My Orders">
					<FormatListBulleted size={24} />
					<span>My Orders</span>
				</S.Link>
			</Link>

			<S.Link role="button" title="Sign Out" onClick={() => signOut()}>
				<ExitToApp size={24} />
				<span>Sign Out</span>
			</S.Link>
		</S.Nav>
	);
};