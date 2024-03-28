import React from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="loading-container flex justify-center">
      <BeatLoader color="#3498db" loading={true} size={25} />
    </div>
  );
};

export default Loading;
