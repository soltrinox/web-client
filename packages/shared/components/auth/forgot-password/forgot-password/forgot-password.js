import { withFormik } from "formik";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import { object, string } from "yup";

const ForgotPasswordForm = ({
  t,
  values,
  isSubmitting,
  handleSubmit,
  error,
  LOGIN_ROUTE
}) => {
  return (
    <form id="forgotPasswordForm" onSubmit={handleSubmit} noValidate>
      <GVFormikField
        type="email"
        name="email"
        label={t("auth.password-restore.forgot-password.email-field-text")}
        addon="fas fa-envelope"
        autoComplete="email"
        autoFocus
        component={GVTextField}
      />
      <FormError error={error} />
      <div className="forgot-password__navigation">
        <Link to={LOGIN_ROUTE} className="forgot-password__btn-back">
          <GVButton variant="text" color="secondary">
            &larr; {t("auth.password-restore.forgot-password.back-button-text")}
          </GVButton>
        </Link>
        <GVButton
          id="forgotPassword"
          color="primary"
          variant="contained"
          disabled={isSubmitting}
          type="submit"
        >
          {t("auth.password-restore.forgot-password.confirm-button-text")}
        </GVButton>
      </div>
    </form>
  );
};

const withTranslationAndFormik = compose(
  translate(),
  withFormik({
    displayName: "forgotPassword",
    mapPropsToValues: () => ({
      email: ""
    }),
    validationSchema: ({ t }) =>
      object().shape({
        email: string()
          .email(t("auth.password-restore.validators.email-invalid"))
          .required(t("auth.password-restore.validators.email-required"))
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(ForgotPasswordForm);

export default withTranslationAndFormik;
