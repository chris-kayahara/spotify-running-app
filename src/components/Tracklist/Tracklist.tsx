import { useState } from "react";
import ReactPaginate from "react-paginate";
import "./Tracklist.scss";
import durationIcon from "../../assets/duration.svg";
import energyIcon from "../../assets/energy.svg";
import tempoIcon from "../../assets/tempo.svg";

export default function Tracklist({ userSavedTracks }) {
  const [trackOffset, setTrackOffset] = useState(0);
  const [tracksPerPage, setTracksPerPage] = useState(10);

  const endOffset = trackOffset + tracksPerPage;
  const currentPage = userSavedTracks.slice(trackOffset, endOffset);
  const pageCount = Math.ceil(userSavedTracks.length / tracksPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * tracksPerPage) % userSavedTracks.length;
    setTrackOffset(newOffset);
  };

  const msToTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds == 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <div className="tracklist">
      <div className="tracklist__heading-container">
        <h4 className="tracklist__heading-title">Title</h4>
        <h4 className="tracklist__heading-album">Album</h4>
        <img
          className="tracklist__heading-length-icon"
          src={durationIcon}
          alt="Duration"
        />
        <img
          className="tracklist__heading-energy-icon"
          src={energyIcon}
          alt="Duration"
        />
        <img
          className="tracklist__heading-bpm-icon"
          src={tempoIcon}
          alt="Duration"
        />
        {/* <h4 className="tracklist__heading-length">Length</h4>
        <h4 className="tracklist__heading-energy">Energy</h4>
        <h4 className="tracklist__heading-bpm">BPM</h4> */}
      </div>
      <div className="tracklist__list">
        {currentPage.map((track) => {
          let artists = track.track.artists.map((artist) => artist.name);
          return (
            <div className="tracklist__row" key={track.track.id}>
              <div className="tracklist__title-artist-container">
                <div className="tracklist__data-title">{track.track.name}</div>
                <div className="tracklist__data-artist">
                  {artists.join(", ")}
                </div>
              </div>
              <div className="tracklist__data-album">
                {track.track.album.name}
              </div>
              <div className="tracklist__data-length">
                {msToTime(track.track.duration_ms)}
              </div>
              <div className="tracklist__data-energy">
                {!track.energy ? "N/A" : track.energy.toFixed(3)}
              </div>
              <div className="tracklist__data-bpm">
                {!track.tempo ? "N/A" : Math.round(track.tempo)}
              </div>
            </div>
          );
        })}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="tracklist__pagination"
        pageClassName="tracklist__pagination-item"
        pageLinkClassName="tracklist__pagination-link"
        activeLinkClassName="tracklist__pagination-link--active"
        previousClassName="tracklist__pagination-prev-next"
        nextClassName="tracklist__pagination-prev-next"
        previousLinkClassName="tracklist__pagination-prev-next-link"
        nextLinkClassName="tracklist__pagination-prev-next-link"
        disabledClassName="tracklist__pagination-prev-next--disabled"
        disabledLinkClassName="tracklist__pagination-prev-next-link--disabled"
        breakLinkClassName="tracklist__pagination-break-link"
      />
    </div>
  );
}
