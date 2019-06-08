import { ProfileHeaderViewModel } from "gv-api-web";
import { PROFILE_HEADER } from "shared/components/header/header.constants";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";

export type HeaderState = IApiState<ProfileHeaderViewModel>;

const headerReducer = apiReducerFactory<ProfileHeaderViewModel>({
  apiType: PROFILE_HEADER
});

export default headerReducer;
