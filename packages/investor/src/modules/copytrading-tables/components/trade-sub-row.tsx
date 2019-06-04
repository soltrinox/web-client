import { OrderSignalProgramInfo } from "gv-api-web";
import {
  CloseCopytradingTrade,
  closeCopytradingTrade
} from "modules/copytrading-tables/services/copytrading-tables.service";
import { useState } from "react";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import GVButton from "shared/components/gv-button";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";

const _TradeSubRow: React.FC<Props> = props => {
  const { provider, tradeId, closeCopytradingTrade, symbol, t } = props;
  const [isOpenPopup, setOpenPopup] = useState<boolean>(false);
  return (
    <TableRow key={provider.programId}>
      <TableCell className="details-trades__cell program-details-trades__cell--direction">
        {provider.program.title}
      </TableCell>
      <TableCell className="details-trades__cell program-details-trades__cell--direction" />
      <TableCell className="details-trades__cell program-details-trades__cell--direction">
        {provider.volume}
      </TableCell>
      <TableCell className="details-trades__cell program-details-trades__cell--direction" />
      <TableCell className="details-trades__cell program-details-trades__cell--direction" />
      <TableCell className="details-trades__cell program-details-trades__cell--direction" />
      <TableCell className="details-trades__cell program-details-trades__cell--direction">
        <GVButton variant="text" onClick={() => setOpenPopup(true)}>
          {t("buttons.cancel")}
        </GVButton>
        <ConfirmPopup
          header={t("investor.copytrading-tables.close-trade-confirm.header")}
          body={t("investor.copytrading-tables.close-trade-confirm.body", {
            symbol: symbol,
            volume: provider.volume
          })}
          onClose={() => setOpenPopup(false)}
          open={isOpenPopup}
          onApply={() => {
            setOpenPopup(false);
            closeCopytradingTrade(tradeId, () => {}, provider.programId);
          }}
        />
      </TableCell>
    </TableRow>
  );
};

const TradeSubRow = compose<React.FC<OwnProps>>(
  translate(),
  connect<{}, DispatchProps>(
    undefined,
    {
      closeCopytradingTrade
    }
  )
)(_TradeSubRow);

export default TradeSubRow;

interface Props extends DispatchProps, OwnProps, InjectedTranslateProps {}

interface OwnProps {
  provider: OrderSignalProgramInfo;
  tradeId: string;
  symbol: string;
}

interface DispatchProps {
  closeCopytradingTrade: CloseCopytradingTrade;
}
