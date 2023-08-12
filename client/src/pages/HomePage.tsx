import { ReactElement } from "react";
import { Container, Space } from "@mantine/core";
import HomeHeader from "../components/HomeHeader";
import HeroBanner from "../components/HeroBanner";
import HomeSectionWhat from "../components/HomeSectionWhat";
import HomeSectionHow from "../components/HomeSectionHow";
import HomeSectionWhy from "../components/HomeSectionWhy";

const HomePage = (): ReactElement => {
  // eslint-disable-next-line no-unused-vars
  console.log("homepage rendered");

  return (
    <Container>
      <HomeHeader />
      <Space h="xl" />
      <HeroBanner />
      <Space h="xl" />
      <HomeSectionWhy />
      <Space h="xl" />
      <HomeSectionHow />
      <Space h="xl" />
      <HomeSectionWhat />
      <Space h="xl" />

    </Container>
  );
};

export default HomePage;
