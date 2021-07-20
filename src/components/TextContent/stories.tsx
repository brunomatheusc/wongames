import { Story, Meta } from '@storybook/react/types-6-0';
import TextContent, { TextContentProps } from '.';

import mockText from './mock';

export default {
	title: 'TextContent',
	component: TextContent,
	args: mockText,
	parameters: {
		backgrounds: {
			default: 'won-dark',
		}
	}
} as Meta;

export const Basic: Story<TextContentProps> = (args) => <TextContent {...args}/>;