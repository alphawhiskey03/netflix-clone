import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

interface ModalContextInfo {
  isOpen: boolean;
  movieId?: string;
  handleOpen: (id?: string) => void;
  handleClose: () => void;
}

const initialState: ModalContextInfo = {
  isOpen: false,
  movieId: undefined,
  handleOpen: (id) => {},
  handleClose: () => {},
};

const ModalContext = createContext<ModalContextInfo>(initialState);
type ModalProviderProps = {
  children: ReactNode;
};

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [movieId, setMovieId] = useState<string | undefined>(undefined);

  const handleOpen = (id?: string) => {
    setMovieId(id);
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <ModalContext.Provider value={{ isOpen, movieId, handleOpen, handleClose }}>
      {children}
    </ModalContext.Provider>
  );
};
export const useModal = () => useContext(ModalContext);
export default ModalProvider;
