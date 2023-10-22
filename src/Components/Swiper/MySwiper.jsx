import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
    EffectFade,
    EffectCoverflow,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// import 'swiper/css/effect-fade';
// import 'swiper/css/effect-coverflow';

const MySwiper = ({ images = [] }) => {
    const imgClass = "w-full max-h-64 md:max-h-96 lg:max-h-[600px]"
    return (
        <Swiper
            // effect={'coverflow'}
            // grabCursor={true} //for coverflow
            // centeredSlides={true} //for coverflow
            // coverflowEffect={{
            //     rotate: 50,
            //     stretch: 0,
            //     depth: 100,
            //     modifier: 1,
            //     slideShadows: true,
            // }}
            loop
            spaceBetween={0}
            slidesPerView={1}
            modules={[
                Autoplay,
                Navigation,
                Pagination,
                // Scrollbar,
                A11y,
                // EffectCoverflow
                // EffectFade
            ]}
            autoplay={{
                delay: 2500,
                pauseOnMouseEnter: true,
                disableOnInteraction: false, // Optional, but recommended
            }}

            navigation
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {/* {
                images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img className=''
                            src={image}
                            alt=""
                        />
                    </SwiperSlide>
                ))

            } */}

            <SwiperSlide>
                <img className={imgClass}
                    src='/banner-1.jpg'
                    alt=""
                />
            </SwiperSlide>
            <SwiperSlide>
                <img className={imgClass}
                    src='/banner-2.jpg'
                    alt=""
                />
            </SwiperSlide>
            <SwiperSlide>
                <img className={imgClass}
                    src='/banner-3.jpg'
                    alt=""
                />
            </SwiperSlide>

        </Swiper>
    );
};

MySwiper.propTypes = {
    images: PropTypes.array,
};

export default MySwiper
