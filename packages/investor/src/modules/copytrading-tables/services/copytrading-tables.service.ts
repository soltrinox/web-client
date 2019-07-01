import { Dispatch } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import signalApi from "shared/services/api-client/signal-api";
import authService from "shared/services/auth-service";

import * as actions from "../actions/copytrading-tables.actions";

export const getCopytradingTradesLog = (accountCurrency?: string) => (
  filters: any
) => {
  const authorization = authService.getAuthArg();
  if (accountCurrency) {
    filters = { ...filters, accountCurrency };
  }
  return actions.fetchCopytradingTradesLog(authorization, filters);
};

export const getCopytradingOpenTrades = (accountCurrency?: string) => (
  filters: any
) => {
  const authorization = authService.getAuthArg();
  if (accountCurrency) {
    filters = { ...filters, accountCurrency };
  }
  return actions.fetchCopytradingOpenTrades(authorization, filters);
};

export const getCopytradingTradesHistory = (accountCurrency?: string) => (
  filters: any
) => {
  const authorization = authService.getAuthArg();
  if (accountCurrency) {
    filters = { ...filters, accountCurrency };
  }
  return actions.fetchCopytradingTradesHistory(authorization, filters);
};

export interface ICopytradingTradesCounts {
  logCount?: number;
  openTradesCount?: number;
  historyCount?: number;
}
export const fetchCopytradingTradesCount = (
  accountCurrency?: string
): Promise<ICopytradingTradesCounts> => {
  const authorization = authService.getAuthArg();
  const filtering = { take: 0, accountCurrency };
  return Promise.all([
    signalApi.v10SignalTradesOpenGet(authorization, filtering),
    signalApi.v10SignalTradesGet(authorization, filtering),
    signalApi.v10SignalTradesLogGet(authorization, filtering)
  ]).then(([openTradesData, historyData, logData]) => ({
    logCount: logData.total,
    openTradesCount: openTradesData.total,
    historyCount: historyData.total
  }));
};

export type CloseCopytradingTrade = (
  tradeId: string,
  onSuccess: () => void,
  programId?: string
) => void;

export const closeCopytradingTrade: CloseCopytradingTrade = (
  tradeId,
  onSuccess,
  programId
) => (dispatch: Dispatch) => {
  const authorization = authService.getAuthArg();
  return signalApi
    .v10SignalTradesByIdClosePost(tradeId, authorization, { programId })
    .then(() => {
      onSuccess();
      dispatch(
        alertMessageActions.success(
          "investor.copytrading-tables.close-trade-confirm.success-message",
          true
        )
      );
    })
    .catch(() => {
      dispatch(
        alertMessageActions.error(
          "investor.copytrading-tables.close-trade-confirm.error-message",
          true
        )
      );
    });
};
