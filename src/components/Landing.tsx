import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>A Strategic Analysis</h2>
            <h1>
              SATYUKT
              <br />
              <span>TRUST INFRA</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Selling Trust,</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Not</div>
              <div className="landing-h2-2">Satellites</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Satellites</div>
              <div className="landing-h2-info-1">Not</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
