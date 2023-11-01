import React from "react";

import favoriteIcon from "../../../assets/icons/favorite.svg"
import moreIcon from "../../../assets/icons/more.svg"
import artistIcon from "../../../assets/icons/artist.svg"
import noteIcon from "../../../assets/icons/note.svg"

import "./PlaylistChartItem.css"

const PlaylistChartItem = ({ data, style}) => {
    const {
        rank,
        owner,
        songCount,
        playedCount,
        favoriteCount,
    } = data;

    return (
        <div className="playlistChartItem" style={style}>
            <span className="playlistChartItemText700" >{rank}.</span>
            <div className="playlistInfoBlock">
                <div className="playlistMetaBlock">
                    <button className="playlistChartItemCoverButton">
                    </button>
                    <span className="playlistChartItemText700" style={{width:"fit-content"}}>{owner}</span>
                </div>
                <div className="playlistStatsBlock">
                    <img className="playlistStatsIcons" src={noteIcon} alt="noteIcon" />
                    <span className="playlistChartItemText400" style={{width:"fit-content", textAlign:"center"}}>{songCount}</span>
                    <img className="playlistStatsIcons" src={artistIcon} alt="artistIcon" />
                    <span className="playlistChartItemText400">{playedCount}</span>
                    <img className="playlistStatsIcons" src={favoriteIcon} alt="favoriteIcon" />
                    <span className="playlistChartItemText400">{favoriteCount}</span>
                    <img className="playlistStatsIcons" src={moreIcon} alt="moreIcon" />
                </div>
            </div>
        </div>
        );
};

export default PlaylistChartItem;
