import React from 'react';
import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import {
  demoProfilePicture,
  demoChannelUrl,
  demoChannelTitle,
} from '../utils/constants';

const ChannelCard = ({ channelDetail, marginTop }) => {
  return (
    <Box
      sx={{
        boxShadow: 'none',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        margin: 'auto',
        marginTop: marginTop,
      }}
    >
      <Link
        to={`/channel/${channelDetail?.id?.channelId || channelDetail?.id}`}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <CardMedia
            component="img"
            image={
              channelDetail?.snippet?.thumbnails?.high?.url ||
              channelDetail?.snippet?.thumbnails?.medium?.url ||
              channelDetail?.snippet?.thumbnails?.default?.url ||
              demoProfilePicture
            }
            alt={channelDetail?.snippet?.title}
            sx={{
              borderRadius: '50%',
              height: '180px',
              width: '180px',
              mb: 2,
              border: '1px solid #e3e3e3',
              objectFit: 'cover',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
            }}
          >
            {channelDetail?.snippet?.title || demoChannelTitle}
            <CheckCircle sx={{ fontSize: '16px', color: 'gray' }} />
          </Typography>
          {channelDetail?.statistics?.subscriberCount && (
            <Typography
              sx={{ fontSize: '14px', fontWeight: 500, color: 'gray' }}
            >
              {parseInt(
                channelDetail?.statistics?.subscriberCount,
              ).toLocaleString()}{' '}
              Subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;
