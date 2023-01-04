import React from "react";

const IMAGE_LOGO_SRC = "small_logo.png";

const ArrlandLogo: React.FC = (): JSX.Element => {
  return (
    <div className="relative w-full max-w-[400px] m-5 ml-4 mr-0">
      <a href="https://arrland.com" rel="noopener noreferrer">
        <img
          src={IMAGE_LOGO_SRC}
          alt="Pirates of Arrland"
          className="xl:min-w-[200px] h-auto mx-auto cursor-pointer dsm:-ml-3"
        />
      </a>
    </div>
  );
};

export default ArrlandLogo;
