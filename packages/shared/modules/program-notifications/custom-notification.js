import "./custom-notification.scss";

import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import GVButton from "shared/components/gv-button";
import GVSwitch from "shared/components/gv-selection/gv-switch";
import GVTextField from "shared/components/gv-text-field";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import {
  removeProgramNotificationService,
  toggleProgramNotificationsService
} from "./services/program-notifications.services";

class CustomNotification extends Component {
  state = {
    isPending: false
  };

  success = text => {
    const { dispatch } = this.props;
    dispatch(alertMessageActions.success(text));
  };

  handleSwitch = () => {
    this.setState({ isPending: true });
    const { services, settings, t } = this.props;
    const status = !Boolean(settings.isEnabled);
    services
      .toggleProgramNotificationsService({
        id: settings.id,
        assetId: settings.assetId,
        enabled: status
      })
      .then(() => {
        this.success(
          t(
            `notifications-page.custom.${status ? "enabled" : "disabled"}-alert`
          )
        );
        this.setState({ isPending: false });
      })
      .catch(() => this.setState({ isPending: false }));
  };

  handleDelete = () => {
    this.setState({ isPending: true });
    const { t, settings } = this.props;
    this.props.services
      .removeProgramNotificationService(settings)
      .then(() => {
        this.success(t(`notifications-page.custom.delete-alert`));
        this.setState({ isPending: false });
      })
      .catch(() => this.setState({ isPending: false }));
  };

  render() {
    const { t, settings } = this.props;
    return (
      <div className="custom-notification">
        <label className="notification-setting">
          <GVSwitch
            className="notification-setting__switch"
            name={settings.type}
            value={settings.isEnabled}
            disabled={this.state.isPending}
            color="primary"
            onChange={this.handleSwitch}
          />
          <span className="notification-setting__label">
            {t(`notifications-page.create.${settings.conditionType}.title`)}
          </span>
        </label>
        <div className="custom-notification__offset">
          <GVTextField
            name="conditionAmount"
            value={settings.conditionAmount.toString()}
            disabled
            label={t(
              `notifications-page.create.${settings.conditionType}.label`
            )}
            adornment={settings.conditionType === "Profit" ? "%" : undefined}
            autoComplete="off"
            InputComponent={NumberFormat}
          />
          <GVButton
            variant="text"
            color="secondary"
            disabled={this.state.isPending}
            onClick={this.handleDelete}
          >
            {t("buttons.delete")}
          </GVButton>
        </div>
      </div>
    );
  }
}

CustomNotification.propTypes = {
  services: PropTypes.shape({
    removeProgramNotificationService: PropTypes.func,
    toggleProgramNotificationsService: PropTypes.func
  })
};

const mapStateToProps = dispatch => ({
  services: bindActionCreators(
    { removeProgramNotificationService, toggleProgramNotificationsService },
    dispatch
  ),
  dispatch
});

export default compose(
  translate(),
  connect(
    undefined,
    mapStateToProps
  )
)(CustomNotification);
