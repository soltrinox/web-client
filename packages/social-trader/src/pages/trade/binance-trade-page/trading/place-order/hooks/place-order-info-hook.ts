import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { getSymbol } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { AssetBalance, ExchangeInfo, OrderSide } from "pages/trade/binance-trade-page/trading/terminal.types";
import { useContext, useMemo } from "react";

import { getBalance, getFilterValues } from "../place-order.helpers";

export interface UsePlaceOrderInfoReturn {
  minPrice: number;
  maxPrice: number;
  minQuantity: number;
  minNotional: number;
  maxQuantityWithWallet: number;
  maxTotalWithWallet: number;
}

export const usePlaceOrderInfo = ({
  exchangeInfo,
  balances,
  side
}: {
  exchangeInfo: ExchangeInfo;
  side: OrderSide;
  balances: AssetBalance[];
}): UsePlaceOrderInfoReturn => {
  const {
    symbol: { baseAsset, quoteAsset },
    terminalType
  } = useContext(TerminalInfoContext);

  const filterValues = useMemo(
    () => getFilterValues(exchangeInfo, getSymbol(baseAsset, quoteAsset)),
    [baseAsset, quoteAsset]
  );

  const {
    minPrice,
    maxPrice,
    minQuantity,
    maxQuantity,
    minNotional
  } = filterValues;

  const maxQuantityWithWallet = useMemo(() => {
    return side === "Buy"
      ? +maxQuantity
      : Math.min(
          +maxQuantity,
          +getBalance(
            balances,
            terminalType === "futures" ? quoteAsset : baseAsset
          )
        );
  }, [side, maxQuantity, balances, baseAsset]);

  const maxTotalWithWallet = useMemo(() => {
    return side === "Buy"
      ? +getBalance(balances, quoteAsset)
      : Number.MAX_SAFE_INTEGER;
  }, [side, balances, quoteAsset]);

  return useMemo(
    () => ({
      minPrice,
      maxPrice,
      minQuantity,
      minNotional,
      maxQuantityWithWallet,
      maxTotalWithWallet
    }),
    [
      minPrice,
      maxPrice,
      minQuantity,
      minNotional,
      maxQuantityWithWallet,
      maxTotalWithWallet
    ]
  );
};
