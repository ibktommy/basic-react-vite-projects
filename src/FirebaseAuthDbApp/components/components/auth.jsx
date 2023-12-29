import { createUserWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { auth, googleAuthProvider } from '../../../FirebaseCrudApp/firebase-config';

export const Auth = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('')
	const [userId, setUserId] = useState('')

	// Function to sign up with email and password
	const signUp = async () => {
		if (email.trim().length === 0 || password.trim().length === 0) {
			alert(
				'Enter username and password also empty spaces are not valid',
			);
			return
		}

    try {
			await createUserWithEmailAndPassword(auth, email, password, username);
			setUserId(auth?.currentUser?.uid)
			setEmail('');
			setPassword('');
			setUsername('')
     alert('Email signup successful!');
		} catch (err) {
			alert(err);
		}
  }

	// function to sign out current user
  async function logOut() {
    try {
			await signOut(auth);
      alert('Signed out from email and password!')
			setUserId('')
		} catch (err) {
			console.error(err);
		}
  }

	// function to sign in using Google account
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
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				type='email'
				placeholder='Enter Email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				placeholder='Enter Password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			{userId ? (
				<button onClick={logOut}>Sign Out from Email</button>
			) : (
				<button onClick={signUp}>Sign Up With Email</button>
			)}
			<button onClick={signInWithGoogle}>Sign in with Google</button>
		</div>
	);
};
