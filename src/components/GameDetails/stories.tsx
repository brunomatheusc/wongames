import { Story, Meta } from '@storybook/react/types-6-0';
import GameDetails from '.';

export default {
	title: 'Game/GameDetails',
	component: GameDetails,
	parameters: {
		backgrounds: {
			default: 'won-dark'
		}
	}
} as Meta;

export const Basic: Story = (args) => (
	<div style={{ maxWidth: 1300, margin: '0 auto' }}>
		<GameDetails {...args}/>
	</div>
);