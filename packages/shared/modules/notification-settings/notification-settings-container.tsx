import "./notification-settings.scss";

import { NotificationSettingList } from "gv-api-web";
import * as React from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import { AuthRootState } from "shared/utils/types";

import NotificationSettings from "./notification-settings";
import { fetchNotificationSettings } from "./services/notification-settings.services";

class _NotificationSettingsContainer extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.service.fetchNotificationSettings();
  }

  render() {
    const { settings } = this.props;
    return <NotificationSettings condition={!!settings} settings={settings!} />;
  }
}

const mapStateToProps = (state: AuthRootState): StateProps => {
  const { data, isPending } = state.notificationSettings;
  return { settings: data, isPending };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { fetchNotificationSettings },
    dispatch
  )
});

interface Props extends StateProps, DispatchProps, OwnProps {}

interface StateProps {
  isPending: boolean;
  settings?: NotificationSettingList;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  fetchNotificationSettings: typeof fetchNotificationSettings;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {}

const NotificationSettingsContainer = compose<React.ComponentType<OwnProps>>(
  connect<StateProps, DispatchProps, OwnProps, AuthRootState>(
    mapStateToProps,
    mapDispatchToProps
  )
)(_NotificationSettingsContainer);
export default NotificationSettingsContainer;
