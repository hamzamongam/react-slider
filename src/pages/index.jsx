import React from 'react';
import { Slider, SliderItem } from '../components/Slider/index';

const Home = () => {
    const sliderData = [
        {
            image: '/images/sliders/slider-1.jpg',
            title: 'Slider One'
        },
        {
            image: '/images/sliders/slider-2.jpg',
            title: 'Slider Two'
        },
        {
            image: '/images/sliders/slider-3.jpg',
            title: 'Slider Three'
        },
        {
            image: '/images/sliders/slider-4.jpg',
            title: 'Slider Four'
        }
    ]
    return (
        <div>
            <Slider autoPlay={false} arrow={true} dots={true}>
                {
                    sliderData.map((item, key) => (
                        <SliderItem
                            key={key}
                            title={item.title}
                            image={item.image}
                        ></SliderItem>
                    ))
                }
            </Slider>
        </div>
    );
}

export default Home;