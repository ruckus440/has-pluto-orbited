import classes from './App.module.css';
import Timer from './components/Timer';

function App() {
	return (
		<div className={classes.container}>
			<Timer />
		</div>
	);
}

export default App;
