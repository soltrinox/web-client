import { IDefaultBlockProps } from "components/default.block/default.block.types";
import {
  $mainColor,
  $panelBackgroundColor,
  $secondaryBackgroundColor
} from "components/gv-styles/gv-colors/gv-colors";
import {
  $borderRadius,
  $borderRadiusMiddle,
  $paddingMedium,
  $paddingSmall,
  $paddingXsmall,
  $paddingXxsmall
} from "components/gv-styles/gv-sizes";
import { css } from "styled-components";
import { pSBC } from "utils/psbc";
import {
  adaptiveBorderRadius,
  horizontalPaddings,
  transition,
  verticalPaddings
} from "utils/style/style-mixins";

export const defaultBlockDynamicStyles = css`
  box-sizing: border-box;
  background-color: ${({ light, solid }: IDefaultBlockProps) => {
    if (light) return pSBC(0.02, $secondaryBackgroundColor);
    if (solid) return $panelBackgroundColor;
    return "transparent";
  }};
  ${({ hoverable }: IDefaultBlockProps) => {
    if (hoverable)
      return `
         &:hover {
          background-color: ${pSBC(0.01, $secondaryBackgroundColor)};
          ${transition("background-color")}
        }`;
  }};
  width: ${({ wide }: IDefaultBlockProps) => (wide ? "100%" : "auto")};
  border: ${({ bordered }: IDefaultBlockProps) =>
    bordered ? `1px solid rgba(${$mainColor}, 0.06)` : "none"};
  border-radius: ${({
    roundedBorder = true,
    size = "middle"
  }: IDefaultBlockProps) => {
    if (!roundedBorder) return 0;
    switch (size) {
      case "small":
        return adaptiveBorderRadius($borderRadius);
      default:
        return adaptiveBorderRadius($borderRadiusMiddle);
    }
  }};
  ${({
    size = "middle",
    horizontalOffsets = true,
    verticalOffsets = true
  }: IDefaultBlockProps) => {
    switch (size) {
      case "small":
        return `
          ${horizontalOffsets && horizontalPaddings($paddingXxsmall)}
          ${verticalOffsets && verticalPaddings($paddingXxsmall)}
        `;
      case "middle":
        return `
          ${horizontalOffsets && horizontalPaddings($paddingXsmall)}
          ${verticalOffsets && verticalPaddings($paddingXsmall)}
        `;
      case "large":
        return `
          ${horizontalOffsets && horizontalPaddings($paddingSmall)}
          ${verticalOffsets && verticalPaddings($paddingSmall)}
        `;
      case "xlarge":
        return `
          ${horizontalOffsets && horizontalPaddings($paddingMedium)}
          ${verticalOffsets && verticalPaddings($paddingMedium)}
        `;
    }
  }};
`;
