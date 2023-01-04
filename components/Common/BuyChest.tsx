import React from 'react';
import { useAppDispatch } from '../../app/store-hooks';
import { openDialog } from '../../state/dialog/dialogSlice';
const BuyChest: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <button
      className={`flex flex-col items-center justify-center my-2 sm:my-0 'cursor-pointer'`}
      onClick={() => dispatch(openDialog({ currentDialog: 'BUY_CHEST' }))}
    >
      <img
        alt="Exchange"
        src={'exchange_and_buy/chest_neutral.png'}
        className="w-[45px] min-w-[45px] h-auto"
        onMouseEnter={({ currentTarget }) => currentTarget?.setAttribute('src', 'exchange_and_buy/chest_active.png')}
        onMouseLeave={({ currentTarget }) => currentTarget?.setAttribute('src', 'exchange_and_buy/chest_neutral.png')}
      />

      <span className="font-display text-center text-elementor-text-3 w-[150px]">Buy Chest</span>
    </button>
  );
};

export default BuyChest;
