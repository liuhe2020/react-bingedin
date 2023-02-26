import styled from 'styled-components';
import Banner from '../components/Banner';
import MovieRow from '../components/MovieRow';
import { requests } from '../api/api';

const rows = [
  { title: 'Popular', url: requests.getPopular },
  { title: 'Top Rated', url: requests.getTopRated },
  { title: 'Action', url: requests.getAction },
  { title: 'Adventure', url: requests.getAdventure },
  { title: 'Animation', url: requests.getAnimation },
  { title: 'Comedy', url: requests.getComedy },
  { title: 'Crime', url: requests.getCrime },
  { title: 'Documentary', url: requests.getDocumentary },
  { title: 'Drama', url: requests.getDrama },
  { title: 'Family', url: requests.getFamily },
  { title: 'Fantasy', url: requests.getFantasy },
  { title: 'History', url: requests.getHistory },
  { title: 'Horror', url: requests.getHorror },
  { title: 'Mystery', url: requests.getMystery },
  { title: 'Romance', url: requests.getRomance },
  { title: 'SciFi', url: requests.getSciFi },
  { title: 'Thriller', url: requests.getThriller },
  { title: 'War', url: requests.getWar },
  { title: 'Western', url: requests.getWestern },
];

export default function Home() {
  return (
    <>
      <Banner />
      <RowContainer>
        {rows.map((row) => (
          <MovieRow key={row.title} title={row.title} url={row.url} />
        ))}
      </RowContainer>
    </>
  );
}

const RowContainer = styled.div`
  margin-bottom: 3vw;
`;
