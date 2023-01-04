import React from "react";

const Footer: React.FC = (): JSX.Element => {
  return (
    <div>
      <p className="font-display text-sm text-elementor-text-3 p-4 text-center w-full">
        ArrLabs FZ-LLC {new Date().getFullYear()} All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
