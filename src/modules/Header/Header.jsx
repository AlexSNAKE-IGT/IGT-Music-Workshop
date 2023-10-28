import './Header.css'
import searchIcon from "../../assets/icons/search.svg"

const Header = () => {
    return(
        <div className="header">
            <div className="headerBlur">
                <div className="headerBox">
                    <p className="logo">
                        <span className="spanTitle">IGT</span>
                        <span className="spanDep"> MUSIC WORKSHOP</span>
                    </p>
                    <div>
                        <button className="navButton">ГЛАВНАЯ</button>
                        <button className="navButton">СТУДИЯ</button>
                        <button className="navButton">О НАС</button>
                    </div>
                    <div className="searchBox">
                        <input className="searchInput" placeholder="НАЙТИ"/>
                        <img className="searchIcon" alt="searchIcon" src={searchIcon}/>
                    </div>
                    <button className="navButton">ВОЙТИ</button>
                </div>
            </div>
        </div>
    );
};

export default Header;