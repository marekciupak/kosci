import React from 'react';
import PropTypes from 'prop-types';
import {Verdicts} from '../constants';

function VerdictForm({onSubmit}) {
  const handleEnough = () => {
    onSubmit(Verdicts.ENOUGH);
  };

  const handleNotEnough = () => {
    onSubmit(Verdicts.NOT_ENOUGH);
  };

  return (
    <React.Fragment>
      <button type="button" onClick={handleEnough}>
        Enough
      </button>
      <button type="button" onClick={handleNotEnough}>
        Not enough
      </button>
    </React.Fragment>
  );
}

VerdictForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default VerdictForm;
