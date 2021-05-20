import { useState, useEffect, useRef, useContext } from "react";
import ReactDom from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import CancelIcon from "@material-ui/icons/Cancel";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import axios from "./API";
import { API_KEY } from "./Requests";
import { GlobalContext } from "../context/GlobalState";

function Modal({ open, id, onClose }) {
  const [movie, setMovie] = useState({});
  const [video, setVideo] = useState({});
  const [genres, setGenres] = useState([]);
  const [company, setCompany] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  // states for toast notification when adding/removing watchlist item
  const [showAdded, setShowAdded] = useState(false);
  const [showRemoved, setShowRemoved] = useState(false);

  const modalRef = useRef();

  // get values from GlobalContext object
  const { addWatchList, removeWatchList, watchlist } =
    useContext(GlobalContext);

  // check if movie exists already in watchlist
  const isWatchList = watchlist.find((movie) => movie.id === id) ? true : false;

  const addMovie = () => {
    addWatchList(movie);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2500);
  };

  const removeMovie = () => {
    removeWatchList(id);
    setShowRemoved(true);
    setTimeout(() => setShowRemoved(false), 2500);
  };

  // if backdrop clicked, run onClose function to close modal
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  // function to return <span> of mapped items, if item is last of array then exclude comma
  const renderItem = (arr) =>
    arr.map((item) =>
      arr.indexOf(item) === arr.length - 1 ? `${item.name}` : `${item.name}, `
    );

  // same as function above to exclude comma in rendered <span> for last item of array
  // in addition first filter through array to find items with key value pair {job: "Director"}
  const renderDirector = () => {
    const directors = crew.filter((person) => person.job === "Director");
    const director = directors.map((dir) =>
      directors.indexOf(dir) === directors.length - 1
        ? `${dir.name}`
        : `${dir.name}, `
    );
    return director;
  };

  useEffect(() => {
    // run async function only if modal opens to prevent making unnecessary API calls
    if (open) {
      async function getMovie() {
        const { data } = await axios.get(
          `/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        setMovie(data);
        setGenres(data.genres);
        setCompany(data.production_companies);
        return data;
      }

      async function getVideo() {
        const { data } = await axios.get(
          `/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
        );
        setVideo(data.results[0]?.key);
        return data;
      }

      async function getCredits() {
        const { data } = await axios.get(
          `/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
        );
        // get first 10 members of cast
        setCast(data.cast.slice(0, 10));
        setCrew(data.crew);
        return data;
      }

      getMovie();
      getVideo();
      getCredits();
    }
  }, [open, id]);

  // use createPortal to append modal to body parent
  return ReactDom.createPortal(
    <AnimatePresence>
      {open && (
        <>
          <ModalContainer>
            <Overlay
              ref={modalRef}
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <Container
              initial={{ y: "100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "100vh" }}
              transition={{ type: "tween" }}
            >
              <Player>
                <iframe
                  width="853"
                  height="480"
                  src={`https://www.youtube.com/embed/${video}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </Player>
              <Detail>
                <h1>{movie.title}</h1>
                <Info>
                  <StarRoundedIcon style={{ color: "#FFCA63" }} />
                  <span>{movie.vote_average}</span>
                  <p>{`${movie.runtime} min`}</p>
                  <p>{movie.release_date}</p>
                  {isWatchList ? (
                    <StyledButton onClick={removeMovie}>
                      <RemoveCircleIcon />
                      Watch List
                    </StyledButton>
                  ) : (
                    <StyledButton onClick={addMovie}>
                      <AddCircleIcon />
                      Watch List
                    </StyledButton>
                  )}
                </Info>
                <Overview>{movie.overview}</Overview>
                <Credits>
                  <p>
                    Language:
                    <span>{`${movie.original_language}`.toUpperCase()}</span>
                  </p>
                  <p>
                    Genres:
                    <span>{renderItem(genres)}</span>
                  </p>
                  <p>
                    Director: <span>{renderDirector()}</span>
                  </p>
                  <p>
                    Cast: <span>{renderItem(cast)}</span>
                  </p>
                  <p>
                    Production: <span>{renderItem(company)}</span>
                  </p>
                </Credits>
                <Toast>
                  <AnimatePresence>
                    {showAdded && (
                      <motion.p
                        key="added"
                        initial={{ x: "150px" }}
                        animate={{ x: 0 }}
                        exit={{ x: "150px" }}
                        transition={{ type: "tween" }}
                      >
                        Added to Watch List
                      </motion.p>
                    )}
                    {showRemoved && (
                      <motion.p
                        key="removed"
                        initial={{ x: "150px" }}
                        animate={{ x: 0 }}
                        exit={{ x: "150px" }}
                        transition={{ type: "tween" }}
                      >
                        Removed from Watch List
                      </motion.p>
                    )}
                  </AnimatePresence>
                </Toast>
              </Detail>
              <WrapCancelIcon onClick={onClose} whileHover={{ scale: 1.2 }}>
                <CancelIcon />
              </WrapCancelIcon>
            </Container>
          </ModalContainer>
          <ScrollLock />
        </>
      )}
    </AnimatePresence>,

    document.getElementById("modal-root")
  );
}

export default Modal;

// create a global styled for the modal to lock scroll
// offset margin right for the missing scrollbar so page doesn't expand/jump
const ScrollLock = createGlobalStyle`
  body{
    overflow-y: hidden;
    margin-right: 16px;
  }

  nav{
    margin-right: 16px;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 10;
  overflow-y: scroll;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Container = styled(motion.div)`
  position: absolute;
  top: 3vw;
  left: 4vw;
  right: 4vw;
  margin: 0 auto;
  width: 55vw;
  background-color: #181818;
  color: #ddd;
  border-radius: 0.5vw;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.65), 0 6px 6px rgba(0, 0, 0, 0.7);

  @media (max-width: 900px) {
    top: 65px;
    width: 80vw;
  }
`;

const WrapCancelIcon = styled(motion.div)`
  position: absolute;
  top: -0.8rem;
  right: -0.8rem;
  cursor: pointer;
`;

const Player = styled.div`
  padding-bottom: 56.25%;
  position: relative;

  iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }
`;

const Detail = styled.div`
  position: relative;
  padding: 1.5vw 3vw;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 20px;
  }

  h1 {
    margin-bottom: 1.5vw;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1.5vw;

  span {
    margin: 0 1rem 0 0.2rem;
  }

  p {
    margin-right: 1rem;
  }
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  outline: none;
  border: none;
  font-size: 14px;
  font-weight: 600;
  border-radius: 0.2rem;
  padding: 0.5rem 0.5rem 0.5rem 0.2rem;
  color: #ddd;
  background-color: #333;
  cursor: pointer;

  .MuiSvgIcon-root {
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }

  &:hover {
    color: #111;
    background-color: #ddd;
    transition: all 0.2s;
  }

  @media (max-width: 1024px) {
    margin: 1rem 0;
  }
`;

const Toast = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;

  p {
    width: 115px;
    font-size: 14px;
    text-align: center;
    background-color: #333;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    padding: 0.5rem;
    border-radius: 0.2rem;
  }
`;

const Overview = styled.div`
  font-size: 18px;
  margin-bottom: 3vw;
`;

const Credits = styled.div`
  p {
    font-size: 15px;
    color: #aaa;
    margin-bottom: 0.5rem;
  }

  span {
    font-size: 16px;
    color: #ddd;
    margin-left: 0.3rem;
  }
`;
