import React from 'react';

interface IButtons {
  title: string;
}

const UnactibeButton: React.FC<IButtons> = ({ title }): JSX.Element => {
  return (
    <button className="mx-2 cursor-not-allowed flex items-center opacity-[0.25]" disabled={true}>
      <div className="flex w-[125px] h-[30px] border-[#6EC1E4] border-2 rounded-md"></div>
      <div className="absolute">
        <div className="flex justify-center items-center text-center">
          <p className={`text-sm font-display w-[125px] mx-auto`}>{title}</p>
        </div>
      </div>
    </button>
  );
};

export default UnactibeButton;
