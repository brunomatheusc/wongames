import { Story, Meta } from '@storybook/react/types-6-0';
import GameInfo, { GameInfoProps } from '.';

import gameMock from './mock';

export default {
	title: 'Game/GameInfo',
	component: GameInfo,
	args: gameMock,
	parameters: {
		backgrounds: {
			default: 'won-dark',
		}
	},
} as Meta;

export const Basic: Story<GameInfoProps> = (args) => (
	<div style={{ maxWidth: 1440, padding: 15 }}>
		<GameInfo {...args}/>
	</div>
);