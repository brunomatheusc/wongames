import { Story, Meta } from '@storybook/react/types-6-0';
import Showcase, { ShowCaseProps } from '.';

import highlightMock from 'components/Highlight/mock';
import gamesMock from 'components/GameCardSlider/mock';

export default {
	title: 'Showcase',
	component: Showcase,
	decorators: [
		(Story) => (
			<div style={{ margin: '0 auto' }}>
				<Story />
			</div>
		)
	],
	parameters: {
		layout: 'fullscreen',
		backgrounds: {
			default: 'won-dark'
		}
	}
} as Meta;

export const Basic: Story<ShowCaseProps> = (args) => <Showcase {...args} />;

Basic.args = {
	title: 'Most Popular',
	highlight: highlightMock,
	games: gamesMock,
}