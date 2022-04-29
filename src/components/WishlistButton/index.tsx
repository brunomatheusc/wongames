import React, { useState } from 'react';
import { Favorite, FavoriteBorder } from '@styled-icons/material-outlined';
import { useSession } from 'next-auth/client';

import { useWishlist } from 'hooks/use-wishlist';

import Button, { ButtonProps } from 'components/Button';
import Spinner from 'components/Spinner';

type WishlistButtonProps = {
	id: string;
	hasText?: boolean;
} & Pick<ButtonProps, 'size'>;

export default function WishlistButton({ id, hasText, size = "small" }: WishlistButtonProps) {
	const [session] = useSession();
	const [loading, setLoading] = useState(false);
	const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

	if (!session) return null;

	const ButtonText = isInWishlist(id) ? "Remove from Wishlist" : "Add to Wishlist";

	async function handleClick() {
		setLoading(true);

		isInWishlist(id) ? await removeFromWishlist(id) : await addToWishlist(id);

		setLoading(false);
	}

	return (
		<Button
			icon={
				loading ? <Spinner /> :

				isInWishlist(id) ?
				<Favorite aria-label={ButtonText} /> :
				<FavoriteBorder aria-label={ButtonText} />
			}
			onClick={handleClick}
			minimal
			size={size}
		>
			{ hasText && ButtonText }
		</Button>
	);
}
