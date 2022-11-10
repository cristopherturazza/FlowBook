import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

const UserProfile: React.FC = () => {
  const { userData } = useAuthContext();
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    if (userData?.id != "") {
      const fetchProfile = async () => {
        const res = await axios.get(
          `http://localhost:3000/api/users/${userData?.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${userData?.token}`,
            },
          }
        );
        setUserProfile(res.data);
      };

      fetchProfile();
    }
  }, [userData]);

  return <div>{userProfile.email}</div>;
};

export default UserProfile;
