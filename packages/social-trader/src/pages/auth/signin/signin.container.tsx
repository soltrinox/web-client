import { setTwoFactorRequirementAction } from "actions/2fa-actions";
import authActions from "actions/auth-actions";
import { Push } from "components/link/link";
import { NOT_FOUND_PAGE_ROUTE } from "components/not-found/not-found.routes";
import useApiRequest from "hooks/api-request.hook";
import useErrorMessage from "hooks/error-message.hook";
import useIsOpen from "hooks/is-open.hook";
import Router from "next/router";
import { LOGIN_ROUTE_TWO_FACTOR_ROUTE } from "pages/auth/signin/signin.constants";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "services/auth-service";
import { ReduxDispatch, ResponseError } from "utils/types";

import CaptchaContainer, { ValuesType } from "../captcha-container";
import { CODE_TYPE, login, useTwoFactorState } from "./signin.service";

const _SignInContainer: React.FC<Props> = ({
  className,
  renderForm,
  redirectFrom,
  type
}) => {
  const {
    clearTwoFactorState,
    storeTwoFactorState,
    getTwoFactorState
  } = useTwoFactorState();
  const [disable, setDisable] = useIsOpen();
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const dispatch = useDispatch<ReduxDispatch>();
  const successMiddleware = (value: string) => {
    if (!value) return;
    authService.storeToken(value);
    dispatch(authActions.updateTokenAction(true));
    Router.push(redirectFrom);
  };

  const { email, password } = getTwoFactorState();

  const { sendRequest } = useApiRequest({
    middleware: [successMiddleware],
    request: values => {
      return login({
        ...values,
        type,
        email: values.email || email,
        password: values.password || password
      }).catch((e: ResponseError) => {
        if (e.code === "RequiresTwoFactor") {
          setDisable();
          storeTwoFactorState({
            email: values.email,
            password: values.password,
            from: redirectFrom
          });
          dispatch(setTwoFactorRequirementAction(true));
          Push(LOGIN_ROUTE_TWO_FACTOR_ROUTE);
        } else setErrorMessage(e);
      });
    }
  });

  useEffect(() => {
    if (type && (email === "" || password === ""))
      Router.replace(NOT_FOUND_PAGE_ROUTE);
    clearTwoFactorState();
  }, []);
  return (
    <div className={className}>
      <CaptchaContainer
        disable={disable}
        request={sendRequest}
        renderForm={handle => renderForm(handle, email, errorMessage)}
      />
    </div>
  );
};

interface Props {
  renderForm: (
    handle: (values: ValuesType) => void,
    email: string,
    errorMessage: string
  ) => JSX.Element;
  className: string;
  type?: CODE_TYPE;
  redirectFrom: string;
}

const SignInContainer = React.memo(_SignInContainer);
export default SignInContainer;
