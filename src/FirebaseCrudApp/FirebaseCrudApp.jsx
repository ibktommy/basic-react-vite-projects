import { useState } from 'react';
import { db } from './firebase-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';

const FirebaseCrudApp = () => {
	const [userName, setUserName] = useState('');
	const [userAge, setUserAge] = useState('');

	const [users, setUsers] = useState([]);
	const usersCollectionRef = collection(db, 'users');

	// Use the useEffect-hook to get data from the api when the app re-renders except the data does not change
	useEffect(() => {
		// Function to get Users from database
		const getUsers = async () => {
			const usersData = await getDocs(usersCollectionRef);
			setUsers(
				usersData.docs.map((usersData) => ({
					...usersData.data(),
					id: usersData.id,
				})),
			);
		};

		getUsers();
	}, []);

	// console.log(users);

	// Function that gets called when we create user
	const createUserHandler = async () => {
    await addDoc(usersCollectionRef, {name: userName, age: userAge})

    setUserAge("")
    setUserName("")
  };

  
	return (
		<div>
			<input
				type='text'
				placeholder='Enter your name'
				onChange={(e) => setUserName(e.target.value)}
			/>
			<input
				type='number'
				placeholder='Enter your Age'
				onChange={(e) => setUserAge(e.target.value)}
			/>
			<button onClick={createUserHandler}>Create User</button>
			{users.map((user) => {
				const { name, age, id } = user;
				return (
					<div key={id}>
						<h1>Name: {name}</h1>
						<h1>Age: {age}</h1>
					</div>
				);
			})}
		</div>
	);
};

export default FirebaseCrudApp;
