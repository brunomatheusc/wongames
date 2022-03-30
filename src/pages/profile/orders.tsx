import React from 'react'
import { GetServerSidePropsContext } from 'next';
import Profile from 'templates/Profile'

import OrdersLists, { OrdersListProps } from 'components/OrdersLists'
import mockItems from 'components/OrdersLists/mock';

import protectedRoutes from 'utils/protected-routes';

export default function ProfileOrders({ items }: OrdersListProps) {
	return (
		<Profile>
			<OrdersLists items={items} />
		</Profile>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await protectedRoutes(context);

	return {
		props: {
			items: mockItems,
			session,
		}
	}
}
