import { GV_BTN_SIZE } from "components/gv-button";
import TableCard, {
  TableCardRow
} from "components/table/components/table-card/table-card";
import DepositButton from "modules/deposit/deposit.button";
import { TRecommendation } from "pages/dashboard/dashboard.types";
import * as React from "react";
import { ASSET } from "shared/constants/constants";
import { composeProgramDetailsUrl } from "utils/compose-url";

const _RecommendationCard: React.FC<Props> = ({ asset, title }) => {
  const linkProps = {
    pathname: composeProgramDetailsUrl(asset.url),
    state: `/ ${title}`
  };
  return (
    <TableCard
      level={asset.programDetails && asset.programDetails.level}
      levelProgress={asset.programDetails && asset.programDetails.levelProgress}
      assetId={asset.id}
      profit={asset.statistic && asset.statistic.profit}
      chart={asset.statistic && asset.statistic.chart}
      hasAvatar
      title={asset.title}
      logo={asset.logo}
      detailsUrl={linkProps}
    >
      <div className="dashboard-recommendations-card__row">
        <DepositButton
          size={GV_BTN_SIZE.BIG}
          broker={asset.broker && asset.broker.type}
          type={asset.assetType as ASSET}
          id={asset.id}
          currency={asset.currency}
        />
      </div>
    </TableCard>
  );
};

interface Props {
  asset: TRecommendation;
  title: string;
}

const RecommendationCard = React.memo(_RecommendationCard);
export default RecommendationCard;
