import { Story, Meta } from '@storybook/react/types-6-0';
import mock from './mock';
import OrdersLists from '.';

export default {
	title: 'Profile/OrdersLists',
	component: OrdersLists,
	args: {
		items: mock,
	}
} as Meta;

export const Basic: Story = (args) => (
	<div style={{ width: 850 }}>
		<OrdersLists {...args}/>
	</div>
);