import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>The Verdict</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>The Moat</h4>
            <p>
              is the algorithm. India-tuned models for NDVI, NPK, soil moisture
              and KCC-eligible credit, fitted on local crops and monsoons.
              Anyone can buy the pixels. Almost no one has the models.
            </p>
            <h4>The Buyer</h4>
            <p>
              is the institution. Banks pay for credit-scoring APIs, insurers
              for crop-risk underwriting, governments for PMFBY oversight.
              Farmers benefit; institutions write the cheques.
            </p>
          </div>
          <div className="contact-box">
            <h4>Read further</h4>
            <a
              href="https://www.satyukt.com/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              satyukt.com <MdArrowOutward />
            </a>
            <a
              href="https://www.isro.gov.in/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              ISRO <MdArrowOutward />
            </a>
            <a
              href="https://www.nabard.org/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              NABARD <MdArrowOutward />
            </a>
            <a
              href="https://pmfby.gov.in/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              PMFBY <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              The Strategy <br /> is to <span>deepen</span>
            </h2>
            <p>
              Priority 1: bundle credit, insurance and advisory in India —
              monetize the infrastructure already built. Priority 2: expand to
              analog markets (Bangladesh, Kenya, Indonesia) with state-backed
              insurance. Reject the non-agri quadrants; they abandon the moat.
            </p>
            <h5>
              <MdCopyright /> 2026 — A Strategic Analysis
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
