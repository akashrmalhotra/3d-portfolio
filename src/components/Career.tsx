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
                <h4>Business Intelligence Engineer</h4>
                <h5>Amazon Development Center India</h5>
              </div>
              <h3>Now</h3>
            </div>
            <p>
              Built Last Mile delivery analytics pipelines processing 10+ TB/day.
              Developed ML-ready feature datasets for predictive modeling on SageMaker.
              Optimized queries and data models to reduce cost and latency across
              global WBR reporting.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Consultant</h4>
                <h5>Deloitte Touche Tohmatsu India LLP</h5>
              </div>
              <h3>2021–2025</h3>
            </div>
            <p>
              Data Engineering & Analytics. Built Databricks pipelines across
              9 global markets, delivered 85+ Power BI dashboards with 80% adoption
              growth, and implemented CI/CD for BI assets cutting release cycles by 50%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Associate Software Engineer</h4>
                <h5>Ernst &amp; Young GDS</h5>
              </div>
              <h3>Early Career</h3>
            </div>
            <p>
              Built foundational analytics workflows and reporting support.
              Collaborated across stakeholders on data delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
