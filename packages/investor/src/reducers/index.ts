import { connectRouter } from "connected-react-router";
import fundDepositReducer, {
  FundDepositState
} from "modules/fund-deposit/reducer/fund-deposit.reducer";
import programDepositReducer, {
  ProgramsDepositState
} from "modules/program-deposit/reducer/program-deposit.reducer";
import notificationsReducer, {
  NotificationsState
} from "pages/app/components/notifications/reducers/notifications.reducers";
import passwordRestoreReducer, {
  PasswordState
} from "pages/auth/forgot-password/reducers/password-restore-reducers";
import loginReducer, {
  LoginState
} from "pages/auth/login/reducers/login.reducers";
import signUpReducer, {
  SignUpState
} from "pages/auth/signup/reducers/signup.reducers";
import dashboardReducer, {
  DashboardState
} from "pages/dashboard/reducers/dashboard.reducers";
import managerReducer, {
  ManagerState
} from "pages/manager/reducers/manager.reducers";
import { loadingBarReducer } from "react-redux-loading-bar";
import { combineReducers } from "redux";
import programsRatingReducer from "shared/components/programs-rating/reducers/programs-rating.reducers";
import walletReducer from "shared/components/wallet/reducers/wallet.reducers";
import alertMessagesReducer from "shared/modules/alert-message/reducers/alert-message-reducers";
import fundNotificationsReducer from "shared/modules/fund-notifications/reducers/fund-notifications.reducers";
import fundsReducer from "shared/modules/funds-table/reducers/funds-table.reducers";
import notificationSettingsReducer from "shared/modules/notification-settings/reducers/notification-settings.reducers";
import programNotificationsReducer from "shared/modules/program-notifications/reducers/program-notifications.reducers";
import programsReducer from "shared/modules/programs-table/reducers/programs-table.reducers";
import accountSettingsReducer from "shared/reducers/account-settings";
import authReducer from "shared/reducers/auth-reducer";
import emailPendingReducer from "shared/reducers/email-pending-reducer";
import headerReducer from "shared/reducers/header-reducer";
import platformReducer from "shared/reducers/platform-reducer";
import RootState from "shared/reducers/root-reducer";
import uiReducer from "shared/reducers/ui-reducer";
import history from "shared/utils/history";

type State = {
  programDeposit: ProgramsDepositState;
  fundDeposit: FundDepositState;
  notifications: NotificationsState;
  manager: ManagerState;
  signUpData: SignUpState;
  loginData: LoginState;
  passwordRestoreData: PasswordState;
  dashboard: DashboardState;
};

export type InvestorRootState = State & RootState;

const rootReducer = combineReducers<InvestorRootState>({
  router: connectRouter(history),
  loadingBar: loadingBarReducer,
  platformData: platformReducer,
  programsData: programsReducer,
  programsRating: programsRatingReducer,
  fundsData: fundsReducer,
  loginData: loginReducer,
  signUpData: signUpReducer,
  authData: authReducer,
  passwordRestoreData: passwordRestoreReducer,
  alertMessages: alertMessagesReducer,
  profileHeader: headerReducer,
  dashboard: dashboardReducer,
  programDeposit: programDepositReducer,
  fundDeposit: fundDepositReducer,
  emailPending: emailPendingReducer,
  notifications: notificationsReducer,
  notificationSettings: notificationSettingsReducer,
  programNotifications: programNotificationsReducer,
  fundNotifications: fundNotificationsReducer,
  manager: managerReducer,
  wallet: walletReducer,
  accountSettings: accountSettingsReducer,
  ui: uiReducer
});

export default rootReducer;
