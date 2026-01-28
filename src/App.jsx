import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import {
  Navbar,
  Feed,
  VideoDetails,
  ChannelDetails,
  SearchFeed,
} from './components';

const App = () => (
  <div>
    <BrowserRouter>
      <Box sx={{ backgroundColor: '#000000' }}></Box>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Feed />}></Route>
        <Route path="/video/:id" element={<VideoDetails />}></Route>
        <Route path="/channel/:id" element={<ChannelDetails />}></Route>
        <Route path="/search/:searchTerm" element={<SearchFeed />}></Route>
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
