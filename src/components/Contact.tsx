import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href="https://http://www.linkedin.com/in/ayushsharma1175"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                LinkedIn — Ayush Sharma
              </a>
            </p>
            <h4>Education</h4>
            <p>
              Digital Marketing (BBA), IILM UNIVERSITY, G.NOIDA — 2023–2026
            </p>
            {/* <p>
              B.Tech Computer Science, Manav Rachna Educational Institutions —
              2009–2013
            </p> */}
          </div>
          <div className="contact-box">
            {/* <h4>Social</h4>
            <a
              href="https://github.com/akashrmalhotra"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a> */}
            {/* <a
              href="https://www.linkedin.com/in/akashrmalhotra/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a> */}
            {/* <a
              href="https://www.youtube.com/@Leftbraincoder"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              YouTube <MdArrowOutward />
            </a> */}
            {/* <a
              href="https://www.instagram.com/leftbraincoder/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a> */}
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>AYUSH SHARMA</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
