import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import NoMatch from './components/noMatch';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:year" element={<Home />} />
      <Route path="/:year/:country" element={<Home />} />
      <Route path="/:year/:country/:town" element={<Home />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
