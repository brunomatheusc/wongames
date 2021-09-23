import { Story, Meta } from '@storybook/react/types-6-0';
import Menu, { MenuProps } from '.';

export default {
	title: 'Menu',
	component: Menu,
	layout: 'fullscreen',
	parameters: {
		backgrounds: {
			default: 'won-dark'
		}
	}
} as Meta;

export const Basic: Story<MenuProps> = (args) => <Menu {...args}/>;
export const Logged: Story<MenuProps> = (args) => <Menu {...args}/>;

Logged.args = { username: 'Bruno' };