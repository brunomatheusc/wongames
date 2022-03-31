import { forgotValidate, resetValidate, signInValidate, signUpValidate } from '.';

describe('validations', () => {
	describe('signInValidate()', () => {
		it ('should validate empty fields', () => {
			const values = { email: '', password: '' };

			expect(signInValidate(values)).toMatchObject({
				email: '"email" is not allowed to be empty',
				password: '"password" is not allowed to be empty',
			});
		});

		it ('should return invalid email error', () => {
			const values = { email: 'invalid-email', password: '123456' };

			expect(signInValidate(values)).toMatchObject({
				email: '"email" must be a valid email',
			});
		});
	});

	describe('signUpvalidate()', () => {
		it('should validate empty fields', () => {
			const values = { username: '', email: '', password: '' };

			expect(signUpValidate(values)).toMatchObject({
				email: expect.any(String),
				password: expect.any(String),
				username: expect.any(String),
				confirm_password: expect.any(String),
			})
		});

		it('should return short username error message', () => {
			const values = { username: 'hi', email: '', password: '' };

			expect(signUpValidate(values).username).toMatchInlineSnapshot(expect.any(String));
		});

		it('should return invalid email error', () => {
			const values = { username: 'brunomatheusc', email: 'invalid-email', password: '123456' };

			expect(signUpValidate(values).email).toMatchInlineSnapshot(expect.any(String));
		});

		it('should return error if password does not match with confirm_password', () => {
			const values = {
				username: 'brunomatheusc',
				email: 'invalid-email@gmail.com',
				password: '123456',
				confirm_password: '12345678'
			};

			expect(signUpValidate(values).confirm_password).toMatchInlineSnapshot(expect.any(String));
		});
	});

	describe('forgotValidate()', () => {
		it ('should validate empty fields', () => {
			const values = { email: '' };

			expect(forgotValidate(values)).toMatchObject({
				email: '"email" is not allowed to be empty',
			});
		});

		it ('should return invalid email error', () => {
			const values = { email: 'invalid-email' };

			expect(forgotValidate(values)).toMatchObject({
				email: '"email" must be a valid email',
			});
		});
	})

	describe('resetValidate()', () => {
		it ('should validate empty fields', () => {
			const values = { password: '', confirm_password: '' };

			expect(resetValidate(values)).toMatchObject({
				password: expect.any(String),
			})
		});

		it ('should validate confirm_password', () => {
			const values = { password: '123', confirm_password: '' };

			expect(resetValidate(values)).toMatchObject({
				password: expect.any(String),
				confirm_password: expect.any(String),
			});
		});

		it ('should validate confirm_password when different', () => {
			const values = { password: '123', confirm_password: '321' };

			expect(resetValidate(values)).toMatchObject({
				confirm_password: expect.any(String),
			});
		});
	})
});