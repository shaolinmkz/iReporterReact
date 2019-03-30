import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorks = () => (
  <article className="actual-post" id="howitworks">
    <div>
        <h1 className="theme-blue"> HOW IT WORKS</h1>
        <p>Three simple steps</p>
        <br />
        <ul>
            <li>First register using the link <Link to="/" className="blue">register</Link>.</li>
            <br />
            <li>Navigate to the report menu on your navigation bar after signup.</li> <br />
            <li>Fill the form and upload necessary evidence if available and send.</li>
        </ul>
        <br />
        <p>Thats it!</p>
    </div>
</article>
);

export default HowItWorks;