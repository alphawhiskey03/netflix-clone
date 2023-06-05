import { useModal } from "@/context/modal";
import React, { FC, useCallback } from "react";
import { BiChevronDown } from "react-icons/bi";
import { IoIosInformationCircleOutline } from "react-icons/io";

interface InfoButtonProps {
  extended?: boolean;
  movieId: string;
}

const InfoButton: FC<InfoButtonProps> = ({ extended, movieId }) => {
  const { handleOpen } = useModal();
  const handleModalOpen = useCallback(() => {
    handleOpen(movieId);
  }, [handleOpen, movieId]);

  if (extended) {
    return (
      <button
        className="
            bg-white
            text-white
            bg-opacity-30
            rounded-md
            py-1 md:py-2
            px-2 md:px-4
            w-auto
            text-xs
            lg:text-lg
            font-semibold
            flex
            flex-row
            items-center
            hover:bg-opacity-20
            transition"
        onClick={handleModalOpen}
      >
        <IoIosInformationCircleOutline className="mr-1" />
        More info
      </button>
    );
  }
  return (
    <button
      className="
            ml-auto
            group/item
            w-6 lg:w-10
            h-6 lg:h-10
            border-white
            border-2
            rounded-full
            flex
            justify-center
            items-center
            transition
            hover:border-neutral-300
            "
      onClick={handleModalOpen}
    >
      <BiChevronDown
        className="text-white group-hover/item:text-neutral-300"
        size={30}
      />
    </button>
  );
};

export default InfoButton;
