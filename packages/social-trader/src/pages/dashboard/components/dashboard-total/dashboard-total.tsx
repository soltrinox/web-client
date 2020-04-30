import GVColors from "components/gv-styles/gv-colors";
import { Row } from "components/row/row";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import { PieStatisticItem } from "components/statistic-item/pie-statistic-item";
import StatisticItem from "components/statistic-item/statistic-item";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { withBlurLoader } from "decorators/with-blur-loader";
import WalletDeposit from "modules/wallet-deposit/wallet-deposit";
import DashboardStatisticPeriods from "pages/dashboard/components/dashboard-statistic/dashboard-statistic-periods";
import DashboardValueItem from "pages/dashboard/components/dashboard-statistic/dashboard-value-item";
import {
  $pieAvailableColor,
  $piePendingColor
} from "pages/wallet/components/wallet-balance/wallet-balance-elements";
import React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

import { TDashboardTotal } from "../../dashboard.types";

const _DashboardTotal: React.FC<Props> = ({
  currency,
  data: { wallets, invested, trading, profits, total }
}) => {
  const [t] = useTranslation();
  const hasMoney = total > 0;
  const hasProfits =
    Object.values(profits)
      .map(({ profit }) => profit)
      .reduce((prev, cur) => prev + cur, 0) !== 0;
  return (
    <div className="dashboard-total__values">
      <StatisticItemList>
        <DashboardValueItem
          big
          label={
            <TooltipLabel
              tooltipContent={t("dashboard-page.tooltips.total.total-balance")}
              labelText={t("dashboard-page.total.total")}
            />
          }
          value={total}
          currency={currency}
        />
        <PieStatisticItem
          suffix={currency}
          color={GVColors.$primaryColor}
          tooltipContentLabel={t("dashboard-page.tooltips.total.invested")}
          label={t("dashboard-page.total.invested")}
          value={invested}
          total={total}
        />
        <PieStatisticItem
          suffix={currency}
          color={$piePendingColor}
          tooltipContentLabel={t("dashboard-page.tooltips.total.trading")}
          label={t("dashboard-page.total.pending")}
          value={trading}
          total={total}
        />
        <PieStatisticItem
          suffix={currency}
          color={$pieAvailableColor}
          tooltipContentLabel={t("dashboard-page.tooltips.total.wallet")}
          label={t("dashboard-page.total.available")}
          value={wallets}
          total={total}
        />
        {!hasMoney && (
          <StatisticItem>
            <WalletDeposit />
          </StatisticItem>
        )}
      </StatisticItemList>
      {hasProfits && (
        <>
          <h5>
            <TooltipLabel
              tooltipContent={t("dashboard-page.tooltips.total.performance")}
              labelText={t("dashboard-page.total.performance")}
            />
          </h5>
          <Row small>
            <DashboardStatisticPeriods
              data={profits}
              currency={currency}
              withProfitability
            />
          </Row>
        </>
      )}
    </div>
  );
};

interface Props {
  currency: CurrencyEnum;
  data: TDashboardTotal;
}

const DashboardTotal = withBlurLoader(React.memo(_DashboardTotal));
export default DashboardTotal;
