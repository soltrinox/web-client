import {
  CancelablePromise,
  Currency,
  ItemsViewModelTransactionViewModel,
  WalletBaseData
} from "gv-api-web";
import { NextPageContext } from "next";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import { CurrencyEnum, RootThunk } from "shared/utils/types";

import * as actions from "../actions/wallet.actions";

export const fetchWalletsWithCtx = (
  ctx?: NextPageContext
): RootThunk<void> => async (dispatch, getState) => {
  const authorization = authService.getAuthArg(ctx);
  const { info } = getState().wallet;
  if (info.isPending) return;
  const { currency } = getState().accountSettings;
  await dispatch(actions.updateWalletTimestampAction());
  await dispatch(actions.fetchWalletsAction(currency, authorization));
};

export const fetchWallets = (
  currency: CurrencyEnum,
  ctx?: NextPageContext
): RootThunk<void> => async dispatch => {
  const authorization = authService.getAuthArg(ctx);
  await dispatch(actions.updateWalletTimestampAction());
  await dispatch(actions.fetchWalletsAction(currency, authorization));
};

export const fetchAccounts = (
  ctx?: NextPageContext
): RootThunk<void> => async dispatch => {
  await dispatch(actions.updateAccountTimestampAction());
};

export type TWalltetsBaseData = WalletBaseData[];
export const fetchBaseWallets = ({
  currency
}: {
  currency: CurrencyEnum;
}): CancelablePromise<TWalltetsBaseData> => {
  const authorization = authService.getAuthArg();
  return walletApi
    .getWalletAvailable(currency, authorization)
    .then(res => res.wallets);
};

export const fetchWalletTransactions = (requestFilters?: FilteringType) =>
  actions.fetchWalletTransactionsAction(
    authService.getAuthArg(),
    requestFilters
  );

export const offPayFeesWithGvt = () =>
  walletApi.switchPayFeeInGvtOff(authService.getAuthArg());

export const onPayFeesWithGvt = () =>
  walletApi.switchPayFeeInGvtOn(authService.getAuthArg());

export type FetchTransactionsInternalFilterType = {
  transactionType?:
    | "All"
    | "Investment"
    | "Withdrawal"
    | "Deposit"
    | "Conversion"
    | "Commission"
    | "Program"
    | "Fund"
    | "Follow"
    | "TradingAccounts"
    | "AgentReward"
    | "Platform";
  dateFrom?: Date;
  dateTo?: Date;
  skip?: number;
  take?: number;
};

export const fetchMultiTransactions = (
  currency?: Currency,
  filters?: FetchTransactionsInternalFilterType
): CancelablePromise<ItemsViewModelTransactionViewModel> => {
  const authorization = authService.getAuthArg();

  return walletApi.getTransactionsInternal(authorization, {
    ...filters
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
  currency?: string,
  filters?: FetchTransactionsExternalFilterType
): CancelablePromise<ItemsViewModelTransactionViewModel> => {
  const authorization = authService.getAuthArg();
  return walletApi.getTransactionsExternal(authorization, filters);
};
