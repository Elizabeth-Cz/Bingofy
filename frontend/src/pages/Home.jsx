import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Card from '../components/Card/Card';
import { MdEditNote, MdReply } from 'react-icons/md';
import BingoIcon from '../assets/BingoIcon';
import GameBoard from '../components/GameBoard/GameBoard';

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  const data = {
    title: 'Friends',
    cells: [
      'Chandler makes a sarcastic comment',
      'Phoebe performs a song',
      'Someone mentions Central Perk',
      'Joey and Chandler share a moment',
      'Ross and Rachel argue',
      'Phoebe reveals a quirky belief',
      'Chandler mentions his job in data processing',
      'Joey lands a new acting gig',
      'Chandler and Joey argue about money',
      'Monica and Rachel fight over a guy',
      'Phoebe tells a bizarre story',
      'Joey goes on a date',
      'Rachel gets a new haircut',
      'Chandler gets caught in a lie',
      'Monica invites her friends over for a party',
      'Gunther appearance',
      'Monica cleans',
      'Ugly naked guy',
      "Ross's dinosaur obsession ",
      "Phoebe's dead mom",
      'Joey loves food',
      'Ross divorces ',
      'Monica was fat',
      'Ross says "We were on a break"',
      '"How You Doin\'?"',
    ],
    tags: ['Friends', 'Comedy', 'Funny'],
    category: 'TV shows',
    activeCells: [],
    isPrivate: false,
  };

  return (
    <div>
      <section className="introduction section">
        <div className="info">
          <h1>
            Welcome to <span className="logo">Bingofy</span>!
          </h1>
          <p>
            Are you tired of playing the same old bingo boards over and over
            again? Look no further than Bingofy! Our custom bingo board creator
            allows you to create boards tailored to your specific needs. Whether
            you're planning a holiday party, family reunion, or just a fun night
            in with friends, Bingofy has got you covered.
          </p>
          {!user ? (
            <Link className="btn btn-primary" to="/register">
              Join Now
            </Link>
          ) : (
            <Link className="btn btn-primary" to="/create">
              Start Bingofying
            </Link>
          )}
        </div>
        <div>
          <img
            src={require('../assets/bingofy-logo.png')}
            alt="logo"
            className="bingofy-logo"
          />
        </div>
      </section>

      <section className="instructions section">
        <div className="info">
          <h2>How to play?</h2>
          <p>
            Setting up a Bingofy board and playing with your friends is as easy
            as spelling B-I-N-G-O.
          </p>
        </div>
        <div className="cards">
          <Card title="Create" icon={<MdEditNote />}>
            <p>
              Watching a TV show? Create a bingo board from catchphrases and
              common character behaviors. “Joey says How You Doin'” is a must
              for any “Friends” board!
            </p>
            <p>
              You need 25 different events to create a 5x5 Bingofy board.
              Alternatively, you can look for a Bingofy board from our browse
              page and start playing right away.
            </p>
          </Card>
          <Card title="Share" icon={<MdReply />}>
            <p>
              While you can certainly play Bingofy by yourself, the fun is
              doubled when sharing a board with friends.{' '}
            </p>
            <p>
              Computers, tablets, phones - you can share and play Bingofy
              anywhere, anytime.
            </p>
            <p>
              You can share a board by clicking the “Share” button and sending
              the link to your friends!
            </p>
          </Card>
          <Card title="Play" icon={<BingoIcon />}>
            <p>
              As you are watching your show (or doing anything else, really),
              look for the specific events from your Bingofy board.{' '}
            </p>
            <p>
              Did Joey say “How You Doin'”? Mark it on your board! Bingofy can
              turn anything into an exciting game.
            </p>
            <p>
              The first one 5 cases in a row wins the game - but you can easily
              create more boards or reshuffle your boards and start again!
            </p>
          </Card>
        </div>
      </section>
      {/* <section className="example section">
        <div className="info">
          <h2>Give it a try!</h2>
          <p>
            Here is a "Friends" themes Bingofy board, click the different cells
            and see what happens!
          </p>
        </div>
        <GameBoard board={data} />
      </section> */}
    </div>
  );
};

export default Home;
