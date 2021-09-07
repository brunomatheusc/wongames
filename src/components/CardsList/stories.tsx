import { Story, Meta } from '@storybook/react/types-6-0';
import CardsList from '.';

import cardsMock from 'components/PaymentOptions/mock';

export default {
	title: 'Profile/CardsList',
	component: CardsList,
	args: {
		cards: cardsMock
	}
} as Meta;

export const Basic: Story = (args) => (
	<div style={{ width: 800, margin: 'auto' }}>
		<CardsList {...args}/>
	</div>
);