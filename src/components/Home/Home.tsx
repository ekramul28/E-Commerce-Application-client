import React from "react";
import Banner from "../Bannar/Bannar";
import OfferCategories from "../OfferCategories/OfferCategories";
import HealthConcern from "../HealthConcern/HealthConcern";
import Prescription from "../Prescription/Prescription";
import Categories from "../Categories/Categories";
import Featured from "../Featured/Featured";
import WhyChoose from "../WhyChoose/WhyChoose";

const HomeCom = () => {
  return (
    <div>
      <Banner />
      <OfferCategories />
      <HealthConcern />
      <Prescription />
      <Categories />
      <Featured />
      <WhyChoose />
    </div>
  );
};

export default HomeCom;
