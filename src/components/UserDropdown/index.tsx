import Link from 'next/link';
import { signOut } from 'next-auth/client';

import { AccountCircle, ExitToApp, FavoriteBorder } from '@styled-icons/material-outlined';
import { ChevronDown } from '@styled-icons/boxicons-regular/ChevronDown';

import Dropdown from 'components/Dropdown';
import * as S from './styles';

export type UserDropdownProps = {
	username: string;
}

export default function UserDropdown({ username }: UserDropdownProps) {
	const title = (
		<>
			<AccountCircle size={24} />
			<S.Username>{ username }</S.Username>
			<ChevronDown size={24} />
		</>
	);

	return (
		<Dropdown title={title}>
			<S.Nav>
				<Link href="/profile/me" passHref>
					<S.Link>
						<AccountCircle />
						<span>My Profile</span>
					</S.Link>
				</Link>

				<Link href="/wishlist" passHref>
					<S.Link>
						<FavoriteBorder />
						<span>Wishlist</span>
					</S.Link>
				</Link>

				<S.Link role="button" title="Sign Out" onClick={() => signOut()}>
					<ExitToApp />
					<span>Sign Out</span>
				</S.Link>
			</S.Nav>
		</Dropdown>
	);
};