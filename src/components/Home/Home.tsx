import React from "react";
import OfferCategories from "../OfferCategories/OfferCategories";
import HealthConcern from "../HealthConcern/HealthConcern";
import Prescription from "../Prescription/Prescription";
import Categories from "../Categories/Categories";
import Featured from "../Featured/Featured";
import WhyChoose from "../WhyChoose/WhyChoose";
import BannerSection from "../Bannar/SearchField";
import DynamicCategory from "../Bannar/Bannar";
import TopLevelBanner from "../Bannar/Banner2";
import TrendingNow from "../TrendingNow/TrendingNow";
import CustomerTestimonials from "../CustomerReview/CustomerReview";

const HomeCom = () => {
  return (
    <div className="mt-40">
      <TopLevelBanner />
      {/* <BannerSection /> */}
      <DynamicCategory />
      <TrendingNow />
      <OfferCategories />
      <HealthConcern />
      <Prescription />
      <CustomerTestimonials />
      {/* <Categories /> */}
      <Featured />
      <WhyChoose />
    </div>
  );
};

export default HomeCom;
