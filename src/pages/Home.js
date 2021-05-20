import styled from "styled-components";
import Banner from "../components/Banner";
import MovieRow from "../components/MovieRow";
import requests from "../components/Requests";

function Home() {
  return (
    <>
      <Banner />
      <RowContainer>
        <MovieRow title={"Popular"} getURL={requests.getPopular} />
        <MovieRow title={"Top Rated"} getURL={requests.getTopRated} />
        <MovieRow title={"Action"} getURL={requests.getAction} />
        <MovieRow title={"Comedy"} getURL={requests.getComedy} />
        <MovieRow title={"Documentary"} getURL={requests.getDocumentary} />
        <MovieRow title={"Drama"} getURL={requests.getDrama} />
        <MovieRow title={"Horror"} getURL={requests.getHorror} />
        <MovieRow title={"Romance"} getURL={requests.getRomance} />
        <MovieRow title={"Sci-Fi"} getURL={requests.getSciFi} />
      </RowContainer>
    </>
  );
}

export default Home;

const RowContainer = styled.div`
  margin-bottom: 3vw;
`;
