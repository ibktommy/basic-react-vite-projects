import { useState } from 'react'
import { db } from './firebase-config'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'

const FirebaseCrudApp = () => {
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users")

  // Use the useEffect-hook to get data from the api when the app re-renders except the data does not change
  useEffect(() => {
    // Function to get Users from database
    const getUsers = async () => {
      const usersData = await getDocs(usersCollectionRef)
      setUsers(usersData.docs.map((usersData) => ({...usersData.data(), id: usersData.id})))
    }

    getUsers()
  }, [])

  console.log(users);

  return (
    <div>
      {
        users.map((user) => {
          const {name, age, id} = user
          return (
            <div key={id}>
              <h1>Name: {name}</h1>
              <h1>Name: {age}</h1>
            </div>
          )
        })
      }
    </div>
  )
}

export default FirebaseCrudApp