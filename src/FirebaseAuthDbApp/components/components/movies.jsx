import { useEffect, useState } from 'react';
import { db } from '../../../FirebaseCrudApp/firebase-config';
import {
	addDoc,
	collection,
	getDocs,
	deleteDoc,
	doc,
	getDoc,
} from 'firebase/firestore';
import EditMovieModal from './editMovieModal';

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [movieTitle, setMovieTitle] = useState('');
	const [movieReleaseDate, setMovieReleaseDate] = useState('');
	const [movieAward, setMovieAward] = useState('');
	const [startEdit, setStartEdit] = useState(false);
	const [editedMovieID, setEditedMovieID] = useState('')
	const [editedMovie, setEditedMovie] = useState()

	// Handle Input Changes
	function handleInputChange(inputState, inputEvent) {
		return inputState(inputEvent.target.value);
	}

	// Database movies collection/table Reference
	const moviesCollectionRef = collection(db, 'movies');

	// Get Data from Firestore-db
	async function getMovies() {
		try {
			const moviesDocs = await getDocs(moviesCollectionRef);
			setMovies(
				moviesDocs.docs.map((moviesDoc) => ({
					...moviesDoc.data(),
					id: moviesDoc.id,
				})),
			);
		} catch (err) {
			console.error(err);
		}
	}

	// Add Movie to Forestore-db
	async function addMovie() {
		const newMovieDoc = {
			title: movieTitle,
			release_date: movieReleaseDate,
			win_oscar: movieAward,
		};
		try {
			await addDoc(moviesCollectionRef, newMovieDoc);
			setMovieTitle('');
			setMovieReleaseDate('');
			setMovieAward(false);
			getMovies();
			alert('Movie Submitted Successfully!');
		} catch (err) {
			alert(`${err}`);
		}
	}

	useEffect(() => {
		getMovies();
	}, []);

	// Delete a movie-item from the movies-collection
	async function deleteMovie(id) {
		const movieRef = doc(db, 'movies', id);
		await deleteDoc(movieRef);
		getMovies();
	}

	// Edit a movie-document in the firestore-db
	async function editMovie(id) {
		const movieRef = doc(db, 'movies', id);
		try {
			const movieDoc = await getDoc(movieRef);
			const movieDetail = { ...movieDoc.data(), id: movieDoc.id };
			setEditedMovie(movieDetail)
			setEditedMovieID(movieDetail.id)
			setStartEdit(true);
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div className='movies'>
			<div className='movie-input'>
				<input
					type='text'
					placeholder='Enter movie title...'
					value={movieTitle}
					onChange={(e) => handleInputChange(setMovieTitle, e)}
				/>
				<input
					type='number'
					placeholder='Enter release date...'
					value={movieReleaseDate}
					onChange={(e) => handleInputChange(setMovieReleaseDate, e)}
				/>
				<div className='oscar-label'>
					<label htmlFor='oscar'>Received an Oscar</label>
					<input
						type='checkbox'
						checked={movieAward}
						id='oscar'
						onChange={(e) => setMovieAward(e.target.checked)}
					/>
				</div>
				<button onClick={addMovie}>Submit Movie</button>
			</div>
			<div className='movie-list'>
				{movies.map((movie) => {
					const { id, title, win_oscar, release_date } = movie;
					return (
						<article key={id}>
							<h1>{title.charAt(0).toUpperCase() + title.slice(1)}</h1>
							<h4>{release_date}</h4>
							<p>{win_oscar ? 'Won Oscar' : 'No Oscar'}</p>
							<button onClick={() => deleteMovie(id)}>delete movie</button>
							<button onClick={() => editMovie(id)}>update movie</button>
						</article>
					);
				})}
			</div>

			{startEdit ? (
				<EditMovieModal
					currentMovieID={editedMovieID}
					getMovies={getMovies}
					setStartEdit={setStartEdit}
					editedMovie={editedMovie}
				/>
			) : null}
		</div>
	);
};

export default Movies;
