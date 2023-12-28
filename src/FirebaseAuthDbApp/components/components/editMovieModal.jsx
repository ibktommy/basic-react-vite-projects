import { useState } from 'react';

const EditMovieModal = () => {
	const [editMovieTitle, setEditMovieTitle] = useState('');
	const [editMovieReleaseDate, setEditMovieReleaseDate] = useState('');
	const [editMovieAward, setEditMovieAward] = useState('');

	// Handle Input Changes
	function handleInputChange(inputState, inputEvent) {
		return inputState(inputEvent.target.value);
	}

	return (
		<div className='edit-modal'>
			<article>
				<input
					type='text'
					value={editMovieTitle}
					onChange={(e) => handleInputChange(setEditMovieTitle, e)}
				/>
				<input
					type='number'
					value={editMovieReleaseDate}
					onChange={(e) => handleInputChange(setEditMovieReleaseDate, e)}
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
			</article>
		</div>
	);
};

export default EditMovieModal;
