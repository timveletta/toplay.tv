import React from "react";

const PlayerLine = ({ name, ...props }) => {
  return (
    <div className="bg-red-400 text-white font-bold rounded-md p-4 mb-4">
      {name}
    </div>
  );
};

export default PlayerLine;
