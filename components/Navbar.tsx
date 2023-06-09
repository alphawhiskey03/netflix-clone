import { useCallback, useState, useEffect, FC } from "react";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import { BsChevronDown, BsBell } from "react-icons/bs";
import AccountMenu from "@/components/AccountMenu";
import Search from "./Search";

const TOP_OFFSET = 60;

interface NavBarProps {
  srcOpen: boolean;
  handleToggleSrc: () => void;
  handleSrcChange: (text: string) => void;
  handleSrcReset: () => void;
}

const Navbar: FC<NavBarProps> = ({
  srcOpen,
  handleToggleSrc,
  handleSrcChange,
  handleSrcReset,
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showAccountMenu, setshowAccountMenu] = useState<boolean>(false);
  const [showBackground, setShowBackground] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const togglMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setshowAccountMenu((current) => !current);
  }, []);
  return (
    <nav className="w-full fixed z-40">
      <div
        className={`
      px-4
      md:px-16
      py-6
      flex
      flex-row
      items-center
      transition
      duration-500
      ${
        showBackground
          ? `   bg-zinc-900
      bg-opacity-90`
          : ""
      }
   
      `}
      >
        <img
          id="main-logo"
          className="h-4 lg:h-7 cursor-pointer"
          src="images/logo.png"
          alt="logo"
          onClick={handleSrcReset}
        />

        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Movies" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="Browse by languages" />
        </div>
        <div
          onClick={togglMobileMenu}
          className={`lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative ${
            srcOpen ? "hidden" : ""
          }`}
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            } transition`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-4 lg:gap-7 items-center justify-center">
          <Search
            isOpen={srcOpen}
            onSrcChange={handleSrcChange}
            onToggleSrc={handleToggleSrc}
            onResetSrc={handleSrcReset}
          />
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="profile" />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
