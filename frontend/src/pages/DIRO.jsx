import GameBoard from '../components/GameBoard/GameBoard';

const DIRO = () => {
	const data = {
		title: 'DIRO Bingo',
		cells: [
			'Michiel changed someones slide',
			'Audio issues',
			'Cat running across a camera',
			'Luc interrupting and cause time constraints',
			'Nick\'s forehead on cam',
			'Someone online mentioning weird noises in the room',
			'Someone running late to join the meeting',
			'Luc mentions new teams and budget which might speed up timelines',
			'Something gets descoped',
			'Questions? --followed by silence from everyone',
			'Someone gets corrected for saying team 2 instead of rocket',
			'Someone asks CV to repeat the question',
			'"Can you see my screen?"',
			'Someone is sharing the wrong screen',
			'"You\'re muted"',
			'CV says great job',
			'Frank\'s logo is incorporated on a slide',
			'Team 1 goes first and overtime',
			'Most of the team is a room 1 person in a phone booth',
			'',
			'',
			'',
			'',
			'',
			'',
		],
		tags: [],
		category: '',
		activeCells: [],
		isPrivate: false,
	};

	return (
		<div>
			<section className="example section">
				<div className="info">
					<h2>Welcome to ICW BRP 13 DIRO Bingo!!!</h2>
				</div>
				<div>
					<GameBoard board={data}/>
				</div>
			</section>
		</div>
	);
};

export default DIRO;
