import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './Slider.module.sass';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const images: string[] = [
        'https://i.pinimg.com/originals/5a/e0/5f/5ae05fb2b349c9211b955f6b2933de84.jpg',
        'https://i.imgflip.com/3jgm0p.jpg',
        'https://i.imgflip.com/44djtm.png',
        // Добавьте остальные изображения в массив
    ];

    const handleSlideChange = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <div className={styles.slider}>
            <div className={styles['slider-buttons']}>
                <button
                    className={styles['slider-button']}
                    onClick={() => handleSlideChange(currentSlide - 1)}
                    disabled={currentSlide === 0}
                >
                    Previous
                </button>
                <button
                    className={styles['slider-button']}
                    onClick={() => handleSlideChange(currentSlide + 1)}
                    disabled={currentSlide === images.length - 1}
                >
                    Next
                </button>
            </div>
            <div className={styles['slider-dots']}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={classNames(styles['slider-dot'], { [styles.active]: index === currentSlide })}
                        onClick={() => handleSlideChange(index)}
                    />
                ))}
            </div>
            <img src={images[currentSlide]} alt='Slide'/>
        </div>
    );
};

export default Slider;
