import { WalletData } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import { updateWalletTimestampAction } from "pages/wallet/actions/wallet.actions";
import { walletsSelector } from "pages/wallet/reducers/wallet.reducers";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twoFactorEnabledSelector } from "reducers/2fa-reducer";
import { SetSubmittingType } from "utils/types";

import * as walletWithdrawService from "../services/wallet-withdraw.services";
import WalletWithdrawForm, {
  IWalletWithdrawFormValues
} from "./wallet-withdraw-form";
import WalletWithdrawRequest from "./wallet-withdraw-request/wallet-withdraw-request";

const _WalletWithdrawContainer: React.FC<Props> = ({ currentWallet }) => {
  const twoFactorEnabled = useSelector(twoFactorEnabledSelector);
  const wallets = useSelector(walletsSelector);
  const dispatch = useDispatch();
  const [isSuccess, setSuccess, setNotSuccess] = useIsOpen();
  const updateWalletMiddleware = () => {
    setSuccess();
    dispatch(updateWalletTimestampAction());
  };
  const { errorMessage, sendRequest } = useApiRequest({
    middleware: [updateWalletMiddleware],
    request: values =>
      dispatch(walletWithdrawService.newWithdrawRequest(values)),
    catchCallback: () => setNotSuccess()
  });
  const handleSubmit = useCallback(
    (values: IWalletWithdrawFormValues, setSubmitting: SetSubmittingType) => {
      sendRequest({ ...values, amount: Number(values.amount) }, setSubmitting);
    },
    []
  );
  if (!wallets.length) return null;
  const enabledWallets = wallets.filter(wallet => wallet.isWithdrawalEnabled);
  return isSuccess ? (
    <WalletWithdrawRequest />
  ) : (
    <WalletWithdrawForm
      wallets={enabledWallets}
      currentWallet={currentWallet}
      errorMessage={errorMessage}
      onSubmit={handleSubmit}
      twoFactorEnabled={twoFactorEnabled}
    />
  );
};

interface Props {
  currentWallet: WalletData;
}

const WalletWithdrawContainer = React.memo(_WalletWithdrawContainer);
export default WalletWithdrawContainer;
