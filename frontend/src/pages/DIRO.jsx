import GameBoard from '../components/GameBoard/GameBoard';

const DIRO = () => {
	const data = {
		title: 'DIRO Bingo',
		cells: [
			'"Will add details later"',
			'Audio issues',
			'Cat running across a camera',
			'awkward laugh moment',
			'Nick\'s forehead on cam',
			'Someone online mentioning weird noises in the room',
			'Someone running late to join the meeting',
			'"let me ask Chirag"',
			'Something gets descoped',
			'Questions? --followed by silence from everyone',
			'Someone gets corrected for saying team 2 instead of rocket',
			'Someone asks CV to repeat the question',
			'"Can you see my screen?"',
			'Someone is sharing the wrong screen',
			'"You\'re muted"',
			'CV says "great job"',
			'Frank\'s logo is incorporated on a slide',
			'"Good morning, good evening, good afternoon...',
			'Most of the team is a room 1 person in a phone booth',
			'Echo echo echo echo',
			'“I’ll drop that in the chat”',
			'Background Distraction',
			'No one from the Mobile team has their camera on',
			'“Let’s take it offline”',
			'“We’ll give everyone a minute to join”',
		],
		tags: [],
		category: '',
		activeCells: [],
		isPrivate: false,
	};

	return (
		<div>
			<section className="example section">
				<div>
					<GameBoard board={data}/>
				</div>
			</section>
		</div>
	);
};

export default DIRO;
