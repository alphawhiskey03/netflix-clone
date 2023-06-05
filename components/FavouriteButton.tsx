import { FC, useCallback, useMemo } from "react";
import axios from "axios";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import useFavourites from "@/hooks/useFavourites";
import useCurrentUser from "@/hooks/useCurrentUser";

interface FavouriteButtonProps {
  movieId: String;
}

const FavouriteButton: FC<FavouriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavourites } = useFavourites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavourite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavourite = useCallback(async () => {
    let response;
    if (!isFavourite) {
      response = await axios.post("api/favourite", {
        movieId,
      });
    } else {
      response = await axios.put("api/favourite", { movieId });
    }

    const updatedFavourite = response?.data?.favouriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavourite,
    });
    mutateFavourites();
  }, [movieId, isFavourite, currentUser, mutate, mutateFavourites]);

  const Icon = isFavourite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      className="
  cursor-pointer
  group/item
  w-6
  h-6
  lg:w-10
  lg:h-10
  border-white
  border-2
  rounded-full
  flex
  justify-center
  items-center
  transition
  hover:border-neutral-300
  "
      onClick={toggleFavourite}
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavouriteButton;
