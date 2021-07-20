import { Story, Meta } from '@storybook/react/types-6-0';
import GameDetails, { GameDetailsProps } from '.';

import gameMock from './mock';

export default {
	title: 'Game/GameDetails',
	component: GameDetails,
	parameters: {
		backgrounds: {
			default: 'won-dark'
		}
	},
	args: gameMock,
	argTypes: {
		releaseDate: {
			control: 'date'
		},
		genres: {
			control: {
				type: 'inline-check',
				options: ['Role-playing', 'Narrative']
			}
		},
		platforms: {
			control: {
				type: 'inline-check',
				options: ['windows', 'linux', 'mac']
			}
		}
	}
} as Meta;

export const Basic: Story<GameDetailsProps> = (args) => (
	<div style={{ maxWidth: 1300, margin: '0 auto' }}>
		<GameDetails { ...args } />
	</div>
);