import "./MusicPage.css"
import trackIcon from "../../assets/icons/track.svg"
import artistIcon from "../../assets/icons/artist.svg"
import albumIcon from "../../assets/icons/album.svg"
import playlistIcon from "../../assets/icons/playlist.svg"
import clipsIcon from "../../assets/icons/clips.svg"

const MusicPage = () => {
    return(
        <div className="bg">
            <div className="mainPage">
                <div>
                    <div className="categoryBox">
                        <button className="categoryButton"><img className="categoryImg" src={trackIcon} alt="trackIcon"/>Треки</button>
                        <button className="categoryButton"><img className="categoryImg" src={artistIcon} alt="artistIcon"/>Исполнители</button>
                        <button className="categoryButton"><img className="categoryImg" src={albumIcon} alt="albumIcon"/>Альбомы</button>
                        <button className="categoryButton"><img className="categoryImg" src={playlistIcon} alt="playlistIcon"/>Плейлисты</button>
                        <button className="categoryButton"><img className="categoryImg" src={clipsIcon} alt="clipsIcon"/>Клипы</button>
                    </div>
                    <div className="filterBox">
                        <button className="categoryButton"><img className="categoryImg" src={trackIcon} alt="trackIcon"/>Дата</button>
                        <button className="categoryButton"><img className="categoryImg" src={artistIcon} alt="artistIcon"/>Слушателей</button>
                        <button className="categoryButton"><img className="categoryImg" src={albumIcon} alt="albumIcon"/>Лайки</button>
                    </div>
                </div>
                <div className="mainBox">

                </div>
            </div>
        </div>
    );
};

export default MusicPage;