import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Freelancer</h4>
                <h5>Fiverr</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Worked with diverse clients on Fiverr, delivering quality projects while building strong creative and communication skills.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Graphic Designer</h4>
                <h5>Designing dots</h5>
              </div>
              <h4>2024–25</h4>
            </div>
            <p>
              Worked as a Graphic Designer at Designing Dots, a personal branding agency, creating visually engaging content for clients. Collaborated closely with clients to understand their vision and deliver designs that strengthened their personal brand identity.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Internships</h4>
                <h5>Social media executive </h5>
              </div>
              <h4>2025–26</h4>
            </div>
            <p>
              June 2025 – September 2025. I completed my internship at Amrit Aura and Serif Studio, where I worked on social media management, content creation, and building brand presence.
            </p>
          {/* </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Sf Engineer</h4>
                <h5>Infogain</h5>
              </div>
              <h3>2013-16</h3>
            </div> */}
            {/* <p>
              Software engineering across enterprise projects, contributing to
              design, development, and delivery of business applications.
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
