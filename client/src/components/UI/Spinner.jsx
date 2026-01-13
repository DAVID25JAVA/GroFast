import React from "react";

function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin w-7 h-7 rounded-full border-4 border-white border-t-green-400"></div>
    </div>
  );
}

export default Spinner;
