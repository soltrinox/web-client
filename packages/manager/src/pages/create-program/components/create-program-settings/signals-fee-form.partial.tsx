import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Hint from "shared/components/hint/hint";
import { VERTICAL_POPOVER_POS } from "shared/components/popover/popover";
import { allowValuesNumberFormat } from "shared/utils/helpers";

interface ISignalsFeeFormPartialProps {
  volumeFeeFieldName: string;
  successFeeFieldName: string;
  hasSubscriptionFeeAutofocus?: boolean;
}

const SignalsFeeFormPartial: React.FC<
  ISignalsFeeFormPartialProps & WithTranslation
> = ({
  t,
  successFeeFieldName,
  volumeFeeFieldName,
  hasSubscriptionFeeAutofocus = false
}) => {
  return (
    <div className="create-program-settings__row">
      <div className="create-program-settings__row-title">
        {t("manager.create-program-page.settings.signal-provider-fees")}
      </div>
      <div className="create-program-settings__field">
        <GVFormikField
          name={volumeFeeFieldName}
          label={t(
            "manager.create-program-page.settings.fields.signal-volume-fee"
          )}
          adornment="%"
          component={GVTextField}
          type="number"
          autoComplete="off"
          decimalScale={2}
          autoFocus={hasSubscriptionFeeAutofocus}
          isAllowed={allowValuesNumberFormat()}
        />
        <Hint
          content={t(
            "manager.create-program-page.settings.hints.signal-volume-fee"
          )}
          className="create-program-settings__field-caption"
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          tooltipContent={t(
            "manager.create-program-page.settings.hints.signal-volume-fee-description"
          )}
        />
      </div>
      <div className="create-program-settings__field">
        <GVFormikField
          name={successFeeFieldName}
          label={t(
            "manager.create-program-page.settings.fields.signal-success-fee"
          )}
          adornment="%"
          component={GVTextField}
          type="number"
          autoComplete="off"
          decimalScale={2}
          isAllowed={allowValuesNumberFormat()}
        />
        <Hint
          content={t(
            "manager.create-program-page.settings.hints.signal-success-fee"
          )}
          className="create-program-settings__field-caption"
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          tooltipContent={t(
            "manager.create-program-page.settings.hints.signal-success-fee-description"
          )}
        />
      </div>
    </div>
  );
};

export default translate()(React.memo(SignalsFeeFormPartial));
