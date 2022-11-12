import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

interface UserProfile {
  _id: String;
  email: String;
  fullname: String;
  gender: String;
  birthdate: String;
  city: {
    place_id: String;
    city: String;
    county_code: String;
    lon: Number;
    lat: Number;
  };
}

const UserProfile: React.FC = () => {
  const { userData } = useAuthContext();
  const [userProfile, setUserProfile] = useState<UserProfile>();

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

  return (
    <div className="flex flex-col items-center ">
      <h3 className="text-7xl font-black mt-8 text-darkblue tracking-tighter">
        Il tuo profilo
      </h3>
    </div>
  );
};

export default UserProfile;
