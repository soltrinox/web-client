import "./program-details-description.scss";

import { ProgramDetailsFull } from "gv-api-web";
import React, { Component, ComponentType } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import DetailsFavorite from "shared/components/details/details-description-section/details-description/controls/details-favorite";
import DetailsNotification from "shared/components/details/details-description-section/details-description/controls/details-notification";
import GVButton from "shared/components/gv-button";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS,
  anchorElType
} from "shared/components/popover/popover";
import TagProgramItem from "shared/components/tag-program/tag-program-item";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import {
  composeManagerDetailsUrl,
  composeProgramNotificationsUrl
} from "shared/utils/compose-url";

import { IChangePasswordTradingAccountProps } from "../program-details.types";
import InvestmentLimitsPopover from "./investment-limits-popover";

interface IIProgramDetailsDescriptionMainOwnProps {
  programDescription: ProgramDetailsFull;
  ChangePasswordTradingAccount?: ComponentType<
    IChangePasswordTradingAccountProps
  >;
  isOwnProgram: boolean;
}

interface IProgramDetailsDescriptionMainProps
  extends IIProgramDetailsDescriptionMainOwnProps,
    InjectedTranslateProps {}

interface IProgramDetailsDescriptionMainState {
  anchor?: anchorElType;
}

class ProgramDetailsDescriptionMain extends React.PureComponent<
  IProgramDetailsDescriptionMainProps,
  IProgramDetailsDescriptionMainState
> {
  constructor(props: IProgramDetailsDescriptionMainProps) {
    super(props);

    this.state = {
      anchor: undefined
    };
  }

  handleOpenDropdown = (event: React.MouseEvent<HTMLElement>) =>
    this.setState({ anchor: event.currentTarget });
  handleCloseDropdown = () => this.setState({ anchor: undefined });

  render() {
    const { anchor } = this.state;
    const {
      t,
      programDescription,
      ChangePasswordTradingAccount,
      isOwnProgram
    } = this.props;
    const personalDetails = programDescription.personalProgramDetails;

    return (
      <div className="program-details-description__main">
        <div className="program-details-description__avatar">
          <AssetAvatar
            url={programDescription.logo}
            level={programDescription.level}
            alt={programDescription.title}
            size="big"
            color={programDescription.color}
            onClickLevel={this.handleOpenDropdown}
          />
          <Popover
            horizontal={HORIZONTAL_POPOVER_POS.LEFT}
            vertical={VERTICAL_POPOVER_POS.BOTTOM}
            anchorEl={anchor}
            noPadding
            onClose={this.handleCloseDropdown}
          >
            <InvestmentLimitsPopover
              currency={programDescription.currency}
              level={programDescription.level}
              canLevelUp={programDescription.rating.canLevelUp}
              closePopover={this.handleCloseDropdown}
            />
          </Popover>
        </div>
        <div className="program-details-description__info">
          <h1 className="title-small-padding">{programDescription.title}</h1>
          <Link
            to={{
              pathname: composeManagerDetailsUrl(
                programDescription.manager.url
              ),
              state: `/ ${programDescription.title}`
            }}
          >
            <GVButton
              variant="text"
              className="program-details-description__author-btn"
            >
              {programDescription.manager.username}
            </GVButton>
          </Link>
          <div className="program-details-description__tag">
            {programDescription.tags.map((tag, idx) => (
              <TagProgramItem name={tag.name} color={tag.color} key={idx} />
            ))}
          </div>
          <h4 className="program-details-description__subheading">
            {t("program-details-page.description.strategy")}
          </h4>
          <div className="program-details-description__text">
            {programDescription.description}
          </div>
        </div>
        <div className="program-details-description__settings">
          {ChangePasswordTradingAccount &&
            isOwnProgram &&
            personalDetails &&
            personalDetails.canChangePassword && (
              <ChangePasswordTradingAccount
                programDescription={programDescription}
              />
            )}
          <DetailsFavorite
            id={programDescription.id}
            isFavorite={personalDetails && personalDetails.isFavorite}
          />
          <DetailsNotification
            title={programDescription.title}
            url={composeProgramNotificationsUrl(programDescription.url)}
            hasNotifications={
              personalDetails && personalDetails.hasNotifications
            }
          />
        </div>
      </div>
    );
  }
}

export default translate()(ProgramDetailsDescriptionMain);
