import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';

export default function Header({
  term,
  setTerm,
  submitTerm,
  setSubmitTerm,
  setPage,
}) {
  const [navBar, setNavBar] = useState(false);

  let history = useHistory();
  const { pathname } = useLocation();

  // setTerm is passed in on the onChange of input to watch the state of input field
  // submitTerm is then set equal to term to fire the fetch function in useEffect
  // useRef or name.value or setting state of term in a function does not work
  const handleOnSubmit = (e) => {
    e.preventDefault();
    // prevent consecutive search of the same search term
    if (term === submitTerm) {
      return;
    } else {
      setSubmitTerm(term);
      setPage(1);
      // redirect to search page
      history.push('/search');
    }
  };

  // if scrolled down 70px, change state of navBar
  const navTransition = () =>
    window.scrollY > 70 ? setNavBar(true) : setNavBar(false);

  // listening for scroll event to fire navBar state change
  useEffect(() => {
    window.addEventListener('scroll', navTransition);
    return () => window.removeEventListener('scroll', navTransition);
  }, []);

  // redirect to home page if term is empty/no input in search box
  useEffect(() => {
    if (!term && pathname === '/search') {
      history.push('/');
    }
  }, [history, term, pathname]);

  return (
    <NavContainer isScrolled={navBar}>
      <Nav>
        <Link to='/'>
          <Logo src='/images/bingedin_logo.png' alt='bingedin_logo' />
        </Link>
        <Menu>
          <Link to='/watchlist'>
            <WrapQueuePlayNextIcon whileHover={{ scale: 1.2 }}>
              <QueuePlayNextIcon />
            </WrapQueuePlayNextIcon>
          </Link>
          <StyledForm onSubmit={handleOnSubmit}>
            <input
              onChange={(e) => setTerm(e.target.value)}
              type='text'
              placeholder='Enter movie name'
            />
            <WrapButton type='submit' whileHover={{ scale: 1.2 }}>
              <SearchIcon />
            </WrapButton>
          </StyledForm>
        </Menu>
      </Nav>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  // the state of navBar is passed in as props to set background color and blend mode
  background-color: ${(props) => (props.isScrolled ? '#111' : '')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 5;
  transition: all 0.4s ease-out;

  @media (max-width: 600px) {
    position: static;
  }

  @media (max-width: 400px) {
    padding: 1.5rem 1rem;
  }
`;

const Nav = styled.nav`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2vw;
  background-image: linear-gradient(rgba(17, 17, 17, 0.6), rgba(0, 0, 0, 0));

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

const Logo = styled.img`
  width: 100px;
`;

const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 400px) {
    justify-content: center;
  }
`;

const StyledForm = styled.form`
  position: relative;
  width: 200px;

  @media (max-width: 400px) {
    width: 100%;
  }

  input {
    width: 100%;
    padding: 0.4rem 2rem 0.4rem 0.6rem;
    border: 2px solid #ddd;
    background-color: #111;
    font-size: 1rem;
    color: #ddd;

    &:focus {
      outline: none;
    }
  }
`;

const WrapButton = styled(motion.button)`
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ddd;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const WrapQueuePlayNextIcon = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-right: 20px;

  cursor: pointer;
`;
