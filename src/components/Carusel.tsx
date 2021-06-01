import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class Carusel extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div className="carusel">
                <Slider {...settings}>
                    <div className="slide">
                        <h2> Corporation information</h2>
                        <div className="slideContent">
                            <h3>1</h3>
                        </div>
                    </div>
                    <div className="slide">
                        <h2> Seo information</h2>
                        <div className="slideContent">
                            <h3>2</h3>
                        </div>
                    </div>
                </Slider>
            </div>
        );
    }
}