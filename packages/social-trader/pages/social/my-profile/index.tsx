import { getHeader } from "components/header/services/header.service";
import ManagerPage from "components/manager/manager.page";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { PublicProfile } from "gv-api-web";
import { getShowEventsState } from "pages/feed/show-events-container/show-events-cookie-service";
import React from "react";
import { compose } from "redux";
import { api } from "services/api-client/swagger-custom-client";
import { NextPageWithRedux } from "utils/types";

interface Props {
  cookieShowEvents?: boolean;
  profile: PublicProfile;
}

const Page: NextPageWithRedux<Props> = ({ cookieShowEvents, profile }) => {
  return <ManagerPage cookieShowEvents={cookieShowEvents} profile={profile} />;
};

Page.getInitialProps = async ctx => {
  const cookieShowEvents = getShowEventsState(ctx);
  const { id } = await getHeader(ctx.token);
  const profile = await api.users(ctx.token).getUserProfile(id as string);
  return {
    cookieShowEvents,
    namespacesRequired: ["form-fields", "conversation", "manager-page"],
    profile
  };
};

export default compose(withDefaultLayout, withPrivateRoute)(Page);
