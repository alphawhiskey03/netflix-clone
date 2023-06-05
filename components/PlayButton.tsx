import React, { FC } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from "next/router";

interface PlayButtonProps {
  movieId: string;
  extended?: boolean;
}

const PlayButton: FC<PlayButtonProps> = ({ movieId, extended }) => {
  const router = useRouter();
  const handlePlay = () => {
    router.push(`/watch/${movieId}`);
  };
  if (extended) {
    return (
      <button
        className="
      bg-white
      rounded-md
      py-1 md:py-2
      px-2 md:px-4
      w-auto
      text-xs lg:text-lg
      flex flex-row
      flex-semibold
      items-center
      transition
      hover:bg-neutral-300
      "
        onClick={handlePlay}
      >
        <BsFillPlayFill className="mr-1" size={25} />
        Play
      </button>
    );
  }
  return (
    <button
      className="
    w-6 
    h-6 
    lg:w-10 
    lg:h-10
    bg-white 
    rounded-full
    flex
    justify-center
    items-center
    transition
    hover:bg-neutral-300
   "
      onClick={handlePlay}
    >
      <BsFillPlayFill size={30} />
    </button>
  );
};

export default PlayButton;
