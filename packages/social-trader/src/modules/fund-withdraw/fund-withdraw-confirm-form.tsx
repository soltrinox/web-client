import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogError } from "components/dialog/dialog-error";
import GVButton from "components/gv-button";
import { SHOW_SUCCESS_TIME } from "constants/constants";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { formatValue } from "utils/formatter";
import { HookForm } from "utils/hook-form.helpers";

import { FundWithdrawResult } from "./fund-withdraw-result";
import { withdrawFund } from "./services/fund-withdraw.services";

const _FundWithdrawConfirm: React.FC<IFundWithdrawConfirmProps> = ({
  onApply = () => {},
  onClose,
  id,
  availableToWithdraw,
  percent,
  currency,
  exitFee,
  onBackClick
}) => {
  const onCloseMiddleware = () => {
    setTimeout(() => onClose(), SHOW_SUCCESS_TIME);
  };
  const { errorMessage, sendRequest } = useApiRequest({
    middleware: [onCloseMiddleware, onApply],
    request: withdrawFund,
    successMessage: "withdraw-fund.success-alert-message"
  });
  const handleSubmit = useCallback(
    () =>
      sendRequest({
        id,
        value: {
          percent,
          currency
        }
      }),
    [percent, currency, id]
  );
  return (
    <FundWithdrawConfirmForm
      errorMessage={errorMessage}
      availableToWithdraw={availableToWithdraw}
      percent={percent}
      currency={currency}
      exitFee={exitFee}
      onSubmit={handleSubmit}
      onBackClick={onBackClick}
    />
  );
};

interface IFundWithdrawConfirmProps {
  onApply?: VoidFunction;
  onClose: (param?: any) => void;
  id: string;
  availableToWithdraw: number;
  percent: number;
  currency: string;
  exitFee: number;
  errorMessage?: string;
  onBackClick: () => void;
}
export const FundWithdrawConfirm = React.memo(_FundWithdrawConfirm);

const _FundWithdrawConfirmForm: React.FC<Props> = ({
  onSubmit,
  availableToWithdraw,
  percent,
  currency,
  exitFee,
  errorMessage,
  onBackClick
}) => {
  const [t] = useTranslation();
  const form = useForm();
  const {
    handleSubmit,
    formState: { isSubmitted, isSubmitting }
  } = form;
  return (
    <HookForm form={form} onSubmit={handleSubmit(onSubmit)}>
      <div className="dialog-list__item">
        {t("withdraw-fund.withdrawing")}
        <span className="dialog-list__value">{formatValue(percent, 2)} %</span>
      </div>
      <FundWithdrawResult
        availableToWithdraw={availableToWithdraw}
        percent={percent}
        currency={currency}
        exitFee={exitFee}
      />
      <DialogError error={errorMessage} />
      <DialogButtons>
        <GVButton
          onClick={onBackClick}
          color="secondary"
          variant="outlined"
          title={t("buttons.back")}
        >
          {t("buttons.back")}
        </GVButton>
        <GVButton
          isSuccessful={isSubmitted && !errorMessage}
          isPending={isSubmitting}
          type="submit"
          id="fundWithdrawFormSubmit"
          disabled={isSubmitting}
        >
          {t("buttons.confirm")}
        </GVButton>
      </DialogButtons>
    </HookForm>
  );
};

interface Props {
  availableToWithdraw: number;
  percent: number;
  currency: string;
  exitFee: number;
  errorMessage?: string;
  onSubmit: () => void;
  onBackClick: () => void;
}

const FundWithdrawConfirmForm = React.memo(_FundWithdrawConfirmForm);
