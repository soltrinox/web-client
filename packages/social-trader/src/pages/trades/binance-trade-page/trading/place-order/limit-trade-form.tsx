import { isAllow } from "components/deposit/components/deposit.helpers";
import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { Slider } from "components/range/range";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import { ReduceOnlyField } from "pages/trades/binance-trade-page/trading/place-order/place-order-settings/reduce-only-field/reduce-only-field";
import {
  TIME_IN_FORCE_VALUES,
  TimeInForceField
} from "pages/trades/binance-trade-page/trading/place-order/place-order-settings/time-in-force-field/time-in-force-field";
import { PlaceOrderSubmitButton } from "pages/trades/binance-trade-page/trading/place-order/place-order-submit-button";
import { TerminalPlaceOrderContext } from "pages/trades/binance-trade-page/trading/terminal-place-order.context";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import {
  Account,
  ExchangeInfo,
  OrderSide,
  TradeCurrency
} from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

import {
  IPlaceOrderFormValues,
  placeOrderDefaultValidationSchema,
  RANGE_MARKS,
  TRADE_FORM_FIELDS,
  usePlaceOrderAutoFill,
  usePlaceOrderFormReset,
  usePlaceOrderInfo
} from "./place-order.helpers";

export interface ILimitTradeFormProps {
  status: API_REQUEST_STATUS;
  outerPrice: number;
  baseAsset: TradeCurrency;
  quoteAsset: TradeCurrency;
  direction: OrderSide;
  onSubmit: (values: IPlaceOrderFormValues) => any;
}

const _LimitTradeForm: React.FC<ILimitTradeFormProps & {
  accountInfo: Account;
  exchangeInfo: ExchangeInfo;
}> = ({
  status,
  accountInfo,
  exchangeInfo,
  outerPrice,
  onSubmit,
  quoteAsset,
  baseAsset,
  direction
}) => {
  const [t] = useTranslation();

  const { terminalType } = useContext(TradingInfoContext);
  const { currentPositionMode } = useContext(TerminalPlaceOrderContext);

  const {
    minPrice,
    maxPrice,
    tickSize,
    minQty,
    stepSize,
    minNotional,
    maxQuantityWithWallet,
    maxTotalWithWallet
  } = usePlaceOrderInfo({
    balances: accountInfo.balances,
    side: direction,
    quoteAsset,
    baseAsset,
    exchangeInfo
  });

  const form = useForm<IPlaceOrderFormValues>({
    validationSchema: placeOrderDefaultValidationSchema({
      t,
      quoteAsset,
      baseAsset,
      stepSize: +stepSize,
      tickSize: +tickSize,
      maxTotal: maxTotalWithWallet,
      maxPrice: +maxPrice,
      minPrice: +minPrice,
      maxQuantity: maxQuantityWithWallet,
      minQuantity: +minQty,
      minNotional: +minNotional
    }),
    defaultValues: {
      [TRADE_FORM_FIELDS.timeInForce]: TIME_IN_FORCE_VALUES[0],
      [TRADE_FORM_FIELDS.price]: outerPrice
    },
    mode: "onChange"
  });
  const { triggerValidation, watch, setValue, reset } = form;
  const { quantity, total, price } = watch();

  const { sliderValue, setSliderValue } = usePlaceOrderFormReset({
    status,
    triggerValidation,
    stepSize,
    outerPrice,
    watch,
    reset,
    baseAsset,
    quoteAsset,
    side: direction,
    setValue,
    balances: accountInfo.balances,
    quantityName: TRADE_FORM_FIELDS.quantity,
    totalName: TRADE_FORM_FIELDS.total
  });

  usePlaceOrderAutoFill({
    totalName: TRADE_FORM_FIELDS.total,
    quantityName: TRADE_FORM_FIELDS.quantity,
    setValue,
    tickSize,
    price,
    quantity,
    stepSize,
    total
  });

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <Row>
        <HookFormAmountField
          autoFocus={false}
          label={t("Price")}
          currency={quoteAsset}
          name={TRADE_FORM_FIELDS.price}
        />
      </Row>
      <Row>
        <HookFormAmountField
          autoFocus={false}
          label={t("Amount")}
          currency={baseAsset}
          name={TRADE_FORM_FIELDS.quantity}
        />
      </Row>
      <Row wide onlyOffset>
        <Slider
          dots
          min={0}
          max={RANGE_MARKS.length - 1}
          marks={RANGE_MARKS}
          value={sliderValue}
          onChange={setSliderValue}
        />
      </Row>
      <Row small>
        <HookFormAmountField
          externalDirty={true}
          autoFocus={false}
          isAllowed={isAllow("BTC")}
          label={t("Total")}
          currency={quoteAsset}
          name={TRADE_FORM_FIELDS.total}
        />
      </Row>
      <PlaceOrderSubmitButton
        isSuccessful={status === API_REQUEST_STATUS.SUCCESS}
        side={direction}
        asset={baseAsset}
      />
      <Row small>
        <RowItem wide>
          <TimeInForceField orderType={"LIMIT"} />
        </RowItem>
        {terminalType === "futures" && currentPositionMode === false && (
          <RowItem wide>
            <ReduceOnlyField />
          </RowItem>
        )}
      </Row>
    </HookForm>
  );
};

export const LimitTradeForm = React.memo(_LimitTradeForm);
