/* eslint-disable no-unused-vars */
import { useWindowScroll } from "@mantine/hooks";
import { ReactElement } from "react";
import { Container } from "@mantine/core";
import HomeHeader from "../components/HomeHeader";
import HeroBanner from "../components/HeroBanner";
import AboutSection from "../components/AboutSection";
import FeatureSection from "../components/FeatureSection";

import logo from "../../assets/logo_transparent.png";

const HomePage = (): ReactElement => {
  // eslint-disable-next-line no-unused-vars
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Container>
      <HomeHeader />
      <HeroBanner />
      {/* <AboutSection /> */}
      {/* <FeatureSection /> */}
    </Container>
  );
};

export default HomePage;
