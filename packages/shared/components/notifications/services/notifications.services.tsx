import { CancelablePromise, NotificationList } from "gv-api-web";
import { fetchProfileHeaderInfoAction } from "shared/components/header/actions/header-actions";
import {
  addNotificationsAction,
  addTotalNotificationsAction,
  calculateOptions,
  clearNotificationsAction,
  setNotificationsOptionsAction
} from "shared/components/notifications/actions/notifications.actions";
import notificationsApi from "shared/services/api-client/notifications-api";
import authService from "shared/services/auth-service";
import { RootThunk } from "shared/utils/types";

export const serviceGetNotifications = (): RootThunk<
  CancelablePromise<NotificationList>
> => (dispatch, getState): CancelablePromise<NotificationList> => {
  const { notifications } = getState();
  return notificationsApi
    .v10NotificationsGet(authService.getAuthArg(), notifications.options)
    .then(response => {
      const options = calculateOptions(notifications.options, response.total);
      dispatch(addTotalNotificationsAction(response.total));
      dispatch(addNotificationsAction(response.notifications));
      dispatch(setNotificationsOptionsAction(options));
      return response;
    });
};

export const serviceClearNotifications = (): RootThunk<void> => dispatch => {
  dispatch(clearNotificationsAction());
  dispatch(addTotalNotificationsAction(0));
  dispatch(setNotificationsOptionsAction(calculateOptions()));
  dispatch(fetchProfileHeaderInfoAction());
};
