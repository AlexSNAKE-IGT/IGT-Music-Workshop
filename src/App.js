import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './modules/Header/Header.jsx'
import MusicPage from './pages/MusicPage/MusicPage.jsx'
import AudioPlayer from './modules/AudioPlayer/AudioPlayer.jsx'
import { AuthProvider } from './providers/AuthContext';
import {useState} from "react";

function App() {
  const [menuSwitch, setMenuSwitch] = useState("music");
  const [activeProfileButton, setActiveProfileButton] = useState("profile");

  const handleMenuSwitchChange = (newMenuSwitch) => {
    setMenuSwitch(newMenuSwitch);
  }

  const handleActiveProfileButton= (newActiveProfileButton) => {
    setActiveProfileButton(newActiveProfileButton)
  }

  return (
    <AuthProvider>
      <Header menuSwitch={menuSwitch} onMenuSwitchChange={handleMenuSwitchChange} onActiveProfileButton={handleActiveProfileButton}/>
        <Router>
          <Routes>
            <Route path="/" element={
            <>
            <MusicPage menuSwitch={menuSwitch} activeProfileButton={activeProfileButton} onActiveProfileButton={handleActiveProfileButton}/>
            <AudioPlayer/>
            </>
            }/>
          </Routes>
        </Router>
    </AuthProvider>
    );
}

export default App;
