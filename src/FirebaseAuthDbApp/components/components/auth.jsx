import { createUserWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { auth, googleAuthProvider } from '../../../FirebaseCrudApp/firebase-config';

export const Auth = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signUp = async () => {
    try {
			await createUserWithEmailAndPassword(auth, email, password);
			setEmail('');
			setPassword('');
      alert('Email signup successful!')
		} catch (err) {
			console.error(err);
		}
  }

  async function logOut() {
    try {
			await signOut(auth);
      alert('Sign out from email and password!')
		} catch (err) {
			console.error(err);
		}
  }

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleAuthProvider)
    } catch (err) {
      console.error(err)
    }
  }

  // console.log(auth?.currentUser?.email);

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
			<button onClick={logOut}>Sign Out from Email</button>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
		</div>
	);
};
