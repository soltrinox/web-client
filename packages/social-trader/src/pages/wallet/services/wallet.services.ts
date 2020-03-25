import { FilteringType } from "components/table/components/filtering/filter.type";
import {
  Currency,
  TransactionViewModelItemsViewModel,
  WalletBaseData
} from "gv-api-web";
import { NextPageContext } from "next";
import { api, Token } from "services/api-client/swagger-custom-client";
import { CurrencyEnum, RootThunk } from "utils/types";

import * as actions from "../actions/wallet.actions";

export const fetchWalletsWithCtx = (
  ctx?: NextPageContext
): RootThunk<void> => async (dispatch, getState) => {
  const { info } = getState().wallet;
  if (info.isPending) return;
  const { currency } = getState().accountSettings;
  await dispatch(actions.updateWalletTimestampAction());
  await dispatch(actions.fetchWalletsAction(currency, Token.create(ctx)));
};

export const fetchWallets = (
  currency: CurrencyEnum,
  ctx?: NextPageContext
): RootThunk<void> => async dispatch => {
  await dispatch(actions.updateWalletTimestampAction());
  await dispatch(actions.fetchWalletsAction(currency, Token.create(ctx)));
};

export type TWalletsAvailableData = WalletBaseData[];
export const fetchAvailableWallets = ({
  currency
}: {
  currency: CurrencyEnum;
}): Promise<TWalletsAvailableData> => {
  return api
    .wallet(Token.create())
    .getWalletAvailable(currency)
    .then(({ wallets }) => wallets);
};

export const fetchWalletTransactions = (requestFilters?: FilteringType) =>
  actions.fetchWalletTransactionsAction(requestFilters);

export const offPayFeesWithGvt = () =>
  api.wallet(Token.create()).switchPayFeeInGvtOff();

export const onPayFeesWithGvt = () =>
  api.wallet(Token.create()).switchPayFeeInGvtOn();

export type FetchTransactionsInternalFilterType = {
  transactionType?:
    | "All"
    | "Investment"
    | "Withdrawal"
    | "Conversion"
    | "Commission"
    | "Program"
    | "Fund"
    | "Follow"
    | "TradingAccounts"
    | "AgentReward";
  dateFrom?: Date;
  dateTo?: Date;
  currency?: Currency;
  skip?: number;
  take?: number;
};

export const fetchMultiTransactions = (
  currency?: CurrencyEnum,
  filters?: FetchTransactionsInternalFilterType
): Promise<TransactionViewModelItemsViewModel> => {
  return api.wallet(Token.create()).getTransactionsInternal({
    ...filters,
    currency
  });
};

export type FetchTransactionsExternalFilterType = {
  transactionType?: "All" | "Withdrawal" | "Deposit" | "Platform";
  dateFrom?: Date;
  dateTo?: Date;
  skip?: number;
  take?: number;
};

export const fetchMultiTransactionsExternal = (
  currency?: CurrencyEnum,
  filters?: FetchTransactionsExternalFilterType
): Promise<TransactionViewModelItemsViewModel> => {
  return api.wallet(Token.create()).getTransactionsExternal({
    ...filters,
    currency
  });
};
