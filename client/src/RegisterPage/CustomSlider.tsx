import React from 'react';

import { Box, Typography, styled } from '@mui/material';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';

import image1 from '../assets/ai-1.jpg';
import image2 from '../assets/ai-2.jpg';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const CustomSlider = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
        style={{ height: '100vh', color: 'white' }}
      >
        <SwiperSlide>
          <Box sx={{ height: '50vh' }}>
            <Img alt="image" src={image1} />
          </Box>
          <Box
            sx={{
              maxWidth: '680px',
              maxHeight: '171px',
              marginLeft: '100px',
              marginTop: '80px',
            }}
          >
            <Typography variant="h4">Welcome!</Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box sx={{ height: '50vh' }}>
            <Img alt="image" src={image2} />
          </Box>
          <Box
            sx={{
              maxWidth: '680px',
              maxHeight: '171px',
              marginLeft: '100px',
              marginTop: '80px',
            }}
          >
            <Typography variant="h4">Welcome!</Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box sx={{ height: '50vh' }}>
            <Img alt="image" src={image1} />
          </Box>
          <Box
            sx={{
              maxWidth: '680px',
              maxHeight: '171px',
              marginLeft: '100px',
              marginTop: '80px',
            }}
          >
            <Typography variant="h4">Welcome!</Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Box>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default CustomSlider;
