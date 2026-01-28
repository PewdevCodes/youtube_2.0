import React, { useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import Videos from './Videos';
import { FetchFromAPI } from '../utils/FetchFromAPI';
import { useState } from 'react';

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos([]);
    FetchFromAPI(
      `search?part=snippet&q=${selectedCategory}&type=video,channel&maxResults=50`,
    ).then((data) => setVideos(data.items));
  }, [selectedCategory]);

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      sx={{
        backgroundColor: '#000',
        minHeight: '92vh',
      }}
    >
      {/* Left Side - Categories Sidebar */}
      <Box
        sx={{
          height: { xs: 'auto', md: '92vh' },
          px: { xs: 0, md: 2 },
          overflowY: 'auto',
          width: { xs: '100%', md: '200px' },
          minWidth: { md: '200px' },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: '#fff' }}
        >
          Copyright 2026 meowTUBE
        </Typography>
      </Box>

      {/* Right Side - Videos Section */}
      <Box
        p={2}
        sx={{
          overflowY: 'auto',
          height: '90vh',
          flex: 2,
          backgroundColor: '#000',
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: 'white' }}
        >
          {`${selectedCategory}`}{' '}
          <span style={{ color: '#FC1503' }}>videos</span>
        </Typography>
        {/* Videos will be displayed here */}

        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
