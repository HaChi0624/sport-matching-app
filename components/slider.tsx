import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import styles from "@/styles/slider.module.css";
import Image from "next/image";

const images = [
  "/next.svg",
  "/goya.png",
  "/vercel.svg",
];

const Slider = () => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{
          clickable: true,
          bulletClass: `swiper-pagination-bullet ${styles.custom_bullet}`, 
          bulletActiveClass: `swiper-pagination-bullet-active ${styles.custom_bullet_active}`, 
        }}
        navigation
        loop={true}
        className={styles.swiper}
       
      >
        {images.map((src: string, index: number) => (
          <SwiperSlide key={`${index}`} className={styles["swiper_slide"]}>
            <Image src={src} width={300} height={100} alt="test_image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
