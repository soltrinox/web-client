import {
  ILabeledValueProps,
  LabeledValueDirection
} from "components/labeled-value/labeled-value.types";
import { css } from "styled-components";

export interface StyleProps {
  direction?: LabeledValueDirection;
}

export const dynamicLabeledValueStyles = css`
  display: flex;
  width: 100%;
  flex-direction: ${({ direction = "column" }: StyleProps) => {
    switch (direction) {
      case "column":
        return "column";
      case "row":
        return "row";
    }
  }};
  ${({ direction = "column" }: StyleProps) =>
    direction === "row" && "justify-content: space-between"}};
`;
