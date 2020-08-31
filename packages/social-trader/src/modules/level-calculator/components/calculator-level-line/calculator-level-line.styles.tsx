import {
  $primaryColor,
  $textColor,
  $textLightColor
} from "components/gv-styles/gv-colors/gv-colors";
import { $fontSizeSmall, $paddingXxsmall } from "components/gv-styles/gv-sizes";
import styled from "styled-components";
import { adaptiveMargin, fontSize } from "utils/style/style-mixins";

export const CalculatorLevelLineContainer = styled.div`
  ${adaptiveMargin("bottom", $paddingXxsmall)};
  padding: 10px 0 30px;
`;

export const CalculatorLevelLineLabel = styled.div`
  ${fontSize($fontSizeSmall)};
  ${adaptiveMargin("bottom", $paddingXxsmall)};
  color: ${$textLightColor};
`;

export const CalculatorLevelLineValue = styled.span`
  ${fontSize(15)};
  font-weight: 600;
  margin-left: 5px;
`;

export const CalculatorLevelLineMarks = styled.div`
  position: relative;
`;

export const CalculatorLevelLineMark = styled.span<{
  active?: boolean;
  left: number;
}>`
  ${fontSize($fontSizeSmall)};
  top: 10px;
  position: absolute;
  transform: translateX(-50%);
  color: ${({ active }) => (active ? $primaryColor : $textColor)};
  left: ${({ left }) => left}%;

  &:first-child {
    transform: translateX(0);
  }

  &:last-child {
    transform: translateX(-100%);
  }
`;
