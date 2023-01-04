import React from "react";
import AuthButton from "./Partials/AuthButton";
import ArrlandLogo from "../Common/ArrlandLogo";

const Authentication: React.FC = (): JSX.Element => {
  return (
    <div className="p-5 rounded-md mx-auto text-white h-[80vh] flex items-center justify-center">
      <div>
        <ArrlandLogo />
        <h1 className="text-md my-10 text-xl font-bold font-display">
          Log in or create an account
        </h1>
        <div className="flex flex-col justify-around items-center max-w-md mx-auto mt-20">
          <AuthButton />
        </div>
      </div>
    </div>
  );
};

export default Authentication;
