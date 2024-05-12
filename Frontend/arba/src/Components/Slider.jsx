import React from "react";
import SimpleImageSlider from "react-simple-image-slider";
import SliderImg from "../Images/SliderImg.png";

const images = [
  { url: SliderImg },
  { url: SliderImg },
  { url: SliderImg },
  { url: SliderImg },
];

const Slider = () => {
  const sliderContainerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={sliderContainerStyles}>
      <SimpleImageSlider
        width={"90%"}
        height={504}
        images={images}
        showBullets={true}
        autoPlay={true}
      />
    </div>
  );
};

export default Slider;
