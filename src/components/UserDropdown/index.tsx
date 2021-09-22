import Link from 'next/link';
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

				<Link href="/" passHref>
					<S.Link>
						<FavoriteBorder />
						<span>Wishlist</span>
					</S.Link>
				</Link>

				<Link href="/" passHref>
					<S.Link>
						<ExitToApp />
						<span>Sign Out</span>
					</S.Link>
				</Link>
			</S.Nav>
		</Dropdown>
	);
};