import styled from 'styled-components';
import { lighten, darken } from 'polished';

interface FieldProps {
  isRed?: boolean;
  isYellow?: boolean;
  yellowImg?: string;
  redImg?: string;
  fieldImg?: string;
}

export const Field = styled.div<FieldProps>`
  background-size: cover;
  background-repeat: no-repeat;

  width: 85px;
  height: 85px;

  :hover {
    cursor: pointer;
  }
`;

interface BgImgProps {
  bgImg?: string;
  red?: string;
  yellow?: string;
  playerTurn?: number;
}

export const Piece = styled.div<BgImgProps>`
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  background-repeat: no-repeat;
  width: 85px;
  height: 85px;
`;

export const Board = styled.div<BgImgProps>`
  display: flex;
  align-items: center;
  flex-direction: column;

  filter: drop-shadow(
    0 0 1rem ${(props) => (props.playerTurn === 1 ? props.red : props.yellow)}
  );

  border: 6px solid #4366a1;
  border-radius: 5px;

  background-image: url(${(props) => props.bgImg});
  background-color: #020824;

  background-size: cover;
  background-repeat: no-repeat;
`;

export const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
`;

interface VictoryTextProps {
  color?: string;
}

export const VictoryText = styled.h2<VictoryTextProps>`
  margin-top: 20px;
  font-size: 25px;

  color: ${(props) => props.color};
`;

export const RematchButton = styled.button`
  background: #06995e;

  cursor: pointer;
  border-radius: 3px;
  border: none;
  outline: none;
  margin: 0;
  margin-top: 30px;
  font-weight: bold;
  padding: 10px 20px;
  color: #fff;

  :hover {
    background: ${lighten(0.05, '#06995e')};
  }

  :active {
    background: ${darken(0.1, '#06995e')};
  }
`;
