import React from "react";
import { Link } from "react-router-dom";

/**
 * @description The about page component
 * @returns {JSX} JSX
 */
const About = () => (
  <div>
    <article className="actual-post" id="about">
      <div>
        <h1 className="theme-blue">ABOUT</h1>
        <p>
          Corruption is a huge bane to Africa’s development. African countries
          must develop novel and localised solutions that will curb this menace,
          hence the birth of iReporter. iReporter enables any/every citizen to
          bring any form of corruption to the notice of appropriate authorities
          and the general public. You can also report on things that needs
          government intervention.
        </p>
        <br />
        <p>
          iReporter has several features that enables you to give concrete
          information on your reports. These features are video and picture
          uploads, geo-location of the occurence accompanied with a breif story
          or write-up.
        </p>
        <p>
          To get an idea on how it works, see{" "}
          <Link to="/howitworks" className="blue">
            how it works
          </Link>
        </p>
      </div>
    </article>
  </div>
);

export default About;
