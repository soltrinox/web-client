import clsx from "clsx";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
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
}) => {
  const { linkCreator } = useToLink();
  return (
    <Tooltip render={() => <TooltipContent>{guideName}</TooltipContent>}>
      <span
        className={clsx(styles["guide-block__link"], {
          [styles["guide-block__link--next"]]: isNext
        })}
      >
        <Link
          wide
          white
          to={linkCreator(`${GUIDES_TOTAL_PAGE_ROUTE}#${guideLink}`)}
        >
          {children}
        </Link>
      </span>
    </Tooltip>
  );
};

const GuideBlockLink = React.memo(_GuideBlockLink);
export default GuideBlockLink;
