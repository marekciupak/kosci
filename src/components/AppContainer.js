import React, {useState} from 'react';
import App from './App';
import config from '../config';
import {Actions} from '../constants';

function AppContainer() {
  const [state, setState] = useState({
    status: {
      currentPlayerNumber: 0,
      action: Actions.ROLLING,
    },
    me: {
      number: 1,
    },
    players: [
      {
        name: 'Arek',
        dice: Array.from({length: config.numberOfDicePerPlayer}, () => ({pips: null})),
        bid: null,
      },
      {
        name: 'Maro',
        dice: Array.from({length: config.numberOfDicePerPlayer}, () => ({pips: null})),
        bid: null,
      },
    ],
  });

  const {status, me, players} = state;

  const handleRoll = ({dice, playerNumber}) => {
    setState({
      ...state,
      status: {
        ...status,
        action: Actions.BIDDING,
      },
      players: [
        ...players.slice(0, playerNumber),
        {...players[playerNumber], dice: dice},
        ...players.slice(playerNumber + 1),
      ],
    });
  };

  const handleBidding = ({bid, playerNumber}) => {
    const nextPlayerNumber = (status.currentPlayerNumber + 1) % players.length;

    setState({
      ...state,
      status: {
        ...status,
        currentPlayerNumber: nextPlayerNumber,
        action: Actions.BIDDING,
      },
      players: [
        ...players.slice(0, playerNumber),
        {...players[playerNumber], bid: bid},
        ...players.slice(playerNumber + 1),
      ],
    });
  };

  const handleCheck = () => {
    setState({
      ...state,
      status: {
        ...status,
        action: Actions.CHECKING,
      },
    });
  };

  const handleLoss = ({playerNumber: loserNumber}) => {
    if (players[loserNumber].dice.length === 1) {
      setState({
        ...state,
        status: {
          ...status,
          currentPlayerNumber: loserNumber % players.length,
          action: Actions.ROLLING,
        },
        me: {
          ...me,
          number: me.number === loserNumber ? null : me.number < loserNumber ? me.number : me.number - 1,
        },
        players: players
          .filter((_, playerNumber) => playerNumber !== loserNumber)
          .map((player) => ({...player, bid: null})),
      });
    } else if (players[loserNumber].dice.length > 1) {
      setState({
        ...state,
        status: {
          ...status,
          currentPlayerNumber: loserNumber,
          action: Actions.ROLLING,
        },
        players: players.map((player, playerNumber) => ({
          ...player,
          dice: Array.from(
            {length: playerNumber === loserNumber ? player.dice.length - 1 : player.dice.length},
            () => ({pips: null}),
          ),
          bid: null,
        })),
      });
    } else throw Error.new('The losing player had no dice!');
  };

  const playersExt = players.map((player, number) => ({
    ...player,
    number: number,
    isCurrent: number === status.currentPlayerNumber,
    isMe: number === me.number,
  }));

  console.debug(state);

  if (me.number === null) {
    return <p>Game over!</p>;
  }

  if (players.length === 1) {
    return <p>You won!</p>;
  }

  return (
    <App
      currentPlayerNumber={status.currentPlayerNumber}
      previousPlayerNumber={status.currentPlayerNumber === 0 ? players.length - 1 : status.currentPlayerNumber - 1}
      me={playersExt[me.number]}
      action={status.action}
      players={playersExt}
      onRoll={handleRoll}
      onBidding={handleBidding}
      onCheck={handleCheck}
      onLoss={handleLoss}
    />
  );
}

export default AppContainer;
