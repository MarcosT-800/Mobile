import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules'; // Adicionando Autoplay
import './carousel3d.css';
import img1  from '../../public/letra_chamada 1.png';

export const Carousel3D = () => {
  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        slideShadows: true,
      }}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3000, // Tempo de rotação (3 segundos)
        disableOnInteraction: true, // Continua rodando mesmo após interação
      }}
      modules={[EffectCoverflow, Pagination, Autoplay]} // Incluindo Autoplay no Swiper
      className="mySwiper"
    >
      <SwiperSlide style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', textAlign: 'center'}}>
        {/* <img src="/letra_chamada 1.png" alt="Image 1" /> */}

        <h3 style={{ textAlign: 'center', fontFamily: 'Helvica Neue', fontSize: '38.161px', fontStyle: 'normal', fontWeight: '700', lineHeight: '60px', letterSpacing: '-1.624px', background: 'linear-gradient(0deg, #FF4545 0%, #FE869F 30%, #EF7E7A 45%, #ED8383 70%, #FF4343 85%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Seu Empréstimo garantido de forma rápida e fácil com a PH Negócios</h3>
      </SwiperSlide>
     {/*  <SwiperSlide style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <img src={img1} alt="Image 2" />
      </SwiperSlide>
      <SwiperSlide style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <img src="/texto 03.png" alt="Image 3" />
      </SwiperSlide> */}
    </Swiper>
  );
}
