import { Button } from "components/button/button";
import { RingIcon } from "components/icon/ring-icon";
import { ToType } from "components/link/link";
import * as React from "react";
import { useTranslation } from "react-i18next";

import DetailsDescriptionControl from "./details-description-control";
import styles from "./details-description-control.module.scss";

interface Props {
  hasNotifications: boolean;
  to: ToType;
}

const _DetailsNotification: React.FC<Props> = ({ to, hasNotifications }) => {
  const [t] = useTranslation();
  return (
    <Button color={"secondary"} noPadding variant={"text"}>
      <DetailsDescriptionControl
        to={to}
        text={t("asset-details:description.notifications")}
      >
        <RingIcon
          selected={hasNotifications}
          className={styles["details-description-control__icon"]}
        />
      </DetailsDescriptionControl>
    </Button>
  );
};

const DetailsNotification = React.memo(_DetailsNotification);
export default DetailsNotification;
