import React, {useState} from 'react';
import PropTypes from 'prop-types';

function RollForm({numberOfDice, onSubmit}) {
  const [dice, setDice] = useState(Array.from({length: numberOfDice}, () => ({pips: ''})));

  const handleChange = (index, pips) => {
    setDice([...dice.slice(0, index), {pips: pips}, ...dice.slice(index + 1)]);
  };

  const handleSubmit = (event) => {
    onSubmit(dice.map((die) => ({...die, pips: Number(die.pips)})));
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      {dice.map((die, index) => (
        <React.Fragment key={index}>
          #{index}{' '}
          <label>
            Pips:
            <input
              type="number"
              required
              min="1"
              max="6"
              name="pips"
              value={die.pips}
              onChange={(event) => {
                handleChange(index, event.target.value);
              }}
            />
          </label>
        </React.Fragment>
      ))}
      <input type="submit" value="Submit" />
    </form>
  );
}

RollForm.propTypes = {
  numberOfDice: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default RollForm;
