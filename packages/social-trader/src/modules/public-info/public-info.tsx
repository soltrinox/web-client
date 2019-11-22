import useApiRequest from "hooks/api-request.hook";
import React, { useCallback, useState } from "react";
import { SetSubmittingType } from "utils/types";

import PublicInfoForm, { IAboutFormValues } from "./public-info-form";
import { updateProfile } from "./public-info.service";

const _PublicInfo: React.FC<Props> = ({ userName, about }) => {
  const [state, setState] = useState<IAboutFormValues>({ userName, about });
  const { sendRequest, errorMessage } = useApiRequest({
    request: updateProfile,
    successMessage: "profile-page.success-edit"
  });
  const handleSubmit = useCallback(
    (model: IAboutFormValues, setSubmitting: SetSubmittingType) =>
      sendRequest(
        {
          model
        },
        setSubmitting
      ).then(() => setState(model)),
    []
  );
  return (
    <PublicInfoForm
      userName={state.userName}
      about={state.about}
      onSubmit={handleSubmit}
      errorMessage={errorMessage}
    />
  );
};

interface Props {
  userName: string;
  about: string;
}

const PublicInfo = React.memo(_PublicInfo);
export default PublicInfo;
