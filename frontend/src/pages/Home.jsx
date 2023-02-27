const Home = () => {
  return (
    <section className="landing-page">
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
        <button className="btn btn-primary">Join Now</button>
      </div>
      <div>
        <img
          src={require('../assets/bingofy-logo.png')}
          alt="logo"
          className="bingofy-logo"
        />
      </div>
    </section>
  );
};

export default Home;
