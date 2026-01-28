import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Stack } from '@mui/material';
import { CheckCircle, ThumbUp, Visibility } from '@mui/icons-material';
import { FetchFromAPI } from '../utils/FetchFromAPI';
import Videos from './Videos';

const VideoDetails = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    // Fetch video details
    FetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data?.items[0]))
      .catch((error) => console.error('Error fetching video details:', error));

    // Fetch related videos
    FetchFromAPI(
      `search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=20`,
    )
      .then((data) => setRelatedVideos(data?.items))
      .catch((error) => console.error('Error fetching related videos:', error));
  }, [id]);

  if (!videoDetail)
    return (
      <Box sx={{ minHeight: '95vh', backgroundColor: '#000' }}>Loading...</Box>
    );

  const { snippet, statistics } = videoDetail;
  const { title, channelId, channelTitle, description } = snippet;
  const { viewCount, likeCount } = statistics;

  return (
    <Box minHeight="95vh" sx={{ backgroundColor: '#000' }}>
      <Stack direction={{ xs: 'column', md: 'row' }}>
        {/* Video Player Section */}
        <Box flex={1} sx={{ p: 2 }}>
          {/* YouTube Video Player - Using iframe embed */}
          <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
            <Box
              sx={{
                width: '100%',
                height: '500px',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: '100%', height: '100%' }}
              />
            </Box>

            {/* Video Title */}
            <Typography
              variant="h5"
              fontWeight="bold"
              color="#fff"
              sx={{ mt: 2 }}
            >
              {title}
            </Typography>

            {/* Video Stats & Channel Info */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ py: 2, borderBottom: '1px solid #3d3d3d' }}
            >
              {/* Channel Link */}
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant="subtitle1"
                  color="#fff"
                  sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                >
                  {channelTitle}
                  <CheckCircle sx={{ fontSize: '14px', color: 'gray' }} />
                </Typography>
              </Link>

              {/* View & Like Count */}
              <Stack direction="row" gap={3} alignItems="center">
                <Typography
                  variant="body1"
                  sx={{
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <Visibility sx={{ fontSize: '20px', color: 'gray' }} />
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <ThumbUp sx={{ fontSize: '20px', color: 'gray' }} />
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>

            {/* Video Description */}
            <Typography
              variant="body2"
              color="#aaa"
              sx={{ mt: 2, lineHeight: 1.8 }}
            >
              {description.length > 500
                ? `${description.substring(0, 500)}...`
                : description}
            </Typography>
          </Box>
        </Box>

        {/* Related Videos Section */}
        <Box
          px={2}
          py={{ md: 2 }}
          sx={{ overflowY: 'auto', maxWidth: { xs: '100%', md: '400px' } }}
        >
          <Typography
            variant="h6"
            color="#fff"
            fontWeight="bold"
            sx={{ mb: 2 }}
          >
            Related Videos
          </Typography>
          <Videos videos={relatedVideos} />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetails;
