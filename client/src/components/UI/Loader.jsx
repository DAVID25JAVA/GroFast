import React from "react";

function Loader() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Loader;
