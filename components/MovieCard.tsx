import React from "react";
import FavouriteButton from "./FavouriteButton";
import { useRouter } from "next/router";
import PlayButton from "./PlayButton";
import InfoButton from "./InfoButton";

interface MovieCardProps {
  data: Record<string, any>;
}
const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const handlePlay = () => {
    router.push(`/watch/${data?.id}`);
  };
  return (
    <div className="group bg-zinc-900 relative h-[12vw]">
      <img
        className="
        cursor-pointer
        object-cover
        transition
        duration
        shadow-xl
        rounded-md
        group-hover:opacity-90
        sm:group-hover:opacity-0
        delay-300
        w-full
        h-[12vw]
        "
        src={data.thumbnailUrl}
        alt="Thumbnail"
      />
      <div
        className="
            opacity-0
            absolute
            top-0
            transition
            duration-200
            z-10
            invisible
            sm:visible
            delay-300
            w-full
            scale-0
            group-hover:scale-110
            group-hover:-translate-y-[6vw]
            group-hover:transale-x-[2vw]
            group-hover:opacity-100"
      >
        <img
          className="
          cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-t-md
          w-full
          h-[12vw]"
          src={data?.thumbnailUrl}
          alt=""
        />
        <div
          className="
        z-index-100
        bg-zinc-800
        p-2
        lg:p-4
        absolute
        w-full
        transition
        shadow-md
        rounded-b-md
        "
        >
          <div className="flex flex-row items-center gap-4">
            <PlayButton movieId={data?.id} />
            <FavouriteButton movieId={data?.id} />
            <InfoButton movieId={data?.id} />
          </div>

          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>
          <div className="flex flex-col gap-4 mt-4">
            <p className="text-white">{data?.duration}</p>
            <p className="text-white">{data?.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
