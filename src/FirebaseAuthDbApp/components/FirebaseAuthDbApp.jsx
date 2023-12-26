import { Auth } from './components/auth';
import Movies from './components/movies';

const FirebaseAuthDbApp = () => {
	return (
		<div>
			<Auth />
			<Movies />
		</div>
	);
};

export default FirebaseAuthDbApp;
