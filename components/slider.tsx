import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore, { Navigation, Pagination } from "swiper/modules";
import styles from "@/styles/swiperComponent.module.css";
import Image from "next/image";

const images = [
  "/next.svg",
  "/goya.png",
  "/vercel.svg",
  "/images/dummy.png",
  "/images/dummy.png",
  "/images/dummy.png",
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
        }}
        navigation
        loop={true}
        className={styles.swiper}
      >
        {images.map((src: string, index: number) => (
          <SwiperSlide key={`${index}`} className={styles.SwiperSlide}>
            <Image
              src={src}
              width={300}
              height={200}
              alt="test_image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
