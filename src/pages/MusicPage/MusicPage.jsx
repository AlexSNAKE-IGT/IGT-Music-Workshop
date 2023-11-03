import React, { useState, useCallback } from "react";
import "./MusicPage.css";
import trackIcon from "../../assets/icons/track.svg";
import artistIcon from "../../assets/icons/artist.svg";
import albumIcon from "../../assets/icons/album.svg";
import playlistIcon from "../../assets/icons/playlist.svg";
import clipsIcon from "../../assets/icons/clips.svg";
import favoriteIcon from "../../assets/icons/favorite.svg"
import SongChartItem from "../../modules/ChartItems/SongChartItem/SongChartItem.jsx";
import ArtistChartItem from "../../modules/ChartItems/ArtistChartItem/ArtistChartItem.jsx";
import AlbumChartItem from "../../modules/ChartItems/AlbumChartItem/AlbumChartItem.jsx";
import PlaylistChartItem from "../../modules/ChartItems/PlaylistChartItem/PlaylistChartItem";
import ClipChartItem from "../../modules/ChartItems/ClipChartItem/ClipChartItem";
import CategoryButton from "../../modules/buttons/CategoryButton/CategoryButton.jsx";
import FilterButton from "../../modules/buttons/FilterButton/FilterButton.jsx";
import ProfileButton from "../../modules/buttons/ProfileButton/ProfileButton.jsx";
import SettingsItem from "../../modules/mainpageitems/SettingsItem/SettingsItem.jsx";
import ProfileItem from "../../modules/mainpageitems/ProfileItem/ProfileItem.jsx";
import UploadItem from "../../modules/mainpageitems/UploadItem/UploadItem.jsx";


const MusicPage = ({menuSwitch, activeProfileButton, onActiveProfileButton}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [dateFilter, setDateFilter] = useState("default");
  const [listenersFilter, setListenersFilter] = useState("default");
  const [likesFilter, setLikesFilter] = useState("default");

  const defaultDateFilter = "default";
  const defaultListenersFilter = "default";
  const defaultLikesFilter = "default";

  const handleActiveProfileButton = (newActiveProfileButton) => {
    onActiveProfileButton(newActiveProfileButton);
  };

  const profileButtons = [
    { id: "profile", name: "Профиль", icon: artistIcon, component: ProfileItem },
    { id: "upload", name: "Загрузка", icon: trackIcon, component: UploadItem },
    { id: "settings", name: "Настройки", icon: albumIcon, component: SettingsItem },
  ]

  const categories = [
    { id: "songs", name: "Треки", icon: trackIcon, component: SongChartItem },
    { id: "artists", name: "Исполнители", icon: artistIcon, component: ArtistChartItem },
    { id: "albums", name: "Альбомы", icon: albumIcon, component: AlbumChartItem },
    { id: "playlists", name: "Плейлисты", icon: playlistIcon, component: PlaylistChartItem },
    { id: "clips", name: "Клипы", icon: clipsIcon, component: ClipChartItem }
  ];

  const filters = [
    { id: "date", name: "Дата", value: dateFilter, icon: trackIcon },
    { id: "listeners", name: "Слушатели", value: listenersFilter, icon: artistIcon },
    { id: "likes", name: "Лайки", value: likesFilter, icon: favoriteIcon }
  ];

  const fetchChartData = useCallback((chartType, filters) => {
    setIsFetching(true);
    setSelectedCategory(chartType);


    const apiUrl = `http://95.84.198.107:8000/api/${chartType}-chart?date=${filters.date}&listeners=${filters.listeners}&likes=${filters.likes}`;

    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      setChartData(data);
      const itemHeight = 80;
      const mainBoxHeight = `${data.length * itemHeight + 16}px`;
      const animationDuration = `${0.2 * data.length}s`;
      document.documentElement.style.setProperty('--animationDuration', animationDuration);
      document.documentElement.style.setProperty('--mainBoxHeight', mainBoxHeight);
      setIsFetching(false);
    })
    .catch((error) => {
      console.error("Ошибка при получении данных:", error);
      setIsFetching(false);
    });
    }, []);

//  useEffect(() => {
//    fetchChartData("songs", {
//      date: defaultDateFilter,
//      listeners: defaultListenersFilter,
//      likes: defaultLikesFilter,
//    });
//    }, [fetchChartData]);

  const resetFiltersToDefault = () => {
    setDateFilter(defaultDateFilter);
    setListenersFilter(defaultListenersFilter);
    setLikesFilter(defaultLikesFilter);
  };

  const toggleFilterValue = (filterValue) => {
    if (filterValue === "default") {
      return "increased";
    } else if (filterValue === "increased") {
      return "decreased";
    } else {
      return "default";
    }
  }

  const toggleFilter = (filterType) => {
    let newDateFilter = dateFilter;
    let newListenersFilter = listenersFilter;
    let newLikesFilter = likesFilter;

    if (filterType === "date") {
      newDateFilter = toggleFilterValue(dateFilter);
      setDateFilter(newDateFilter);
    } else if (filterType === "listeners") {
      newListenersFilter = toggleFilterValue(listenersFilter);
      setListenersFilter(newListenersFilter);
    } else if (filterType === "likes") {
      newLikesFilter = toggleFilterValue(likesFilter);
      setLikesFilter(newLikesFilter);
    }

    fetchChartData(selectedCategory, {
      date: newDateFilter,
      listeners: newListenersFilter,
      likes: newLikesFilter,
    });
  }

  return (
    <>
    <div className="bg">
      <div className="mainPage">
        <div className="leftColumn">
          {menuSwitch === "music" ? (
            <>
            <span className="leftColumnText">Категории:</span>
            <div className="categoryBox">
              {categories.map((category) => (
                <CategoryButton
                  key={category.id}
                  category={category}
                  selectedCategory={selectedCategory}
                  onClick={(categoryId) => {
                  resetFiltersToDefault();
                  fetchChartData(categoryId, {
                    date: defaultDateFilter,
                    listeners: defaultListenersFilter,
                    likes: defaultLikesFilter,
                  });
                }}
                  isFetching={isFetching}
                />
                ))}
            </div>
            <span className="leftColumnText">Сортировка:</span>
            <div className="filterBox">
              {filters.map((filter) => (
                <FilterButton
                  key={filter.id}
                  filter={filter}
                  toggleFilter={toggleFilter}
                />
                ))}
            </div>
            </>
            ) : (
              <>
              <div className="categoryBox">
                {profileButtons.map((category) => (
                  <ProfileButton
                    key={category.id}
                    category={category}
                    onClick={() => handleActiveProfileButton(category.id)}
                  />
                  ))}
              </div>
              </>
              )}
        </div>
        <div className="rightColumn">
          {isFetching ? (
              <div className="loader" />
            ) : (
              <>
                {activeProfileButton === "profile" ? (
                  <ProfileItem />
                ) : activeProfileButton === "upload" ? (
                  <UploadItem />
                ) : activeProfileButton === "settings" ? (
                  <SettingsItem />
                ) : (
                  <>
                    {chartData.length === 0 ? (
                      <span className="leftColumnText" style={{ marginTop: "32px" }}>
                        Ошибка загрузки. Попробуйте&nbsp;
                        <span style={{ color: "#90C47B", cursor: "pointer", textDecoration: "underline" }} onClick={() => fetchChartData(selectedCategory)}>
                          ещё раз
                        </span>
                        &nbsp;или повторите попытку позже!
                      </span>
                    ) : (
                      <>
                        <span className="leftColumnText">
                          {categories.find((category) => category.id === selectedCategory).name}
                        </span>
                      <div className={`mainBox animateHeight`}>
                        {chartData.map((item, index) => {
                          const animationDelay = `${index * 0.2}s`;
                          const style = { animationDelay };
                          return React.createElement(categories.find((category) => category.id === selectedCategory).component, { key: index, data: item, style });
                        })}
                      </div>
                      </>
                      )}
                  </>
                  )}
              </>
              )}
        </div>
      </div>
    </div>
    </>
    );
};

export default MusicPage;