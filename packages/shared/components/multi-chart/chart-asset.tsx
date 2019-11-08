import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import Link from "shared/components/link/link";
import SelectedMark from "shared/components/selected-mark/selected-mark";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";

import { TChartAsset } from "./multi-chart.types";

const _ChartAsset: React.FC<Prop> = ({ asset, selected, onToggle }) => {
  const [t] = useTranslation();
  return (
    <div
      className={classNames("multi-chart__asset", {
        "multi-chart__asset--selected": selected
      })}
      onClick={() => onToggle(asset.id)}
    >
      <SelectedMark
        selected={selected}
        className="multi-chart__selected-mark"
      />
      <Link
        to={{
          pathname: composeProgramDetailsUrl(asset.url),
          state: `/ ${t("dashboard-page.title")}`
        }}
      >
        <div className="multi-chart__asset-name">
          <AssetAvatar url={asset.logo} alt={asset.title} />
          <div className="multi-chart__asset-name">{asset.title}</div>
        </div>
      </Link>
    </div>
  );
};

interface Prop {
  asset: TChartAsset;
  selected: boolean;
  onToggle: (asset: string) => void;
}

const ChartAsset = React.memo(_ChartAsset);
export default ChartAsset;
