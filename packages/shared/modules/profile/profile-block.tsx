import "./profile.scss";

import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import VerificationStatus, {
  IStatusProps
} from "shared/components/verification-status/verification-status";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import withRole, { WithRoleProps } from "shared/decorators/with-role";

const _ProfileBlock: React.FC<Props> = ({
  number,
  title,
  content,
  verificationStatus,
  checked
}) => (
  <>
    <tr className="profile__title">
      <td className="profile__left">
        <h4 className="profile__subtitle">{number}</h4>
      </td>
      <td className="profile__center" />
      <td className="profile__right">
        <h4 className="profile__subtitle">{title}</h4>
        {checked ||
          (!!verificationStatus && (
            <VerificationStatus
              checked={checked}
              verificationStatus={verificationStatus}
            />
          ))}
      </td>
    </tr>
    <tr className="profile__content">
      <td className="profile__left">
        <span className="profile__stick" />
      </td>
      <td className="profile__center" />
      <td className="profile__right">{content}</td>
    </tr>
  </>
);

interface Props extends WithTranslation, IProfileOwnProps, WithRoleProps {}

export interface IProfileOwnProps extends IStatusProps {
  number: string;
  title: string;
  content?: JSX.Element;
}

const ProfileBlock = compose<
  React.ComponentType<IProfileOwnProps & WithLoaderProps>
>(
  withLoader,
  withRole,
  translate(),
  React.memo
)(_ProfileBlock);
export default ProfileBlock;
