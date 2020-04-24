import React, { FC } from "react";
import COLORS from "../../constants/colors.json";

interface IPlayerLine {
  name: string;
  color: string;
}

const PlayerLine: FC<IPlayerLine> = ({ name, color }) => {
  return (
    <div
      className={`${
        (COLORS as any)[color]
      } text-white font-bold rounded-md p-4 mb-4`}
    >
      {name}
    </div>
  );
};

export default PlayerLine;
