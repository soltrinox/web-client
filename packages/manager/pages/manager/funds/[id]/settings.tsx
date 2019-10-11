import React from "react";
import { compose } from "redux";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";
import FundSettingsPage from "pages/funds/fund-settings/fund-settings.page";
import {
  dispatchFundDescription,
  dispatchFundId
} from "shared/components/funds/fund-details/services/fund-details.service";

const Page: NextPageWithRedux<void> = () => {
  return <FundSettingsPage />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchFundId(id as string)),
    ctx.reduxStore.dispatch(dispatchFundDescription(ctx))
  ]);
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(Page);
