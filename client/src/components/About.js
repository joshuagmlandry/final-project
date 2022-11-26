import styled from "styled-components";

// About page with brief description of the project motivation and APIs used

const About = () => {
  return (
    <AboutWrapper>
      <ImageWrapper>
        <AboutHeader>About Loon </AboutHeader>
      </ImageWrapper>
      <AboutBody>
        Loon was created in June 2022 in Montreal, QC as both a web development
        course project and a potential tool for campers using the Canadian
        national park system. After the repeated experience of arriving at a
        campsite and wishing that the photos and description of it online more
        accurately reflected the actual site, Loon founders envisioned a
        solution: an application showcasing user reviews of campsites across the
        Parks Canada network. Loon has been made possible with the integration
        of the ArcGIS API for JS, open Parks Canada data from the Government of
        Canada, Auth0, reCAPTCHA, Cloudinary, as well as park
        images/descriptions from the Parks Canada website and original photos by
        Nora St-Aubin.
      </AboutBody>
    </AboutWrapper>
  );
};

export default About;

const AboutBody = styled.div`
  align-items: center;
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.5;
  margin: 40px 60px;
  text-align: center;

  @media only screen and (min-width: 768px) {
  font-size: 1.25rem;
  }
`;

const AboutHeader = styled.div`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.92);
  border-radius: 50px;
  display: flex;
  justify-content: center;
  font-family: var(--font-body);
  font-size: 1.5rem;
  padding: 10px;

  @media only screen and (min-width: 768px) {
  font-size: 2rem;
  padding: 20px;
  }
`;

const AboutWrapper = styled.div`
  min-height: 100vh;
`;

const ImageWrapper = styled.div`
  align-items: center;
  background-image: url("https://res.cloudinary.com/dlfu6niut/image/upload/v1654815011/about-image_cteguy.jpg");
  background-size: 100%;
  display: flex;
  height: 250px;
  justify-content: center;
  width: 100vw;

  @media only screen and (min-width: 768px) {
    height: 500px;
  }
`;
