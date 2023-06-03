import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './Slider.module.sass';

import animeImg from '../../assets/anime.jpg';
import serialImg from '../../assets/serial.jpg';
import filmImg from '../../assets/film.jpg';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const images: string[] = [animeImg, serialImg, filmImg];

    const handleSlideChange = (index: number) => {
        if (index < 0) {
            setCurrentSlide(images.length - 1); // Если текущий индекс меньше 0, перейти к последнему слайду
        } else if (index >= images.length) {
            setCurrentSlide(0); // Если текущий индекс больше или равен количеству слайдов, перейти к первому слайду
        } else {
            setCurrentSlide(index);
        }
    };

    return (
        <div className={styles.slider}>
            <button
                className={classNames(styles['slider-button'], styles['slider-button-left'])}
                onClick={() => handleSlideChange(currentSlide - 1)}
            >
                &lt;
            </button>
            <img src={images[currentSlide]} alt='Slide' className={styles['slider-image']} />
            <button
                className={classNames(styles['slider-button'], styles['slider-button-right'])}
                onClick={() => handleSlideChange(currentSlide + 1)}
            >
                &gt;
            </button>
            <div className={styles['slider-dots']}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={classNames(styles['slider-dot'], { [styles.active]: index === currentSlide })}
                        onClick={() => handleSlideChange(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
