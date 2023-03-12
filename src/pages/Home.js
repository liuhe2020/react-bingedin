import styled from 'styled-components';
import Banner from '../components/Banner';
import MovieRow from '../components/MovieRow';
import { requests } from '../api/api';

export default function Home() {
  return (
    <>
      <Banner />
      <RowContainer>
        {requests.map((row) => (
          <MovieRow key={row.title} title={row.title} url={row.url} />
        ))}
      </RowContainer>
    </>
  );
}

const RowContainer = styled.div`
  margin-bottom: 3vw;
`;
