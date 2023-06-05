import { useState } from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavourites from "@/hooks/useFavourites";
import ModalProvider from "@/context/modal";
import InfoModal from "@/components/InfoModal";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const [srcOpen, setSrcOpen] = useState<boolean>(false);
  const [src, setSrc] = useState<string>("");
  const { data: movies = [] } = useMovieList(src);
  const { data: favourites = [] } = useFavourites();
  const handleSrcOpen = () => {
    setSrcOpen(true);
  };
  const handleSrcChange = (text: string): void => {
    setSrc(text);
  };
  const resetSrc = () => {
    setSrc("");
    setSrcOpen(false);
  };

  return (
    <ModalProvider>
      <InfoModal />
      <Navbar
        srcOpen={srcOpen}
        handleSrcChange={handleSrcChange}
        handleToggleSrc={handleSrcOpen}
        handleSrcReset={resetSrc}
      />
      {srcOpen ? (
        <div className="pt-[100px]">
          <MovieList title="Result" data={movies} />
        </div>
      ) : (
        <>
          <Billboard />
          <div className="pb-40">
            <MovieList title="Trending Now" data={movies} />
            <MovieList title="My List" data={favourites} />
          </div>
        </>
      )}
    </ModalProvider>
  );
}
