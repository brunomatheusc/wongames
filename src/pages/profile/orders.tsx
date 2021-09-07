import OrdersLists, { OrdersListProps } from 'components/OrdersLists'
import React from 'react'
import Profile from 'templates/Profile'

import mockItems from 'components/OrdersLists/mock';

export default function ProfileOrders({ items }: OrdersListProps) {
	return (
		<Profile>
			<OrdersLists items={items} />
		</Profile>
	)
}

export function getServerSideProps() {
	return {
		props: {
			items: mockItems,
		}
	}
}
