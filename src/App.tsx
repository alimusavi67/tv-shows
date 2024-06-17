import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowPage from './pages/ShowPage/ShowPage';
import EpisodePage from './pages/EpisodePage/EpisodePage';
import HomePage from './pages/HomePage/HomePage';
import Header from './components/Basics/Header/Header';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shows/:showId" element={<ShowPage />} />
          <Route path="/episodes/:seasonId" element={<EpisodePage />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
