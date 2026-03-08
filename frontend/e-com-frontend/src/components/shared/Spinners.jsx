import React from "react";
import { FidgetSpinner } from "react-loader-spinner";
export const Spinners = () => {
  return (
    <div>
      <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
      />
    </div>
  );
};

export default Spinners;
