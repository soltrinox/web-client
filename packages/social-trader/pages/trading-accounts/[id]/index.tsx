import withDefaultLayout from "decorators/with-default-layout";
import { ProgramDetailsFull } from "gv-api-web";
import { ACCOUNT_CURRENCY_KEY } from "middlewares/update-account-settings-middleware/update-account-settings-middleware";
import AccountDetailsPage from "pages/accounts/account-details/account-details.page";
import { statisticCurrencyAction } from "pages/accounts/account-details/actions/account-details.actions";
import {
  dispatchAccountDescription,
  dispatchAccountId
} from "pages/accounts/account-details/services/account-details.service";
import React from "react";
import { compose } from "redux";
import { getCookie } from "shared/utils/cookie";
import { CurrencyEnum, NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<{}> = () => {
  return <AccountDetailsPage />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const {
    accountSettings: { currency }
  } = ctx.reduxStore.getState();
  const cookiesCurrency = getCookie(ACCOUNT_CURRENCY_KEY, ctx) as CurrencyEnum;
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchAccountId(id as string)),
    ctx.reduxStore.dispatch(dispatchAccountDescription(id as string)(ctx))
  ]).then(([_, descriptionResult]) => {
    const description = ((descriptionResult as unknown) as {
      value: ProgramDetailsFull;
    }).value;
    const statisticCurrency =
      description.currency || currency || cookiesCurrency;
    console.log(statisticCurrency);
    ctx.reduxStore.dispatch(dispatch =>
      dispatch(statisticCurrencyAction(statisticCurrency))
    );
  });
  return {};
};

export default compose(withDefaultLayout)(Page);
