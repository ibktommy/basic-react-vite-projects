import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../../FirebaseCrudApp/firebase-config';

export const Auth = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signUp = async () => {
    try {
			await createUserWithEmailAndPassword(auth, email, password);
			setEmail('');
			setPassword('');
		} catch (err) {
			console.error(err);
		}
  }

  async function signOut() {
    try {
			await signOut(auth);
      alert('Sign out from email and password!')
		} catch (err) {
			console.error(err);
		}
  }

	return (
		<div className='auth'>
			<input
				type='text'
				placeholder='Enter Username'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				placeholder='Enter Password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={signUp}>Sign Up With Email</button>
			<button onClick={signOut}>Sign Out from Email</button>
		</div>
	);
};
