import FavouritesPage from "post/pages/Favourites";
import useAuthRedirect from "user/hooks/useAuthRedirect";

export default function FavouritePage() {
    useAuthRedirect({ redirectWhen: "unathorized" });
    return <FavouritesPage />;
}
