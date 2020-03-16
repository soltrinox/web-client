import {
  ItemsViewModelFollowDetailsListItem,
  ItemsViewModelFundDetailsListItem,
  ItemsViewModelProgramDetailsListItem,
  PlatformEvent,
  PlatformNews
} from "gv-api-web";
import { NextPage } from "next";
import { LandingPage } from "pages/landing-page/landing.page";
import {
  getLandingAssets,
  landingAssetsDefaultData
} from "pages/landing-page/services/landing.service";
import React from "react";

const IndexPage: NextPage<Props> = props => {
  return <LandingPage {...props} />;
};

IndexPage.getInitialProps = async () => {
  try {
    const { events, follows, programs, funds, news } = await getLandingAssets();
    return {
      events,
      follows,
      programs,
      funds,
      news
    };
  } catch (e) {
    return landingAssetsDefaultData;
  }
};

interface Props {
  refLink?: string;
  events: Array<PlatformEvent>;
  follows: ItemsViewModelFollowDetailsListItem;
  programs: ItemsViewModelProgramDetailsListItem;
  funds: ItemsViewModelFundDetailsListItem;
  news: Array<PlatformNews>;
}

export default IndexPage;
