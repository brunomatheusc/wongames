import { AccountCircle, ExitToApp, FormatListBulleted } from '@styled-icons/material-outlined';
import Link from 'next/link';
import { signOut } from 'next-auth/client';

import * as S from './styles';
import { useRouter } from 'next/router';

export type ProfileMenuProps = {
	activeLink?: string;
}

export default function ProfileMenu({ activeLink }: ProfileMenuProps) {
	const { push } = useRouter();

	return (
		<S.Nav>
            <Link href="/profile/me" passHref>
				<S.Link isActive={!!(activeLink == "/profile/me")} title="My Profile">
					<AccountCircle size={24} />
					<span>My Profile</span>
				</S.Link>
			</Link>

            <Link href="/profile/orders" passHref>
				<S.Link isActive={!!(activeLink == "/profile/orders")} title="My Orders">
					<FormatListBulleted size={24} />
					<span>My Orders</span>
				</S.Link>
			</Link>

			<S.Link
				role="button"
				title="Sign Out"
				onClick={async () => {
					const data = await signOut({ redirect: false, callbackUrl: '/' });
					push(data.url);
				}}>
				<ExitToApp size={24} />
				<span>Sign Out</span>
			</S.Link>
		</S.Nav>
	);
};