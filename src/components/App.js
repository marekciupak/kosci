import React from 'react';
import PropTypes from 'prop-types';
import {Actions, Verdicts} from '../constants';
import Players from './Players';
import RollForm from './RollForm';
import BiddingForm from './BiddingForm';
import VerdictForm from './VerdictForm';
import './App.css';

function App({
  previousPlayerNumber,
  currentPlayerNumber,
  me,
  action,
  lastBid,
  players,
  onRoll,
  onBidding,
  onCheck,
  onLoss,
}) {
  const renderAction = () => {
    switch (action) {
      case Actions.ROLLING:
        return <RollForm numberOfDice={me.dice.length} onSubmit={handleRoll} />;
      case Actions.BIDDING:
        return <BiddingForm lastBid={lastBid} onBidding={handleBidding} onCheck={handleCheck} />;
      case Actions.CHECKING:
        return <VerdictForm onSubmit={handleVerdict} />;
      default:
        throw Error('Action not supported!');
    }
  };

  const handleRoll = (dice) => {
    onRoll({dice: dice, playerNumber: me.number});
  };

  const handleBidding = (bid) => {
    onBidding({bid: bid, playerNumber: currentPlayerNumber});
  };

  const handleCheck = () => {
    onCheck();
  };

  const handleVerdict = (verdict) => {
    switch (verdict) {
      case Verdicts.ENOUGH:
        onLoss({playerNumber: currentPlayerNumber});
        break;
      case Verdicts.NOT_ENOUGH:
        onLoss({playerNumber: previousPlayerNumber});
        break;
      default:
        throw Error('Verdict not supported!');
    }
  };

  return (
    <React.Fragment>
      <Players players={players} />
      {renderAction()}
    </React.Fragment>
  );
}

App.propTypes = {
  currentPlayerNumber: PropTypes.number.isRequired,
  previousPlayerNumber: PropTypes.number.isRequired,
  me: PropTypes.shape({
    number: PropTypes.number.isRequired,
    dice: PropTypes.array.isRequired,
  }).isRequired,
  action: PropTypes.oneOf(Object.values(Actions)).isRequired,
  lastBid: PropTypes.object,
  players: PropTypes.array.isRequired,
  onRoll: PropTypes.func.isRequired,
  onBidding: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  onLoss: PropTypes.func.isRequired,
};

export default App;
