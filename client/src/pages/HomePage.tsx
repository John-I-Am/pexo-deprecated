import { ReactElement } from "react";
import { Stack, rem } from "@mantine/core";
import HomeHeader from "../components/HomeHeader";
import HeroBanner from "../components/HeroBanner";
import HomeSectionWhat from "../components/HomeSectionWhat";
import HomeSectionHow from "../components/HomeSectionHow";
import HomeSectionWhy from "../components/HomeSectionWhy";
import HomeSectionFooter from "../components/HomeSectionFooter";

const HomePage = (): ReactElement => {
  console.log("homepage rendered");

  return (
    <Stack px="lg" spacing={rem(100)} justify="space-between">
      <HomeHeader />
      <HeroBanner />
      <HomeSectionWhy />
      <HomeSectionHow />
      <HomeSectionWhat />
      <HomeSectionFooter />
    </Stack>
  );
};

export default HomePage;
