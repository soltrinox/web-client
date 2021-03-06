import clsx from "clsx";
import Link from "components/link/link";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { GUIDES_TOTAL_PAGE_ROUTE } from "pages/guides/guides.paths";
import React from "react";

import styles from "./guide-block.module.scss";

interface Props {
  guideLink: string;
  guideName: string;
  isNext?: boolean;
  children: string;
}

const _GuideBlockLink: React.FC<Props> = ({
  guideLink,
  guideName,
  isNext,
  children
}) => (
  <Link
    className={clsx(styles["guide-block__link"], {
      [styles["guide-block__link--next"]]: isNext
    })}
    wide
    white
    to={`${GUIDES_TOTAL_PAGE_ROUTE}#${guideLink}`}
  >
    <Tooltip render={() => <TooltipContent>{guideName}</TooltipContent>}>
      <span>{children}</span>
    </Tooltip>
  </Link>
);

const GuideBlockLink = React.memo(_GuideBlockLink);
export default GuideBlockLink;
