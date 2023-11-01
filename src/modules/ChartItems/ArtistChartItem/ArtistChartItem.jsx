import React from "react";

import favoriteIcon from "../../../assets/icons/favorite.svg"
import moreIcon from "../../../assets/icons/more.svg"
import artistIcon from "../../../assets/icons/artist.svg"
import noteIcon from "../../../assets/icons/note.svg"

import "./ArtistChartItem.css"

const ArtistChartItem = ({ data, style}) => {
    const {
        rank,
        artist,
        songsCount,
        playedCount,
        favoriteCount,
    } = data;

    return (
        <div className="artistChartItem" style={style}>
            <span className="artistChartItemText700" >{rank}.</span>
            <div className="artistInfoBlock">
                <div className="artistMetaBlock">
                    <button className="artistChartItemCoverButton">
                    </button>
                    <span className="artistChartItemText700" style={{width:"fit-content"}}>{artist}</span>
                </div>
                <div className="artistStatsBlock">
                    <img className="artistStatsIcons" src={noteIcon} alt="noteIcon" />
                    <span className="artistChartItemText400" style={{width:"fit-content", textAlign:"center"}}>{songsCount}</span>
                    <img className="artistStatsIcons" src={artistIcon} alt="artistIcon" />
                    <span className="artistChartItemText400">{playedCount}</span>
                    <img className="artistStatsIcons" src={favoriteIcon} alt="favoriteIcon" />
                    <span className="artistChartItemText400">{favoriteCount}</span>
                    <img className="artistStatsIcons" src={moreIcon} alt="moreIcon" />
                </div>
            </div>
        </div>
        );
};

export default ArtistChartItem;
