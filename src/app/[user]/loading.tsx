import React from "react";

import { ImSpinner2 } from "react-icons/im";

const Loading = () => {
  return (
    <main className="grid grid-row justify-center ">
      <p>loading...</p>
      <ImSpinner2 className="animate-spin text-2xl m-auto mt-10" />
    </main>
  );
};

export default Loading;
