import React from "react";

import favoriteIcon from "../../../assets/icons/favorite.svg"
import moreIcon from "../../../assets/icons/more.svg"
import artistIcon from "../../../assets/icons/artist.svg"
import noteIcon from "../../../assets/icons/note.svg"

import "./AlbumChartItem.css"

const AlbumChartItem = ({ data, style}) => {
    const {
        rank,
        artist,
        name,
        songCount,
        playedCount,
        favoriteCount,
    } = data;

    return (
        <div className="albumChartItem" style={style}>
            <span className="albumChartItemText700" >{rank}.</span>
            <div className="albumInfoBlock">
                <div className="albumMetaBlock">
                    <button className="albumChartItemCoverButton">
                    </button>
                    <span className="albumChartItemText700" style={{width:"fit-content"}}>{artist}</span>
                    <span className="songChartItemText400" style={{width:"fit-content"}}>&nbsp;— {name}&nbsp;</span>
                </div>
                <div className="albumStatsBlock">
                    <img className="albumStatsIcons" src={noteIcon} alt="noteIcon" />
                    <span className="albumChartItemText400" style={{width:"fit-content", textAlign:"center"}}>{songCount}</span>
                    <img className="albumStatsIcons" src={artistIcon} alt="artistIcon" />
                    <span className="albumChartItemText400">{playedCount}</span>
                    <img className="albumStatsIcons" src={favoriteIcon} alt="favoriteIcon" />
                    <span className="albumChartItemText400">{favoriteCount}</span>
                    <img className="albumStatsIcons" src={moreIcon} alt="moreIcon" />
                </div>
            </div>
        </div>
        );
};

export default AlbumChartItem;
