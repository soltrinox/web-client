import { CurrencySourceSelectElement } from "components/currency-source-select/currency-source-select.element";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogTop } from "components/dialog/dialog-top";
import GVqr from "components/gv-qr/gv-qr";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { Row } from "components/row/row";
import { ISelectChangeEvent } from "components/select/select";
import withLoader from "decorators/with-loader";
import { WalletData } from "gv-api-web";
import { useAccountCurrency } from "hooks/account-currency.hook";
import CopyButton from "modules/copy-button/copy-button";
import { fetchWalletsAction } from "pages/wallet/actions/wallet.actions";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { safeGetElemFromArray } from "utils/helpers";
import { fontSize } from "utils/style/mixins";
import { $fontSizeParagraphMobile } from "utils/style/sizes";

interface Props {
  wallets: WalletData[];
  currentWallet: WalletData;
}

const Bottom = styled(DialogBottom)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddressBlock = styled(Row)`
  text-align: center;
`;

const AddressValue = styled.div`
  ${fontSize($fontSizeParagraphMobile)}
`;

const _WalletAddFundsForm: React.FC<Props> = ({ wallets, currentWallet }) => {
  const dispatch = useDispatch();
  const accountCurrency = useAccountCurrency();
  const [t] = useTranslation();
  const [selected, setSelected] = useState<WalletData>(currentWallet);
  const { depositAddress } = selected;
  const onChangeWallet = useCallback(
    (event: ISelectChangeEvent) => {
      setSelected(
        safeGetElemFromArray(
          wallets,
          wallet => wallet.id === event.target.value
        )
      );
    },
    [wallets, setSelected]
  );

  const handleClickUpdate = useCallback(() => {
    dispatch(fetchWalletsAction(accountCurrency));
  }, []);
  return (
    <div>
      <DialogTop title={t("wallet-deposit.title")}>
        <Row size={"large"}>
          <CurrencySourceSelectElement
            onClickUpdate={handleClickUpdate}
            name=""
            items={wallets}
            value={selected.id}
            wide
            label={t("wallet-deposit.select-currency")}
            onChange={onChangeWallet}
          />
        </Row>
      </DialogTop>
      <Bottom>
        <Row>
          <GVqr value={depositAddress} />
        </Row>
        <AddressBlock>
          <LabeledValue label={t("wallet-deposit.deposit-address")}>
            <AddressValue>{depositAddress}</AddressValue>
          </LabeledValue>
        </AddressBlock>
        <DialogButtons>
          <CopyButton wide value={depositAddress} />
        </DialogButtons>
      </Bottom>
    </div>
  );
};

const WalletAddFundsForm = withLoader(React.memo(_WalletAddFundsForm));
export default WalletAddFundsForm;
