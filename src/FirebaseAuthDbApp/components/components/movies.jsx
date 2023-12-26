import { useEffect, useState } from "react"
import { db } from "../../../FirebaseCrudApp/firebase-config"
import { collection, getDocs } from "firebase/firestore"


const Movies = () => {
  const [movies, setMovies] = useState([])

	// Get Data from Firestore-db
	async function getMovies() {
		const moviesCollectionRef = collection(db, 'movies');
		const moviesDocs = await getDocs(moviesCollectionRef);
    setMovies(moviesDocs.docs.map((moviesDoc) => (
			{...moviesDoc.data(), id: moviesDoc.id}
		)))
	}

	useEffect(() => {getMovies()}, []);
	console.log(movies);
	return (
		<div>
			{movies.map((movie) => {
				const {id, title, win_oscar, release_date} = movie
				return (
					<article key={id}>
						<h1>{title}</h1>
						<h4>{release_date}</h4>
						<p>{(win_oscar.toString()).toUpperCase()}</p>
					</article>
				)
			})}
		</div>
	);
}

export default Movies