import React, { useState } from "react";
import PlayList from "../assets/images/add-to-playlist.svg";
import Heart from "../assets/images/default-heart.svg";
import FillHeart from "../assets/images/liked-heart.svg";
import WatchList from "../assets/images/add-to-watchlist.svg";
import AddedWatchList from "../assets/images/added-to-watchlist.svg";
import Vibe from "../assets/images/vibe.svg";

const MovieModal = ({ movie, onClose }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  if (!movie) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="modal-overlay"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="overlay"></div>
      <button className="close-btn" onClick={onClose}>×</button>
      <div className="modal-content">
        <div className="poster-detail">
          <div className="image-button">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="modal-poster"
            />
            <button>Watch Now</button>
          </div>
          <div className="movie-detail-content">
            <div>
              <h2>
                {movie.title}
                <p>({new Date(movie.release_date).getFullYear()})</p>
              </h2>
              <p className="date-format-modal">{formatDate(movie.release_date)}</p>
            </div>
            <div className="lists-images">
              <div
                className="image-con"
                style={{
                  position: "relative"
                }}
                onClick={() => setShowPopup(!showPopup)}
              >
                <img src={PlayList} alt="PlayList" />
                {showPopup && (
                  <div className="playlist-main">
                    <div className="playlist-con">
                      <strong>+ Create New List</strong>
                      <p style={{ fontSize: "12px", marginTop: "5px" }}>
                        You haven't created any lists.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="tooltip-container image-con"
                onClick={() => setIsLiked((prev) => !prev)}
              >
                <img
                  src={isLiked ? FillHeart : Heart}
                  alt="Like"
                  className="icon"
                />
                <span className="tooltip">{isLiked ? "Unlike" : "Like"}</span>
              </div>
              <div
                className="tooltip-container image-con"
                onClick={() => setIsAddedToWatchlist((prev) => !prev)}
              >
                <img
                  src={isAddedToWatchlist ? AddedWatchList : WatchList}
                  alt="Watchlist"
                  className="icon"
                />
                <span className="tooltip">
                  {isAddedToWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                </span>
              </div>
              {/* <div className="image-con">
                <p>
                  What's your
                  <span>
                  Vibe
                  </span>
                  <img src={Vibe} alt="Vibe" />
                </p>
              </div> */}
            </div>
            <p>
              Overview <br />
              <span>{movie.overview}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;