import { Story, Meta } from '@storybook/react/types-6-0';
import Empty, { EmptyProps } from '.';

export default {
	title: 'Empty',
	component: Empty,
	parameters: {
		backgrounds: {
			default: 'won-dark'
		}
	},
	args: {
		title: 'Your wishlist is empty',
		description: 'Gmaes added to your wishlist will appear here'
	}
} as Meta;

export const Basic: Story<EmptyProps> = (args) => <Empty {...args}/>;