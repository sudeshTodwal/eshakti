import React, { useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getHomePageProducts } from "../store/home/homeAction";

// custom components imports
import TopNav from "../components/topNavbar/TopNav.component";
import Navbar from "../components/navBar/Navbar.component";
import HeroSection from "../components/heroSection/HeroSection.component";
import SaleBanner from "../components/saleBanner/SaleBanner.component";
import ProductListing from "../components/productListing/ProductListing.component";
import MidBanner from "../components/mid-banner/MidBanner.component";
import OurQualities from "../components/ourQualities/OurQualities.component";
import Footer from "../components/footer/Footer.component";
import BottomBar from "../components/bottom-bar/BottomBar.component";

export default function Home() {
  const homepageProducts = useSelector((state) => state.home.homePageProducts);

  return (
    <div className="home">
      <HeroSection />
      <SaleBanner />
      {homepageProducts && (
        <>
          <ProductListing
            products={homepageProducts.best_seller.products || []}
            title={
              homepageProducts.best_seller
                ? homepageProducts.best_seller.title
                : null
            }
            description={
              homepageProducts.best_seller
                ? homepageProducts.best_seller.description
                : null
            }
          />
          <ProductListing
            products={homepageProducts.new_arrival.products || []}
            title={
              homepageProducts.new_arrival
                ? homepageProducts.new_arrival.title
                : null
            }
            description={
              homepageProducts.new_arrival
                ? homepageProducts.new_arrival.description
                : null
            }
          />
        </>
      )}

      <MidBanner />
      <OurQualities />
    </div>
  );
}
