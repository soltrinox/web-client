import { fetchProfile } from "components/profile/services/profile.service";
import { ProfileFullViewModel } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";

import Profile from "./profile";

const _ProfileContainer: React.FC = () => {
  const { sendRequest, data, isPending } = useApiRequest<ProfileFullViewModel>({
    fetchOnMount: true,
    request: fetchProfile
  });
  const onUpdate = useCallback(async () => await sendRequest(), []);
  return (
    <Profile
      condition={!!data}
      info={data!}
      onUpdate={onUpdate}
      isPending={isPending}
    />
  );
};

const ProfileContainer = React.memo(_ProfileContainer);
export default ProfileContainer;
