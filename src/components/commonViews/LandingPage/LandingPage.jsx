import React from "react";
import AuthForm from "../../AuthForm/AuthForm.jsx";

/**
 * @description stateless component that renders the landing page
 * @return {JSX} return JSX
 */
const Welcome = () => {
  // document.getElementById("site-title").innerHTML = "Welcome";
  return (
    <section className="body-container clearfix">
      <h1>
        WELCOME TO
        <label>i</label>REPORTER
      </h1>

      <article className="visitors-message clearfix">
        <h1>DO YOU?</h1>
        <ul>
          <li>
            Want your complaints to be heard by the masses and the government
          </li>
          <li>Want to whistle blow on any fraudulent activities</li>
          <li>
            Want to escalate an abandoned government project in your area or
            else where
            <strong>then you have come to the right place...</strong>
          </li>
        </ul>
        <br />
        <p>
          {`Corruption is a huge bane to Africa’s development. iReporter enables
          any/every citizen to bring any form of corruption to the notice of
          appropriate authorities and the general public. If you've witnessed or
          been the victim of crime, please report it here. It will help us to
          bring the offender to justice and make sure this doesn't happen to
          anyone else.`}
          <br />
          To get started fill the signup form.
        </p>

        <h1>
          <label>i</label>See
          <label>i</label>Report
          <img
            src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550839750/secure.png"
            className="secure"
            title="Secured Informations"
          />
        </h1>
      </article>
      <AuthForm />
    </section>
  );
};

export default Welcome;
