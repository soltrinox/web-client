import "shared/components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import * as React from "react";

import FundDetailsChart from "./fund-details-chart-section/fund-details-chart";
import FundDetailsStatistics from "./fund-details-statistics/fund-details-statistics";

const _FundDetailsStatisticSection: React.FC = () => (
  <div className="details-statistic-section">
    <div className="details-statistic-section__statistic">
      <FundDetailsStatistics />
    </div>
    <div className="details-statistic-section__chart">
      <FundDetailsChart />
    </div>
  </div>
);

const FundDetailsStatisticSection = React.memo(_FundDetailsStatisticSection);
export default FundDetailsStatisticSection;
