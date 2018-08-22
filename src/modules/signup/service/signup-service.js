import { SIGNUP_ROUTE_PENDING } from "pages/auth/signup/signup.routes";
import { DASHBOARD_ROUTE } from "pages/dashboard/dashboard.routes";
import { push } from "react-router-redux";
import clearDataActionFactory from "shared/actions/clear-data.factory";

import emailPendingActions, {
  EMAIL_PENDING
} from "../../../actions/email-pending-actions";
import signUpActions from "../actions/signup-actions";

const signUp = signUpData => dispatch => {
  return dispatch(signUpActions.signUpUser(signUpData)).then(() => {
    dispatch(emailPendingActions.saveEmail(signUpData));
    dispatch(push(SIGNUP_ROUTE_PENDING));
  });
};

const resendConfirmationLink = () => (dispatch, getState) => {
  let { email } = getState().emailPending;
  dispatch(signUpActions.resendConfirmationLink({ email }));
};

const confirmEmail = () => (dispatch, getState) => {
  dispatch(clearDataActionFactory(EMAIL_PENDING).clearData());
  dispatch(push(DASHBOARD_ROUTE));
};

const signUpService = { signUp, resendConfirmationLink, confirmEmail };
export default signUpService;
