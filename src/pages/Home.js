import styled from "styled-components";
import Banner from "../components/Banner";
import MovieRow from "../components/MovieRow";
import requests from "../components/Requests";

function Home() {
  const rows = [
    { title: "Popular", getURL: requests.getPopular },
    { title: "Top Rated", getURL: requests.getTopRated },
    { title: "Action", getURL: requests.getAction },
    { title: "Comedy", getURL: requests.getComedy },
    { title: "Documentary", getURL: requests.getDocumentary },
    { title: "Drama", getURL: requests.getDrama },
    { title: "Horror", getURL: requests.getHorror },
    { title: "Romance", getURL: requests.getRomance },
    { title: "SciFi", getURL: requests.getSciFi },
  ];

  return (
    <>
      <Banner />
      <RowContainer>
        {rows.map((row) => (
          <MovieRow key={row.title} title={row.title} getURL={row.getURL} />
        ))}
      </RowContainer>
    </>
  );
}

export default Home;

const RowContainer = styled.div`
  margin-bottom: 3vw;
`;
