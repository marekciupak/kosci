import React, {useState} from 'react';
import PropTypes from 'prop-types';

function BiddingForm({onBidding, onCheck}) {
  const [occurrences, setOccurrences] = useState('');
  const [pips, setPips] = useState('');

  const handleOccurrencesChange = (event) => {
    setOccurrences(event.target.value);
  };

  const handlePipsChange = (event) => {
    setPips(event.target.value);
  };

  const handleBidding = (event) => {
    onBidding({occurrences: Number(occurrences), pips: Number(pips)});
    event.preventDefault();
  };

  const handleCheck = () => {
    onCheck();
  };

  return (
    <React.Fragment>
      <form onSubmit={handleBidding}>
        <label>
          Occurrences:
          <input
            type="number"
            required
            min="1"
            name="occurrences"
            value={occurrences}
            onChange={handleOccurrencesChange}
          />
        </label>
        <label>
          Pips:
          <input type="number" required min="1" max="6" name="pips" value={pips} onChange={handlePipsChange} />
        </label>
        <input type="submit" value="Bid" />
      </form>
      <button type="button" onClick={handleCheck}>
        Check
      </button>
    </React.Fragment>
  );
}

BiddingForm.propTypes = {
  onBidding: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
};

export default BiddingForm;
