import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { FetchFromAPI } from '../utils/FetchFromAPI';
import Videos from './Videos';

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    FetchFromAPI(`search?part=snippet&q=${searchTerm}&maxResults=50`)
      .then((data) => setVideos(data?.items))
      .catch((error) => console.error('Error fetching search results:', error));
  }, [searchTerm]);

  return (
    <Box p={2} sx={{ minHeight: '95vh', backgroundColor: '#000' }}>
      <Typography variant="h4" fontWeight="bold" mb={3} sx={{ color: 'white' }}>
        Search Results for:{' '}
        <span style={{ color: '#fc1503' }}>{searchTerm}</span>
      </Typography>
      <Videos videos={videos} />
    </Box>
  );
};

export default SearchFeed;
