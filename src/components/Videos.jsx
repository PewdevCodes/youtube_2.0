import React from 'react';
import { Box, Stack } from '@mui/material';
import VideoCard from './VideoCard';
import ChannelCard from './ChannelCard';

const Videos = ({ videos }) => {
  if (!videos?.length) return 'Loading...';

  // Separate channels and videos, put channels first
  const channels = videos.filter(
    (item) => item.id.channelId && !item.id.videoId,
  );
  const videoItems = videos.filter((item) => item.id.videoId);

  console.log('Channels:', channels.length, 'Videos:', videoItems.length);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        width: '100%',
      }}
    >
      {/* Show channel cards first */}
      {channels.slice(0, 1).map((item, idx) => (
        <Box key={`channel-${idx}`}>
          <ChannelCard channelDetail={item} />
        </Box>
      ))}
      {/* Then show video cards */}
      {videoItems.map((item, idx) => (
        <Box key={`video-${idx}`}>
          <VideoCard video={item} />
        </Box>
      ))}
    </Box>
  );
};

export default Videos;
