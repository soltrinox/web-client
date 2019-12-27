import "./broker-info.scss";

import classNames from "classnames";
import React from "react";
import LPButton from "routes/ssr/landing-page/components/lp-button/lp-button";
import { TBrokerInfo } from "routes/ssr/landing-page/static-data/brokers";
import { TRADE } from "routes/trade.routes";

import BrokerAdvantage from "./broker-advantage";

interface Props extends TBrokerInfo {
  className?: string;
  darkTheme?: boolean;
}

const _BrokerInfo: React.FC<Props> = ({
  darkTheme,
  className,
  title,
  description,
  listItems
}) => {
  return (
    <div
      className={classNames("broker-info", className, {
        "broker-info--dark": darkTheme
      })}
    >
      <h3 className="broker-info__subtitle">{title}</h3>
      {description && <p className="broker-info__description">{description}</p>}
      <LPButton href={TRADE}>Start trading</LPButton>
      <ul className="broker-info__list-advantages">
        {listItems.map((item, index) => (
          <BrokerAdvantage
            key={index}
            text={item.text}
            number={item.number}
            imageBg={item.imageBg}
          />
        ))}
      </ul>
    </div>
  );
};

const BrokerInfo = React.memo(_BrokerInfo);
export default BrokerInfo;
