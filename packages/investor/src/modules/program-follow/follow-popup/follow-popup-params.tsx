import { FormikProps, withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import * as React from "react";
import { TranslationFunction, translate } from "react-i18next";
import { compose } from "redux";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
import { number, object } from "yup";

import { IRequestParams } from "./follow-popup-form";

type mode = {
  label: string;
  value: string;
};

const modes: { [key: string]: mode } = {
  byBalance: { label: "By balance", value: "ByBalance" },
  percentage: { label: "Percentage", value: "Percentage" },
  fixed: { label: "Fixed", value: "Fixed" }
};

export interface IFollowParamsProps {
  onClick: (values: IRequestParams) => void;
  onPrevStep(): void;
  errors?: any;
  values?: FormValues;
  t?: any;
}
export interface FormValues {
  mode: string;
  openTolerancePercent: number;
  percent: number;
  fixedVolume: number;
}

type OwnProps = IFollowParamsProps & FormikProps<FormValues>;
class FollowParams extends React.Component<OwnProps> {
  constructor(props: OwnProps) {
    super(props);
  }
  handleSubmit = () => {
    const { onClick, values } = this.props;
    onClick(values);
  };
  render() {
    const {
      t,
      setFieldValue,
      errors,
      onPrevStep,
      isValid,
      dirty,
      values
    } = this.props;
    const { openTolerancePercent, mode } = values;
    const setMaxOpenTolerancePercent = () => {
      setFieldValue("openTolerancePercent", "20");
    };
    const setMaxVolumePercent = () => {
      setFieldValue("percent", "999");
    };
    const setMaxAmountFixedVolume = () => {
      setFieldValue("fixedVolume", "99999");
    };
    const isAllow = (values: any) => {
      return true;
    };
    const disableButton = () => {
      return (
        errors.amount !== undefined ||
        (dirty && !isValid) ||
        +openTolerancePercent <= 0
      );
    };
    return (
      <form className="dialog__bottom" id="follow-params">
        <div className="dialog-field">
          <GVFormikField
            name="mode"
            component={GVTextField}
            label={t("follow-program.params.type")}
            InputComponent={Select}
          >
            {Object.keys(modes).map((mode: string) => {
              return (
                <option value={modes[mode].value} key={modes[mode].value}>
                  {modes[mode].label}
                </option>
              );
            })}
          </GVFormikField>
        </div>
        <div className="dialog-field">
          <InputAmountField
            name="openTolerancePercent"
            label={t("follow-program.params.tolerance-percent")}
            currency={"%"}
            setMax={setMaxOpenTolerancePercent}
          />
        </div>
        {mode === modes.percentage.value && (
          <div className="dialog-field">
            <InputAmountField
              name="percent"
              label={t("follow-program.params.volume-percent")}
              currency={"%"}
              setMax={setMaxVolumePercent}
            />
          </div>
        )}
        {mode === modes.fixed.value && (
          <div className="dialog-field">
            <InputAmountField
              name="fixedVolume"
              label={t("follow-program.params.usd-equivalent")}
              currency={"USD"}
              setMax={setMaxAmountFixedVolume}
            />
          </div>
        )}
        <div className="dialog__buttons">
          <GVButton onClick={onPrevStep} color="secondary" variant="outlined">
            {t("follow-program.params.back")}
          </GVButton>
          <GVButton
            onClick={this.handleSubmit}
            className="invest-form__submit-button"
            disabled={disableButton()}
          >
            {t("follow-program.params.submit")}
          </GVButton>
        </div>
      </form>
    );
  }
}

export default compose<React.ComponentType<IFollowParamsProps>>(
  translate(),
  withFormik({
    displayName: "follow-params",
    mapPropsToValues: () => {
      return {
        mode: modes.byBalance.value,
        openTolerancePercent: "0.5",
        fixedVolume: "100",
        percent: "10"
      };
    },
    validationSchema: ({ t }: { t: TranslationFunction }) =>
      object().shape({
        fixedVolume: number()
          .min(0)
          .max(99999),
        percent: number()
          .max(999)
          .min(1),
        openTolerancePercent: number()
          .required()
          .max(20)
          .min(0.01)
      }),
    handleSubmit: (values, { props }) => {
      // props.onSubmit(values);
    }
  })
)(FollowParams);
