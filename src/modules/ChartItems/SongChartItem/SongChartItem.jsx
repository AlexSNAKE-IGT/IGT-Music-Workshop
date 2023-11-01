import React from "react";

import explisitIcon from "../../../assets/icons/explisit.svg"
import pauseIcon from "../../../assets/icons/pause.svg"
import calendarIcon from "../../../assets/icons/calendar.svg"
import favoriteIcon from "../../../assets/icons/favorite.svg"
import moreIcon from "../../../assets/icons/more.svg"
import artistIcon from "../../../assets/icons/artist.svg"

import "./SongChartItem.css"

const SongChartItem = ({ data, style}) => {
    const {
        rank,
        artist,
        song,
        explicit,
        releaseDate,
        playedCount,
        favoriteCount,
    } = data;

    return (
        <div className="songChartItem" style={style}>
            <span className="songChartItemText700" >{rank}.</span>
            <div className="songInfoBlock">
                <div className="songMetaBlock">
                    <button className="songChartItemCoverButton">
                        <img src={pauseIcon} alt="pauseIcon" />
                    </button>
                    <span className="songChartItemText700" style={{width:"fit-content"}}>{artist}</span>
                    <span className="songChartItemText400" style={{width:"fit-content"}}>&nbsp;— {song}&nbsp;</span>
                    {explicit && (
                        <img className="categoryImg" src={explisitIcon} alt="explisitIcon" />
                        )}
                </div>
                <div className="songStatsBlock">
                    <img className="songStatsIcons" src={calendarIcon} alt="calendarIcon" />
                    <span className="songChartItemText400" style={{width:"fit-content", textAlign:"center"}}>{releaseDate}</span>
                    <img className="songStatsIcons" src={artistIcon} alt="calendarIcon" />
                    <span className="songChartItemText400">{playedCount}</span>
                    <img className="songStatsIcons" src={favoriteIcon} alt="calendarIcon" />
                    <span className="songChartItemText400">{favoriteCount}</span>
                    <img className="songStatsIcons" src={moreIcon} alt="moreIcon" />
                </div>
            </div>
        </div>
        );
};

export default SongChartItem;
