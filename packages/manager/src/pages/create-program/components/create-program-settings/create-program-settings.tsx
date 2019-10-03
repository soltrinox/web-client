import "shared/components/deposit-details/deposit-details.scss";

import "./create-program-settings.scss";

import CreateAssetSection from "components/create-asset/create-asset-section/create-asset-section";
import DescriptionBlock from "components/create-asset/fields/description-block";
import FeesSettings from "components/create-asset/fields/fees-settings";
import InvestmentLimitField from "components/create-asset/fields/investment-limit-field";
import StopOutField from "components/create-asset/fields/stop-out-field";
import { InjectedFormikProps, withFormik } from "formik";
import {
  Broker,
  BrokerAccountType,
  NewProgramRequestTradesDelayEnum,
  ProgramsInfo
} from "gv-api-web";
import * as React from "react";
import { useEffect } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import { IImageValue } from "shared/components/form/input-image/input-image";
import { ASSET } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { CurrencyEnum, SetSubmittingType } from "shared/utils/types";

import createProgramSettingsValidationSchema, {
  CREATE_PROGRAM_FIELDS,
  createProgramMapPropsToValues
} from "./create-program-settings.helpers";
import BrokerAccount from "./fields/broker-account";
import CreateAssetNavigation from "./fields/create-asset-navigation";
import Currency from "./fields/currency";
import DepositDetailsBlock from "./fields/deposit-details-block";
import Leverage from "./fields/leverage";
import PeriodLength from "./fields/period-length";
import SignalProgram from "./fields/signal-program";
import TradesDelay from "./fields/trades-delay";
import SignalsFeeFormPartial from "./signals-fee-form.partial";

const _CreateProgramSettings: React.FC<Props> = ({
  programsInfo,
  t,
  leverage,
  validateForm,
  isValid,
  handleSubmit,
  changeAccountType,
  changeCurrency,
  changeLeverage,
  setFieldValue,
  minimumDepositsAmount,
  broker,
  isSubmitting,
  values: {
    depositWalletId,
    currency,
    depositAmount,
    isSignalProgram,
    hasInvestmentLimit,
    description
  },
  accountType,
  programCurrency
}) => {
  const dispatch = useDispatch();
  useEffect(
    () => {
      setFieldValue(CREATE_PROGRAM_FIELDS.brokerAccountTypeId, accountType!.id);
    },
    [accountType]
  );
  useEffect(
    () => {
      setFieldValue(CREATE_PROGRAM_FIELDS.currency, programCurrency || "");
    },
    [programCurrency]
  );
  useEffect(
    () => {
      setFieldValue(CREATE_PROGRAM_FIELDS.leverage, leverage);
    },
    [leverage]
  );
  useEffect(
    () => {
      setFieldValue(CREATE_PROGRAM_FIELDS.depositAmount, "");
    },
    [depositWalletId]
  );

  const validateAndSubmit = (
    e?: React.FormEvent<HTMLFormElement> | undefined
  ): void => {
    handleSubmit(e);
    if (isValid) handleSubmit(e);
    else
      dispatch(
        alertMessageActions.error(
          t("manager.create-program-page.notifications.validate-error")
        )
      );
    if (e) e.preventDefault();
  };

  return (
    <div className="create-program-settings">
      <form onSubmit={validateAndSubmit}>
        <CreateAssetSection
          title={t("manager.create-program-page.settings.main-settings")}
          blockNumber={"01"}
        >
          <DescriptionBlock
            asset={ASSET.PROGRAM}
            titleName={CREATE_PROGRAM_FIELDS.title}
            descriptionName={CREATE_PROGRAM_FIELDS.description}
            logoName={CREATE_PROGRAM_FIELDS.logo}
            description={description}
          />
          <BrokerAccount
            name={CREATE_PROGRAM_FIELDS.brokerAccountTypeId}
            onChange={changeAccountType}
            accountTypes={broker.accountTypes}
          />
          <Currency
            name={CREATE_PROGRAM_FIELDS.currency}
            onChange={changeCurrency}
            disabled={accountType === undefined}
            accountCurrencies={accountType.currencies as CurrencyEnum[]}
          />
          <Leverage
            name={CREATE_PROGRAM_FIELDS.leverage}
            onChange={changeLeverage}
            disabled={!accountType}
            accountLeverages={accountType.leverages}
          />
          <PeriodLength
            programsInfo={programsInfo}
            name={CREATE_PROGRAM_FIELDS.periodLength}
          />
          <StopOutField name={CREATE_PROGRAM_FIELDS.stopOutLevel} />
          <TradesDelay name={CREATE_PROGRAM_FIELDS.tradesDelay} />
          <InvestmentLimitField
            checkboxName={CREATE_PROGRAM_FIELDS.hasInvestmentLimit}
            inputName={CREATE_PROGRAM_FIELDS.investmentLimit}
            hasInvestmentLimit={hasInvestmentLimit}
            currency={currency as CurrencyEnum}
          />
          <SignalProgram
            condition={broker.isSignalsAvailable}
            name={CREATE_PROGRAM_FIELDS.isSignalProgram}
          />
        </CreateAssetSection>
        <CreateAssetSection
          title={t("manager.create-program-page.settings.fees-settings")}
          blockNumber={"02"}
        >
          <FeesSettings
            title={t(
              "manager.create-program-page.settings.investment-program-fees"
            )}
            entryFeeName={CREATE_PROGRAM_FIELDS.entryFee}
            entryFeeDescription={t(
              "manager.create-program-page.settings.hints.entry-fee-description"
            )}
            secondFeeName={CREATE_PROGRAM_FIELDS.successFee}
            secondFeeLabel={t(
              "manager.create-program-page.settings.fields.success-fee"
            )}
            secondFeeUnderText={t(
              "manager.create-program-page.settings.hints.success-fee"
            )}
            secondFeeDescription={t(
              "manager.create-program-page.settings.hints.success-fee-description"
            )}
          />
          {isSignalProgram && (
            <SignalsFeeFormPartial
              volumeFeeFieldName={CREATE_PROGRAM_FIELDS.signalVolumeFee}
              successFeeFieldName={CREATE_PROGRAM_FIELDS.signalSuccessFee}
            />
          )}
        </CreateAssetSection>
        <DepositDetailsBlock
          availableName={CREATE_PROGRAM_FIELDS.available}
          rateName={CREATE_PROGRAM_FIELDS.rate}
          walletFieldName={CREATE_PROGRAM_FIELDS.depositWalletId}
          inputName={CREATE_PROGRAM_FIELDS.depositAmount}
          depositAmount={depositAmount}
          minimumDepositAmount={minimumDepositsAmount[programCurrency]}
          setFieldValue={setFieldValue}
          assetCurrency={programCurrency}
        />
        <CreateAssetNavigation
          asset={ASSET.PROGRAM}
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
};

interface OwnProps {
  programsInfo: ProgramsInfo;
  broker: Broker;
  onSubmit: (
    data: ICreateProgramSettingsFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  minimumDepositsAmount: { [key: string]: number };
  author: string;
  programCurrency: CurrencyEnum;
  changeCurrency: (currency: CurrencyEnum) => void;
  leverage: number;
  changeLeverage: (leverage: number) => void;
  accountType: BrokerAccountType;
  changeAccountType: (id: string) => void;
}

export interface ICreateProgramSettingsProps
  extends OwnProps,
    WithTranslation {}

export interface ICreateProgramSettingsFormValues {
  [CREATE_PROGRAM_FIELDS.available]: number;
  [CREATE_PROGRAM_FIELDS.rate]: number;
  [CREATE_PROGRAM_FIELDS.tradesDelay]: NewProgramRequestTradesDelayEnum;
  [CREATE_PROGRAM_FIELDS.currency]: string;
  [CREATE_PROGRAM_FIELDS.periodLength]?: number;
  [CREATE_PROGRAM_FIELDS.successFee]?: number;
  [CREATE_PROGRAM_FIELDS.stopOutLevel]: number;
  [CREATE_PROGRAM_FIELDS.leverage]?: number;
  [CREATE_PROGRAM_FIELDS.brokerAccountTypeId]: string;
  [CREATE_PROGRAM_FIELDS.signalSuccessFee]?: number;
  [CREATE_PROGRAM_FIELDS.signalVolumeFee]?: number;
  [CREATE_PROGRAM_FIELDS.isSignalProgram]: boolean;
  [CREATE_PROGRAM_FIELDS.hasInvestmentLimit]: boolean;
  [CREATE_PROGRAM_FIELDS.title]: string;
  [CREATE_PROGRAM_FIELDS.description]: string;
  [CREATE_PROGRAM_FIELDS.logo]: IImageValue;
  [CREATE_PROGRAM_FIELDS.entryFee]?: number;
  [CREATE_PROGRAM_FIELDS.depositAmount]?: number;
  [CREATE_PROGRAM_FIELDS.depositWalletId]: string;
  [CREATE_PROGRAM_FIELDS.investmentLimit]?: number;
}

type Props = InjectedFormikProps<
  ICreateProgramSettingsProps,
  ICreateProgramSettingsFormValues
>;

const CreateProgramSettings = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  translate(),
  withFormik<ICreateProgramSettingsProps, ICreateProgramSettingsFormValues>({
    displayName: "CreateProgramSettingsForm",
    mapPropsToValues: createProgramMapPropsToValues,
    validationSchema: createProgramSettingsValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_CreateProgramSettings);
export default CreateProgramSettings;
