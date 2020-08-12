import {
  mediaBreakpointDesktop,
  mediaBreakpointLandscapeTablet,
  mediaBreakpointLargeDesktop
} from "components/gv-styles/gv-media";
import {
  $paddingBig,
  $paddingSmall,
  $paddingXsmall
} from "components/gv-styles/gv-sizes";
import Link, { ToType } from "components/link/link";
import NavigationIconWithName from "components/navigation/navigation-icon-with-name";
import { withStyles } from "decorators/withStyles";
import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import React from "react";
import { css } from "styled-components";

import { normalizeLinkFrom } from "../link/link.helper";

interface INavigationItemProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    WithRouterProps {
  small?: boolean;
  href?: string | ToType;
  icon: JSX.Element;
  exact?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const staticStyles = {
  cursor: "pointer",
  display: "flex",
  "align-items": "center",
  padding: `${$paddingSmall / 2}px ${$paddingSmall}px`,
  "text-decoration": "none",
  position: "relative"
};

const dynamicStyles = css`
  opacity: ${({ router, href }: INavigationItemProps) =>
    !!href && router.route.startsWith(normalizeLinkFrom(href)) ? 1 : 0.4};
  &:hover {
    opacity: 1;
  }
  ${mediaBreakpointLandscapeTablet(
    `padding: 0;
      margin-right: ${$paddingXsmall}px;`
  )}
  ${mediaBreakpointDesktop(
    `padding: 0;
      margin-right: ${$paddingBig}px;`
  )}
  ${mediaBreakpointLargeDesktop(
    `margin-right: 70px;
    &:first-child {
        margin-right: ${$paddingBig}px;
    }`
  )}
`;

const _NavigationItem: React.FC<INavigationItemProps> = ({
  className,
  small,
  onClick,
  href,
  icon,
  children
}) => {
  const renderIconWithName = () => (
    <NavigationIconWithName small={small} icon={icon}>
      {children}
    </NavigationIconWithName>
  );
  return (
    (!!href && (
      <Link to={href} className={className}>
        {renderIconWithName()}
      </Link>
    )) || (
      <div className={className} onClick={onClick}>
        {renderIconWithName()}
      </div>
    )
  );
};
const NavigationItem = withRouter(
  withStyles<INavigationItemProps>({
    staticStyles,
    dynamicStyles
  })(React.memo(_NavigationItem))
);
export default NavigationItem;
