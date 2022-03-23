import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Footer() {
  return (
    <FooterContainer>
      <div>
        <span>Powered by</span>
        <a
          rel='noopener noreferrer'
          target='_blank'
          href='https://www.themoviedb.org/'
        >
          <img src='./images/tmdb.svg' alt='tmdb_logo' />
        </a>
        <a
          rel='noopener noreferrer'
          target='_blank'
          href='https://www.youtube.com/'
        >
          <img src='./images/youtube.png' alt='youtube_logo' />
        </a>
      </div>
      <ul>
        <Link to='/'>
          <li>User Agreement</li>
        </Link>
        <Link to='/'>
          <li>Terms of Use</li>
        </Link>
        <Link to='/'>
          <li>Privacy Policy</li>
        </Link>
        <Link to='/'>
          <li>Privacy Rights</li>
        </Link>
        <Link to='/'>
          <li>Cookies Policy</li>
        </Link>
        <Link to='/'>
          <li>Manage Preferences</li>
        </Link>
        <Link to='/'>
          <li>Help Center</li>
        </Link>
      </ul>
      <p>&#169; 2022 bINGEdIN</p>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.div`
  margin-top: 80px;
  color: #777;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    margin-top: 50px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 120px;
      margin-top: 15px;

      @media (max-width: 768px) {
        width: 80px;
        margin-top: 10px;
      }
    }
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    list-style: none;
    margin: 20px;

    a {
      text-decoration: none;
      margin: 20px;
      color: #777;

      @media (max-width: 768px) {
        margin: 5px 10px;
        font-size: 14px;
      }

      &:hover {
        color: #ddd;
      }
    }
  }

  p {
    margin-bottom: 30px;
  }
`;
