import { Image } from "@chakra-ui/react";
import styles from "@/styles/slider.module.css";

// import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "/IMG_1046.jpg",
  "/IMG_1055.jpg",
  "/IMG_1066.jpg",
];

const Slider = () => {
  return (
    <>
      <Swiper
        modules={[
          // Navigation, 
          Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{
          clickable: true,
          bulletClass: `swiper-pagination-bullet ${styles.custom_bullet}`, 
          bulletActiveClass: `swiper-pagination-bullet-active ${styles.custom_bullet_active}`, 
        }}
        // navigation
        loop={true}
        className={styles.swiper}
      >
        {images.map((src: string, index: number) => (
          <SwiperSlide key={`${index}`} className={styles["swiper_slide"]}>
            <Image src={src} width={'400px'} height={'300px'} alt="test_image" pb={'30px'} m={'0 auto'} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
