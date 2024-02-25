// frontend/src/components/Card.jsx
import PropTypes from 'prop-types';
import './Card.css'

const Card = ({ type }) => {
  return (
    <div className={`card ${type.toLowerCase().replace(' ', '-')}`}>
      <p>{type}</p>
    </div>
  );
};

Card.propTypes = {
    type: PropTypes.string.isRequired,
  };

export default Card;
