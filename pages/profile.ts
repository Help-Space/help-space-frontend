import {useUser} from "../user/store/useUser";
import {useRouter} from "next/router";
import {useEffect} from "react";

const Profile = () => {
    const user = useUser();
    const router = useRouter();

    useEffect(() => {
        router.push("/profile/" + user.id);
    }, [user]);
}

export default Profile;