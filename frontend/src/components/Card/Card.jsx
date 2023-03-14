import './Card.css';

const Card = ({ icon, title, children }) => {
  return (
    <div className="card">
      <div className="card__icon">{icon}</div>
      <h3 className="card__title">{title}</h3>
      {children}
    </div>
  );
};

export default Card;
