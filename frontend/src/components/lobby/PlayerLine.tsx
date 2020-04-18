import React, { FC } from "react";

interface IPlayerLine {
  name: string;
}

const PlayerLine: FC<IPlayerLine> = ({ name }) => {
  return (
    <div className="bg-red-400 text-white font-bold rounded-md p-4 mb-4">
      {name}
    </div>
  );
};

export default PlayerLine;
