import { Story, Meta } from '@storybook/react/types-6-0';
import Highlight, { HighlightProps } from '.';

export default {
	title: 'Highlight',
	component: Highlight,
	args: {
		title: 'Read Dead is back',
		subtitle: 'Come see Jonh\'s new adventures',
		backgroundImage: '/img/red-dead-img.jpg',
		buttonLabel: 'Buy now',
		buttonLink: '/rdr2',
	}
} as Meta;

export const Basic: Story<HighlightProps> = (args) => (
	<div style={{ width: '104rem' }}>
		<Highlight {...args}/>
	</div>
);

export const WithFloatImage: Story<HighlightProps> = (args) => (
	<div>
		<Highlight {...args}/>
	</div>
);

WithFloatImage.args = {
	floatImage: '/img/red-dead-float.png',
}