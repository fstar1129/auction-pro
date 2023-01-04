import React from "react";

interface IPageProps {
  name: string;
}

const Empty: React.FC<IPageProps> = ({ name }): JSX.Element => {
  return (
    <div className="mt-5 min-h-[40vh] flex flex-row pt-10 lg:pt-0 font-normal flex-wrap mx-auto items-center justify-center font-display text-2xl text-elementor-text-3">
      Your {name} collection is empty.
    </div>
  );
};

export default Empty;
