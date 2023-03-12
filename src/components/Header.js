import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { MagnifyingGlassIcon, TvIcon } from '@heroicons/react/24/solid';

export default function Header({ searchTerm, setSearchTerm }) {
  const [navBar, setNavBar] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // if scrolled down 70px, change state of navBar
  const navTransition = () => (window.scrollY > 70 ? setNavBar(true) : setNavBar(false));

  // listening for scroll event to fire navBar state change
  useEffect(() => {
    window.addEventListener('scroll', navTransition);
    return () => window.removeEventListener('scroll', navTransition);
  }, []);

  // redirect to home page if term is empty/no input in search box
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (pathname !== '/search') navigate('/search');
  };

  const handleClick = (e) => {
    e.preventDefault();
    setSearchTerm(inputRef.current.value);
    if (pathname !== '/search') navigate('/search');
  };

  return (
    <NavContainer isScrolled={navBar}>
      <Nav>
        <Link to='/'>
          <Logo src='/images/bingedin_logo.png' alt='bingedin_logo' />
        </Link>
        <Menu>
          <Link to='/watchlist'>
            <StyledTvIcon />
          </Link>
          <StyledForm onSubmit={(e) => e.preventDefault()}>
            <input ref={inputRef} onChange={handleSearch} type='text' placeholder='Search' value={searchTerm} />
            <WrapButton>
              <StyledMagnifyingGlassIcon onClick={handleClick} />
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
  padding: 0 4vw;
  background-image: linear-gradient(rgba(17, 17, 17, 0.6), rgba(0, 0, 0, 0));

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

const Logo = styled.img`
  width: 100px;
  margin-top: 0.3rem;
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
    border: 1.5px solid #ddd;
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

const StyledTvIcon = styled(TvIcon)`
  width: 1.5rem;
  color: #ddd;
  margin-top: 0.25rem;
  margin-right: 0.75rem;
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledMagnifyingGlassIcon = styled(MagnifyingGlassIcon)`
  width: 1.2rem;
  color: #ddd;
  margin-top: 0.15rem;
  margin-right: 0.25rem;
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.1);
  }
`;
