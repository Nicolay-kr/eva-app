import React,{useRef} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Corporation } from "./Main";
import { Universe } from './Main';

type MyProps = {
    corporation: Corporation|null;
    universe: Universe|null;
};


export default function Carusel(props: MyProps) {
    // const sliderRef = useRef();
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    const slider = Slider;
    const race_id =props.corporation?props.corporation.ceo.race_id:null;
    return (
        <div className="carusel" >
            <Slider {...settings}>
                <div className="slide">
                    <h2> Corporation information</h2>
                    <div className="slideContent">
                        <h3>Name: {props.corporation? props.corporation.name:"Corporation Name"}</h3>
                        <p><strong>CEO:</strong> {props.corporation? props.corporation.ceo.name:"Ceo"}</p>
                        <p><strong>Member count:</strong> {props.corporation? props.corporation.member_count:"Member count"}</p>
                        <p><strong>Description:</strong> {props.corporation? props.corporation.description:"description"}</p>
                    </div>
                </div>
                <div className="slide">
                    <h2> Seo information</h2>
                    <div className="slideContent">
                        <h3>Name: {props.corporation? props.corporation.ceo.name:"CEO Name"}</h3>
                        <p><strong>Birtday:</strong> {props.corporation? props.corporation.ceo.birthday:"Ceo"}</p>
                        <p><strong>Race:</strong> {props.universe? props.universe.races.find((item)=>item.race_id === race_id)?.name:"Member count"}</p>
                    </div>
                </div>
            </Slider>
        </div >
    );
}