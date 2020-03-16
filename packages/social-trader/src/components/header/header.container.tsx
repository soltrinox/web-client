import Header from "components/header/header";
import { fetchProfileHeaderInfo } from "components/header/header.service";
import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { headerSelector } from "reducers/header-reducer";

const _HeaderContainer: React.FC<Props & WithRouterProps> = ({ router }) => {
  const dispatch = useDispatch();
  const info = useSelector(headerSelector);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfileHeaderInfo);
    }
  }, [isAuthenticated]);

  return <Header profileHeader={info} backPath={router.pathname} />;
};

interface Props {}

const HeaderContainer = withRouter(React.memo(_HeaderContainer));
export default HeaderContainer;
