import React from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="main">
      <div className="loading">
        <BeatLoader color="#ccc" loading />
      </div>
    </div>
  );
};
export default Loading;
