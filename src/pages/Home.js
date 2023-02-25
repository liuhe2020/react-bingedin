import styled from 'styled-components';
import Banner from '../components/Banner';
import MovieRow from '../components/MovieRow';
import requests from '../components/Requests';

const rows = [
  { title: 'Popular', getURL: requests.getPopular },
  { title: 'Top Rated', getURL: requests.getTopRated },
  { title: 'Action', getURL: requests.getAction },
  { title: 'Adventure', getURL: requests.getAdventure },
  { title: 'Animation', getURL: requests.getAnimation },
  { title: 'Comedy', getURL: requests.getComedy },
  { title: 'Crime', getURL: requests.getCrime },
  { title: 'Documentary', getURL: requests.getDocumentary },
  { title: 'Drama', getURL: requests.getDrama },
  { title: 'Family', getURL: requests.getFamily },
  { title: 'Fantasy', getURL: requests.getFantasy },
  { title: 'History', getURL: requests.getHistory },
  { title: 'Horror', getURL: requests.getHorror },
  { title: 'Mystery', getURL: requests.getMystery },
  { title: 'Romance', getURL: requests.getRomance },
  { title: 'SciFi', getURL: requests.getSciFi },
  { title: 'Thriller', getURL: requests.getThriller },
  { title: 'War', getURL: requests.getWar },
  { title: 'Western', getURL: requests.getWestern },
];

export default function Home() {
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

const RowContainer = styled.div`
  margin-bottom: 3vw;
`;
