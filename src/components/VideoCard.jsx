import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from '../utils/constants';

const VideoCard = ({
  video: {
    id: { videoId },
    snippet,
  },
}) => {
  return (
    <Card
      sx={{
        width: '100%',
        boxShadow: 'none',
        borderRadius: '12px',
        backgroundColor: 'transparent',
      }}
    >
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia
          component="img"
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
          alt={snippet?.title}
          sx={{
            width: '100%',
            height: 180,
            borderRadius: '12px',
            '&:hover': { borderRadius: '0px' },
            transition: 'border-radius 0.3s ease',
          }}
        />
      </Link>
      <CardContent
        sx={{
          backgroundColor: 'transparent',
          height: '106px',
          padding: '12px 4px',
        }}
      >
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="#FFF"
            sx={{
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: '1.4',
            }}
          >
            {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link
          to={
            snippet?.channelId
              ? `/channel/${snippet?.channelId}`
              : demoChannelUrl
          }
        >
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="gray"
            sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}
          >
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircle sx={{ fontSize: 12, color: 'gray', ml: '5px' }} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
