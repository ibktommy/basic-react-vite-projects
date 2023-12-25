import { createUserWithEmailAndPassword } from 'firebase/auth';

export const Auth = () => {
	return (
		<div>
			<input type='text' placeholder='Enter Username' />
			<input type='password' placeholder='Enter Password' />
			<button>Sign In</button>
		</div>
	);
};
