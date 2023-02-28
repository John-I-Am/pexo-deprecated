/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useWindowScroll } from "@mantine/hooks";

import { Button } from "@mantine/core";
import { ReactElement } from "react";
import {
  Container, Header, SectionOne, SectionTwo, SectionThree, SectionFour, Footer, ScrollContainer,
} from "./styles";

import logo from "../../assets/logo_transparent.png";
import hero from "../../assets/hero.svg";
import { ReactComponent as LandingLogistic } from "../../assets/landing_logistics.svg";
import { ReactComponent as LandingLove } from "../../assets/landing_love.svg";
import { ReactComponent as LandingGraph } from "../../assets/landing_graph.svg";
import { ReactComponent as LandingBird } from "../../assets/landing_bird.svg";
import { ReactComponent as RocketIcon } from "../../assets/home_icon_rocket.svg";
import { ReactComponent as BulbIcon } from "../../assets/home_icon_bulb.svg";
import { ReactComponent as BoltIcon } from "../../assets/home_icon_bolt.svg";
import { ReactComponent as GraphIcon } from "../../assets/home_icon_graph.svg";
import { ReactComponent as CloudIcon } from "../../assets/home_icon_cloud.svg";
import { ReactComponent as CustomizationIcon } from "../../assets/home_icon_customization.svg";
import srs from "../../assets/srs.gif";

const HomePage = (): ReactElement => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [scroll, scrollTo] = useWindowScroll();

  const renderSectionTwo = () => {
    switch (true) {
      case scroll.y > 0 && scroll.y < 1600:
        return (
          <div>
            <LandingLove />
            <p>Built with love!</p>
          </div>
        );
      case scroll.y > 1600 && scroll.y < 2000:
        return (
          <div>
            <LandingGraph />
            <p>Track your progress</p>
          </div>
        );
      default:
        return (
          <div>
            <LandingLogistic />
            <p>No more paper!</p>
          </div>
        );
    }
  };
  return (
    <Container>
      <Header>
        <div>
          <img src={logo} alt="logo" />
        </div>

        <div id="home-link">
          <a href="#section-3">About</a>
          <a href="#section-2">Features</a>
        </div>

        <div id="home-nav">
          <Button type="button" compact onClick={() => navigate("/login")}> Log in </Button>
          <Button type="button" compact onClick={() => navigate("/signup")}> Sign Up </Button>
        </div>
      </Header>

      <SectionOne id="section-1">
        <div>
          <h1> Pexo - A Modern Spaced Repetition System </h1>
          <h2>
            <span>Review.</span>
            <span>Repeat.</span>
            <span>Retain.</span>
          </h2>
        </div>
        <img src={hero} alt="hero" />
      </SectionOne>

      <SectionThree id="section-3">
        <div>
          <h3>Spaced Repetition System</h3>
          <p>
            Spaced repetition is an evidence-based learning technique that is usually
            performed with flashcards. Newly introduced and more difficult flashcards
            are shown more frequently, while older and less difficult flashcards are
            shown less frequently in order to exploit the psychological spacing effect.
            The use of spaced repetition has been proven to increase the rate of learning.
          </p>
          {" "}
          <div />

          <div>
            <div>
              <RocketIcon />
              <span>
                <h3>Excel</h3>
                <p>Remember anything, and everything. </p>
              </span>
            </div>
            <div>
              <BulbIcon />
              <span>
                <h3>Backed by decades of research</h3>
                <p>SRS backed by decades of clinical research.</p>
              </span>
            </div>
            <div>
              <BoltIcon />
              <span>
                <h3>Supercharge your learning</h3>
                <p>Adaptive algorithm tests you when you are on the brink of forgetting.</p>
              </span>
            </div>
          </div>
          <div />
        </div>

        <div>
          <img src={srs} alt="srs" />
        </div>
      </SectionThree>

      <ScrollContainer>
        <SectionTwo id="section-2">
          {renderSectionTwo()}

          <div>
            <h3>Mellowly Minimalistic, Porcupine Powerful</h3>
            <p>Chock-full of features! Simple, Not bland.</p>
          </div>

          <div>
            <div>
              <CloudIcon />
              <p>Synced to the cloud</p>
            </div>
            <div>
              <CustomizationIcon />
              <p>Customize</p>
            </div>
            <div>
              <GraphIcon />
              <p>Statistics</p>
            </div>
          </div>
        </SectionTwo>
      </ScrollContainer>

      <SectionFour>
        <h1>CUTE BIRD</h1>
        <LandingBird />
      </SectionFour>

      <Footer>
        <div>
          <img src={logo} alt="logo" />
          {/* <div>
            <p>Link</p>
            <p>Link</p>
            <p>Link</p>
          </div>
          <div>
            <p>Link</p>
            <p>Link</p>
            <p>Link</p>
          </div>
          <div>
            <p>Link</p>
            <p>Link</p>
            <p>Link</p>
          </div> */}
        </div>
        <div>
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </Footer>
    </Container>
  );
};

export default HomePage;
