import { Slider } from "components/range/range";
import { RANGE_MARKS } from "pages/trade/binance-trade-page/trading/place-order/place-order.helpers";
import React from "react";

export interface IPlaceOrderSliderProps {
  value?: number;
  setValue: (value: number) => void;
}

const _PlaceOrderSlider: React.FC<IPlaceOrderSliderProps> = ({
  value,
  setValue
}) => {
  return (
    <Slider
      included={false}
      min={0}
      max={100}
      marks={RANGE_MARKS}
      value={value}
      onChange={setValue}
    />
  );
};

export const PlaceOrderSlider = React.memo(_PlaceOrderSlider);