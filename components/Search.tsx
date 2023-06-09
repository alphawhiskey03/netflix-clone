import React, { FC, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
interface SearchProps {
  isOpen: boolean;
  onSrcChange: (text: string) => void;
  onToggleSrc: () => void;
  onResetSrc: () => void;
}
const Search: FC<SearchProps> = ({
  isOpen,
  onSrcChange,
  onToggleSrc,
  onResetSrc,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (isOpen) {
    return (
      <div className="flex flex-row border border-white items-center gap-2 bg-black p-2">
        <BsSearch className="text-white" />
        <input
          ref={inputRef}
          className="
        bg-black
        outline-none
        text-white
        w-[100px]
        lg:w-auto
      "
          placeholder="Title"
          onChange={(e) => onSrcChange(e.target.value)}
        />
        <div className="cursor-pointer" onClick={onResetSrc}>
          <AiOutlineClose className="text-white" size={20} />
        </div>
      </div>
    );
  }

  return (
    <button
      className="text-gray-200 hover:text-gray-300 cursor-pointer"
      onClick={onToggleSrc}
    >
      <BsSearch />
    </button>
  );
};

export default Search;
