import { fetchTwoFactor } from "actions/2fa-actions";
import Dialog from "components/dialog/dialog";
import Select from "components/select/select";
import { GVTextField } from "gv-react-components";
import DisableAuthContainer from "modules/2fa/disable-auth/disable-auth-container";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { authApiProxy } from "services/api-client/auth-api";
import authService from "services/auth-service";

import GoogleAuthContainer from "./google-auth/google-auth-container";
import Modal from "components/modal/modal";

const components = {
  google: GoogleAuthContainer,
  disable: DisableAuthContainer
};

class TwoFactorAuthContainer extends Component {
  state = {
    isPending: false,
    component: GoogleAuthContainer
  };

  handleChange = event => {
    this.setState({ component: components[event.target.value] });
  };

  handleClose = () => {
    this.setState({ component: null });
  };

  handleSubmit = () => {
    this.props.services.fetchTwoFactor();
  };

  render() {
    const { t, twoFactorAuth } = this.props;
    const { component: Child } = this.state;
    return (
      <div className="two-factor">
        <h3>{t("2fa.title")}</h3>
        <GVTextField
          name="2fa"
          label={t("2fa.type")}
          value={twoFactorAuth.data.twoFactorEnabled ? "google" : "disable"}
          onChange={this.handleChange}
          InputComponent={Select}
          disabled={twoFactorAuth.isPending}
        >
          <option value={"disable"}>{t("2fa.none")}</option>
          <option value={"google"}>{t("2fa.google")}</option>
        </GVTextField>
        <Modal open={Boolean(this.state.component)} onClose={this.handleClose}>
          <Child onSubmit={this.handleSubmit} />
        </Modal>
      </div>
    );
  }
}

TwoFactorAuthContainer.propTypes = {};

const mapStateToProps = state => ({
  twoFactorAuth: state.accountSettings.twoFactorAuth
});
const mapDispatchToProps = dispatch => ({
  services: bindActionCreators({ fetchTwoFactor }, dispatch)
});
export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TwoFactorAuthContainer);
