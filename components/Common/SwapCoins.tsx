import React from 'react';
import { useAppDispatch } from '../../app/store-hooks';
import { openDialog } from '../../state/dialog/dialogSlice';
const SwapCoins: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <button
      className={`flex flex-col items-center justify-center my-2 sm:my-0 cursor-pointer`}
      onClick={() => dispatch(openDialog({ currentDialog: 'SELL_RUM' }))}
    >
      <img
        alt="Exchange"
        src={'exchange_and_buy/exchange_neutral.png'}
        className="w-[50px] min-w-[45px] h-auto"
        onMouseEnter={({ currentTarget }) => currentTarget?.setAttribute('src', 'exchange_and_buy/exchagne_active.png')}
        onMouseLeave={({ currentTarget }) =>
          currentTarget?.setAttribute('src', 'exchange_and_buy/exchange_neutral.png')
        }
      />
      <span className="font-display text-center text-elementor-text-3 w-[80px]">Swap</span>
    </button>
  );
};

export default SwapCoins;
