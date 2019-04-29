import "shared/components/details/details.scss";

import FundWithdrawalContainer from "modules/fund-withdrawal/fund-withdrawal-container";
import * as React from "react";
import { connect } from "react-redux";
import { ManagerRootState } from "reducers";
import { compose } from "redux";
import FundDetailsPageCommon from "shared/components/funds/fund-details/fund-details.page";
import { fetchEventsCounts } from "shared/components/funds/fund-details/services/fund-details.service";
import { fetchPortfolioEvents } from "shared/components/programs/program-details/services/program-details.service";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";

import FundControls from "./components/fund-controls";

const _FundDetailsPage: React.FC<StateProps> = ({ events }) => {
  const descriptionSection = {
    FundWithdrawalContainer: FundWithdrawalContainer,
    FundControls: FundControls
  };

  const historySection = {
    fetchPortfolioEvents: fetchPortfolioEvents,
    fetchHistoryCounts: fetchEventsCounts,
    eventTypeFilterValues: events
  };

  return (
    <FundDetailsPageCommon
      descriptionSection={descriptionSection}
      historySection={historySection}
    />
  );
};

const mapStateToProps = (state: ManagerRootState): StateProps => {
  if (!state.platformData.data) return { events: [] };
  const {
    funds
  } = state.platformData.data.enums.program.managerNotificationType;
  const events = funds.map((event: string) => ({
    value: event,
    labelKey: `manager.dashboard-page.portfolio-events.types.${event}`
  }));
  return { events };
};

interface StateProps {
  events: SelectFilterValue<string>[];
}

const FundDetailsPage = compose(
  React.memo,
  connect(mapStateToProps)
)(_FundDetailsPage);
export default FundDetailsPage;
