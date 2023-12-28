import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../../FirebaseCrudApp/firebase-config';

const EditMovieModal = ({
	currentMovieID,
	getMovies,
	setStartEdit,
	editedMovie,
}) => {
	const { title, release_date, win_oscar } = editedMovie;

	const [editMovieTitle, setEditMovieTitle] = useState(title);
	const [editMovieDate, setEditMovieDate] = useState(release_date);
	const [editMovieAward, setEditMovieAward] = useState(win_oscar);

	// Handle Input Changes
	function handleInputChange(inputState, inputEvent) {
		return inputState(inputEvent.target.value);
	}

	// Update Movie Doc in firestore-db
	async function updateMovie(id) {
		const movieRef = doc(db, 'movies', id);
		try {
			const editedMovieDetail = {
				title: editMovieTitle,
				release_date: editMovieDate,
				win_oscar: editMovieAward,
			};
			await updateDoc(movieRef, editedMovieDetail);
			setStartEdit(false);
			getMovies();
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div className='edit-modal'>
			<article>
				<input
					type='text'
					value={editMovieTitle}
					onChange={(e) => handleInputChange(setEditMovieTitle, e)}
					placeholder={editMovieTitle}
				/>
				<input
					type='number'
					value={editMovieDate}
					onChange={(e) => handleInputChange(setEditMovieDate, e)}
					placeholder={editMovieDate}
				/>
				<div className='oscar-label'>
					<label htmlFor='oscar'>Received an oscar</label>
					<input
						type='checkbox'
						checked={editMovieAward}
						id='oscar'
						onChange={(e) => setEditMovieAward(e.target.checked)}
					/>
				</div>
				<button onClick={() => updateMovie(currentMovieID)}>
					submit edited movie
				</button>
			</article>
		</div>
	);
};

export default EditMovieModal;
