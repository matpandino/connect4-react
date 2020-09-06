/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from 'react';

import yellowImg from '../../assets/yellow.png';
import redImg from '../../assets/red.png';
import boardImg from '../../assets/board.png';

import {
  Field,
  FieldContainer,
  Row,
  VictoryText,
  Piece,
  RematchButton,
  Board,
} from './styles';

const Game: React.FC = () => {
  const [fields, setFields] = useState<any>([]);
  const [playerStartedRound, setPlayerStartedRound] = useState<1 | 2>(1);
  const [playerTurn, setPlayerTurn] = useState<1 | 2>(1);
  const [playerWin, setPlayerWin] = useState<any>(null);

  const rows = 6;
  const columns = 7;

  const createNewGame = () => {
    /* pre-load images */
    const imageList = [yellowImg, redImg];
    imageList.forEach((image) => {
      new Image().src = image;
    });

    const field = [];

    for (let i = 0; i <= rows - 1; i++) {
      field.push([0]);

      for (let j = 2; j <= columns; j++) {
        field[i].push(0);
      }
    }
    setFields(field);
  };

  const applyGravity = (column: number) => {
    let lastRow;
    for (let i = 0; i <= rows - 1; i++) {
      if (fields[i][column] === 0) {
        lastRow = [i, column];
      }
    }

    if (!lastRow) {
      return [null, null];
    }

    return lastRow;
  };

  const checkWin = () => {
    const compareValues = (
      value1: number,
      value2: number,
      value3: number,
      value4: number,
    ) => {
      if (value1 === 1 && value2 === 1 && value3 === 1 && value4 === 1) {
        setPlayerWin(1);
      }
      if (value1 === 2 && value2 === 2 && value3 === 2 && value4 === 2) {
        setPlayerWin(2);
      }
    };

    for (let i = 0; i <= fields.length - 1; i++) {
      for (let j = 0; j <= fields[0].length - 1; j++) {
        compareValues(
          fields[i][j],
          fields[i][j - 1],
          fields[i][j - 2],
          fields[i][j - 3],
        );

        if (
          fields[i] !== undefined &&
          fields[i - 1] !== undefined &&
          fields[i - 2] !== undefined &&
          fields[i - 3] !== undefined
        ) {
          compareValues(
            fields[i][j],
            fields[i - 1][j],
            fields[i - 2][j],
            fields[i - 3][j],
          );

          compareValues(
            fields[i][j],
            fields[i - 1][j + 1],
            fields[i - 2][j + 2],
            fields[i - 3][j + 3],
          );

          compareValues(
            fields[i][j],
            fields[i - 1][j - 1],
            fields[i - 2][j - 2],
            fields[i - 3][j - 3],
          );
        }
      }
    }
  };

  const handleClickField = (row: number, column: number) => {
    if (playerWin) {
      return;
    }

    // APPLY "GRAVITY" TO COLUMN CLICKED
    const [rowG, columnG] = applyGravity(column);

    // CHECK IF FIELDS ARE VALID
    if (rowG === null || columnG === null) {
      return;
    }

    const tempFields = fields;
    tempFields[rowG][columnG] = playerTurn;

    setFields([...tempFields]);

    checkWin();

    setPlayerTurn(playerTurn === 1 ? 2 : 1);
  };

  useEffect(() => {
    createNewGame();
  }, []);

  return (
    <FieldContainer>
      {!playerWin && (
        <VictoryText
          color={
            (playerTurn === 1 && '#eb345b') ||
            (playerTurn === 2 && '#ffff85') ||
            '#9dfa98'
          }
        >
          {playerTurn === 1 ? 'Red' : 'Yellow'} turn
        </VictoryText>
      )}

      {playerWin && (
        <VictoryText
          color={
            (playerTurn === 2 && '#eb345b') ||
            (playerTurn === 1 && '#ffff85') ||
            '#9dfa98'
          }
        >
          {' '}
          {`${playerWin === 1 ? 'Red' : 'Yellow'} Won`}
        </VictoryText>
      )}

      <Board
        bgImg={boardImg}
        yellow="#ffff85"
        red="#eb345b"
        playerTurn={playerWin || playerTurn}
      >
        {fields?.map((_: any, irow: number) => (
          <Row key={`row-${irow}`}>
            {fields[irow]?.map((status: 0 | 1 | 2, icolumn: number) => (
              <Field
                key={`column-${icolumn}`}
                isRed={status === 1}
                isYellow={status === 2}
                onClick={() => handleClickField(irow, icolumn)}
              >
                {status === 1 && <Piece bgImg={redImg} />}
                {status === 2 && <Piece bgImg={yellowImg} />}
              </Field>
            ))}
          </Row>
        ))}
      </Board>

      {playerWin && (
        <RematchButton
          type="button"
          onClick={() => {
            createNewGame();
            setPlayerWin(null);
            setPlayerStartedRound(playerStartedRound === 1 ? 2 : 1);
            setPlayerTurn(playerStartedRound === 1 ? 2 : 1);
          }}
        >
          REMATCH
        </RematchButton>
      )}
    </FieldContainer>
  );
};

export default Game;
