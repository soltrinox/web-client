import ImageBaseElement from "components/avatar/image-base.element";
import Leverage from "components/leverage/leverage";
import PieContainerSmall from "components/pie-container/pie-container-small";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import StatisticItem from "components/statistic-item/statistic-item";
import * as React from "react";
import { useTranslation } from "react-i18next";
import filesService from "services/file-service";

import { FollowDetailsDataType } from "../follow-details.types";

const _PerformanceData: React.FC<Props> = ({ description }) => {
  const [t] = useTranslation();
  return (
    <StatisticItemList className="asset-details-description__performance-data">
      <StatisticItem label={t("program-details-page.description.broker")}>
        <ImageBaseElement
          className={"asset-details-description__broker"}
          src={description.brokerDetails.logo}
        />
      </StatisticItem>
      <StatisticItem label={t("program-details-page.description.currency")}>
        {description.currency}
      </StatisticItem>
    </StatisticItemList>
  );
};

interface Props {
  description: FollowDetailsDataType;
}

const PerformanceData = React.memo(_PerformanceData);
export default PerformanceData;
