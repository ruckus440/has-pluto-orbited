import React, { useEffect, useState, useMemo } from 'react';
import classes from './Timer.module.css';
import intervalToDuration from 'date-fns/intervalToDuration';
import compareAsc from 'date-fns/compareAsc';

const Timer = () => {
	const orbitDate = useMemo(() => new Date(2178, 2, 23), []); //2178 2 23
	// const orbitDate = useMemo(() => new Date(2021, 5, 15, 15, 33, 0), []); //test date

	const [hasOrbited, setHasOrbited] = useState();
	const [timeLeft, setTimeLeft] = useState(
		intervalToDuration({
			start: new Date(),
			end: orbitDate,
		})
	);

	useEffect(() => {
		if (compareAsc(orbitDate, new Date()) !== -1) {
			const interval = setInterval(() => {
				setTimeLeft(
					intervalToDuration({
						start: new Date(),
						end: orbitDate,
					})
				);

				if (compareAsc(orbitDate, new Date()) === -1) {
					console.log('clearing interval');
					clearInterval(interval);
				}
			}, 1000);
			return () => clearInterval(interval);
		} else {
			setHasOrbited(true);
		}
	}, [orbitDate, timeLeft]);

	return (
		<div>
			<div className={classes.label}>
				{hasOrbited ? <h1>YES!</h1> : <h1>NO</h1>}
			</div>
			<div>
				{hasOrbited ? (
					<p className={classes.text}>Pluto has completed an observed orbit!</p>
				) : (
					<p className={classes.text}>
						Well, at least not since it was discovered in 1930 and won't until
						March 23, 2178.
						<br />
						Pluto will complete it's first observed orbit in:
					</p>
				)}
			</div>
			{!hasOrbited && (
				<div className={classes.gridContainer}>
					{timeLeft.years > 0 && (
						<>
							<p className={classes.timeNumbers}>{timeLeft.years}</p>
							<p className={classes.timeUnits}>years</p>
						</>
					)}
					{timeLeft.months > 0 && (
						<>
							<p className={classes.timeNumbers}>{timeLeft.months}</p>
							<p className={classes.timeUnits}>months</p>
						</>
					)}
					{timeLeft.days > 0 && (
						<>
							<p className={classes.timeNumbers}>{timeLeft.days}</p>
							<p className={classes.timeUnits}>days</p>
						</>
					)}
					{timeLeft.hours > 0 && (
						<>
							<p className={classes.timeNumbers}>{timeLeft.hours}</p>
							<p className={classes.timeUnits}>hours</p>
						</>
					)}
					{timeLeft.minutes > 0 && (
						<>
							<p className={classes.timeNumbers}>{timeLeft.minutes}</p>
							<p className={classes.timeUnits}>minutes</p>
						</>
					)}

					<p className={classes.timeNumbers}>{timeLeft.seconds}</p>
					<p className={classes.timeUnits}>seconds</p>
				</div>
			)}
		</div>
	);
};

export default Timer;
