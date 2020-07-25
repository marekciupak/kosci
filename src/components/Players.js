import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Players({players}) {
  const renderDie = (die) => (die.pips === null ? '?' : die.pips);

  return (
    <ol>
      {players.map((player) => (
        <li key={player.number} className={classNames({current: player.isCurrent, me: player.isMe})}>
          #{player.number} {player.name}
          <ul>
            {player.dice.map((die, index) => (
              <li key={index}>{renderDie(die)}</li>
            ))}
          </ul>
          {player.bid && (
            <React.Fragment>
              {player.bid.occurrences} x {player.bid.pips}
            </React.Fragment>
          )}
        </li>
      ))}
    </ol>
  );
}

Players.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isCurrent: PropTypes.bool.isRequired,
      isMe: PropTypes.bool.isRequired,
      dice: PropTypes.arrayOf(
        PropTypes.shape({
          pips: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
        }),
      ).isRequired,
      bid: PropTypes.shape({
        occurrences: PropTypes.number.isRequired,
        pips: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
      }),
    }),
  ).isRequired,
};

export default Players;
