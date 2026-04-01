import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I help companies build resilient data foundations and analytics experiences
          that scale with the business. My background spans business intelligence,
          data engineering, and ML enablement—shipping pipelines across AWS and Azure,
          optimizing compute spend, and making data trustworthy. Currently at Amazon
          Development Center India, I design high-volume ETL pipelines, orchestrate
          complex Airflow workflows, and power executive decisioning through global
          reporting. Previously at Deloitte, I led multi-market data programs and
          dashboard rollouts across 9 regions.
        </p>
      </div>
    </div>
  );
};

export default About;
