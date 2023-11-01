import './App.css';
import Header from './modules/Header/Header.jsx'
import Footer from './modules/Footer/Footer.jsx'
import MusicPage from './pages/MusicPage/MusicPage.jsx'
import AudioPlayer from './modules/AudioPlayer/AudioPlayer.jsx'


function App() {
  return (
    <>
    <Header/>
    <MusicPage/>
    <AudioPlayer/>
    </>
  );
}

export default App;
