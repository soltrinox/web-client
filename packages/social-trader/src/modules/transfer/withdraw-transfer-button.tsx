import { WalletItemType } from "components/wallet-select/wallet-select";
import {
  AssetTypeExt,
  InternalTransferRequestType,
  PrivateTradingAccountType
} from "gv-api-web";
import TransferButton from "modules/transfer/transfer-button";
import { TRANSFER_CONTAINER } from "modules/transfer/transfer.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { Sizeable } from "utils/types";

const _WithdrawTransferButton: React.FC<Props> = props => {
  const {
    outerCurrentItemContainerItems,
    accountType,
    size = "middle"
  } = props;
  const [t] = useTranslation();
  return (
    <TransferButton
      {...props}
      successMessage={"transfer:confirmation.withdraw-success"}
      singleCurrentItemContainer={!outerCurrentItemContainerItems}
      size={size}
      label={t("buttons.withdraw")}
      title={t("transfer:withdraw-from", {
        title: t(`dashboard-page:trading.asset-types.${accountType}`)
      })}
      currentItemContainer={TRANSFER_CONTAINER.SOURCE}
      sourceType={accountType as InternalTransferRequestType}
      destinationType={"Wallet"}
    />
  );
};

interface Props extends Sizeable {
  fixedSelects?: boolean;
  accountId?: string;
  outerCurrentItemContainerItems?: WalletItemType[];
  currentItem: WalletItemType;
  onApply: VoidFunction;
  accountType?: PrivateTradingAccountType | AssetTypeExt;
}

export const WithdrawTransferButton = React.memo(_WithdrawTransferButton);
