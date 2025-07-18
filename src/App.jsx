import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UrlForm from './COMPONENT/UrlFormvalidations.jsx';
import StatsPage from './COMPONENT/Stats.jsx';
import RedirectHandler from './COMPONENT/Redirecting.jsx';

function App() {
    return (
    <Routes>
    <Route path="/" element={<UrlForm />} />
    <Route path="/stats" element={<StatsPage />} />
    <Route path="/:shortcode" element={<RedirectHandler />} />
    </Routes>
    );
}

export default App;
