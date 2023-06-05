import { FC } from "react";

interface MobileMenuProps {
  visible?: boolean;
}

interface MenuItemProps {
  label: string;
}

const MenuItem: FC<MenuItemProps> = ({ label }) => {
  return (
    <div className="px-3 text-center text-white hover:underline">{label}</div>
  );
};

const MobileMenu: FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex flex-col border-2 border-gray-800">
      <div className="flex flex-col gap-4">
        <MenuItem label="Home" />
        <MenuItem label="Series" />
        <MenuItem label="Movies" />
        <MenuItem label="New & popular " />
        <MenuItem label="My List" />
        <MenuItem label="Browse by languages" />
      </div>
    </div>
  );
};

export default MobileMenu;
