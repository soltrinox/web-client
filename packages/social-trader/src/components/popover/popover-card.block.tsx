import clsx from "clsx";
import React from "react";
import { SizesType } from "utils/types";

import styles from "./popover-content.block.module.scss";

export const PopoverContentCardBlock: React.FC<IPopoverContentCardBlockProps> = ({
  children,
  dark,
  className,
  size = "middle",
  stretched,
  fixed
}) => {
  return (
    <div
      className={clsx(styles["popover-content__block"], className, {
        [styles["popover-content__block--fixed"]]: fixed,
        [styles["popover-content__block--stretched"]]: stretched,
        [styles["popover-content__block--dark"]]: dark,
        [styles["popover-content__block--small"]]: size === "small",
        [styles["popover-content__block--middle"]]: size === "middle",
        [styles["popover-content__block--big"]]: size === "large"
      })}
    >
      {children}
    </div>
  );
};
interface IPopoverContentCardBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  dark?: boolean;
  className?: string;
  size?: SizesType | null;
  stretched?: boolean;
  fixed?: boolean;
}
