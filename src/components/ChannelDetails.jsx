import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CardMedia, keyframes } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { FetchFromAPI } from '../utils/FetchFromAPI';
import { demoProfilePicture } from '../utils/constants';
import Videos from './Videos';

// Dynamic gradient animation
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const ChannelDetails = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch channel details
    FetchFromAPI(`channels?part=snippet,statistics&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]))
      .catch((error) =>
        console.error('Error fetching channel details:', error),
      );

    // Fetch channel videos
    FetchFromAPI(`search?channelId=${id}&part=snippet&order=date&maxResults=50`)
      .then((data) => setVideos(data?.items))
      .catch((error) => console.error('Error fetching channel videos:', error));
  }, [id]);

  return (
    <Box minHeight="95vh" sx={{ backgroundColor: '#000' }}>
      {/* Channel Banner - Dynamic Animated Gradient */}
      <Box
        sx={{
          background:
            'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab, #fc1503, #ff5e3a)',
          backgroundSize: '400% 400%',
          animation: `${gradientAnimation} 15s ease infinite`,
          height: '300px',
          zIndex: 10,
        }}
      />

      {/* Channel Info Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '-120px',
        }}
      >
        {/* Channel Logo */}
        <CardMedia
          component="img"
          image={
            channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture
          }
          alt={channelDetail?.snippet?.title}
          sx={{
            borderRadius: '50%',
            height: '180px',
            width: '180px',
            border: '3px solid #fff',
            objectFit: 'cover',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        />

        {/* Channel Name */}
        <Typography
          variant="h4"
          sx={{
            color: '#fff',
            fontWeight: 'bold',
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {channelDetail?.snippet?.title}
          <CheckCircle sx={{ fontSize: '24px', color: 'gray' }} />
        </Typography>

        {/* Subscriber Count */}
        {channelDetail?.statistics?.subscriberCount && (
          <Typography
            sx={{
              color: 'gray',
              fontSize: '16px',
              mt: 1,
            }}
          >
            {parseInt(
              channelDetail?.statistics?.subscriberCount,
            ).toLocaleString()}{' '}
            Subscribers
          </Typography>
        )}

        {/* Channel Statistics */}
        <Box
          sx={{
            display: 'flex',
            gap: 4,
            mt: 2,
            color: 'gray',
          }}
        >
          {channelDetail?.statistics?.videoCount && (
            <Typography sx={{ fontSize: '14px' }}>
              {parseInt(channelDetail?.statistics?.videoCount).toLocaleString()}{' '}
              Videos
            </Typography>
          )}
          {channelDetail?.statistics?.viewCount && (
            <Typography sx={{ fontSize: '14px' }}>
              {parseInt(channelDetail?.statistics?.viewCount).toLocaleString()}{' '}
              Total Views
            </Typography>
          )}
        </Box>

        {/* Channel Description */}
        {channelDetail?.snippet?.description && (
          <Typography
            sx={{
              color: '#aaa',
              maxWidth: '800px',
              textAlign: 'center',
              mt: 3,
              px: 3,
              fontSize: '14px',
              lineHeight: 1.6,
            }}
          >
            {channelDetail?.snippet?.description.length > 300
              ? `${channelDetail?.snippet?.description.substring(0, 300)}...`
              : channelDetail?.snippet?.description}
          </Typography>
        )}
      </Box>

      {/* Channel Videos Section */}
      <Box sx={{ p: 3, mt: 4 }}>
        <Typography
          variant="h5"
          sx={{
            color: '#fff',
            mb: 3,
            fontWeight: 'bold',
          }}
        >
          Videos
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetails;
