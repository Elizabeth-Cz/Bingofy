import GameBoard from '../components/GameBoard/GameBoard';

const DIRO = () => {
	const data = {
		title: 'DIRO Bingo',
		cells: [
			'Michiel changing someones slide',
			'Audio issues',
			'Cat running across a camera',
			'Luc interrupting and cause time constraints',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
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
