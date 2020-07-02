import classNames from "classnames";
import React from "react";
import { SizesType } from "utils/types";

import styles from "./style.module.scss";

export interface GVButtonProps {
  isSuccessful?: boolean;
  isPending?: boolean;
  testId?: string;
  bold?: boolean;
  wide?: boolean;
  size?: SizesType;
  id?: string;
  title?: string;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "primary-dark" | "danger";
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  successSymbol?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  name?: string;
  noPadding?: boolean;
}

const GVButton: React.FC<GVButtonProps> = ({
  isSuccessful,
  isPending,
  testId,
  bold,
  wide,
  size = "middle",
  id,
  className,
  title,
  variant = "contained",
  color = "primary",
  type = "button",
  successSymbol = true,
  disabled,
  onClick,
  children,
  name,
  noPadding
}) => {
  const classname = classNames(styles["gv-btn"], className, {
    [styles["gv-btn--successful"]]: isSuccessful,
    [styles["gv-btn--pending"]]: isPending,
    [styles["gv-btn--bold"]]: bold,
    [styles["gv-btn--wide"]]: wide,
    [styles["gv-btn--large"]]: size === "large",
    [styles["gv-btn--xlarge"]]: size === "xlarge",
    [styles["gv-btn--small"]]: size === "small",
    [styles["gv-btn--xsmall"]]: size === "xsmall",
    [styles["gv-btn--danger"]]: color === "danger",
    [styles["gv-btn--primary"]]: color === "primary",
    [styles["gv-btn--secondary"]]: color === "secondary",
    [styles["gv-btn--primary-dark"]]: color === "primary-dark",
    [styles["gv-btn--text"]]: variant === "text",
    [styles["gv-btn--outlined"]]: variant === "outlined",
    [styles["gv-btn--contained"]]: variant === "contained",
    [styles["gv-btn--no-padding"]]: noPadding
  });
  return (
    <button
      data-test-id={testId}
      id={id}
      disabled={disabled}
      className={classname}
      onClick={onClick}
      title={title}
      type={type}
      name={name}
    >
      <span
        className={classNames(styles["gv-btn__label"], {
          [styles["gv-btn__label--success"]]: isSuccessful
        })}
      >
        {children}
      </span>
      {successSymbol && (
        <span
          className={classNames(styles["gv-btn__success-symbol"], {
            [styles["gv-btn__success-symbol--success"]]: isSuccessful
          })}
        >
          ✔
        </span>
      )}
    </button>
  );
};

export default GVButton;
