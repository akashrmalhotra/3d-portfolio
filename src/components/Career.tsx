import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          The evolution <span>&</span>
          <br /> value capture
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Trust Infrastructure</h4>
                <h5>Selling ongoing risk relationships</h5>
              </div>
              <h3>NEXT</h3>
            </div>
            <p>
              The next step follows the logic of the last three: bundle credit,
              insurance and advisory into a continuous relationship. Stop selling
              point analyses; become the rail that institutions trust to underwrite
              smallholder agriculture at scale. Highest value capture — and the
              hardest problem to keep clean. The risk isn&apos;t power transfer;
              it is opacity. Who audits the model? What happens if a satellite
              glitch depresses a yield estimate, or a credit score? Trust
              infrastructure stands or falls on model governance.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Sat2Credit &amp; Sat4Risk</h4>
                <h5>Selling decisions to institutions</h5>
              </div>
              <h3>2020</h3>
            </div>
            <p>
              The pivot from advice to underwriting. Banks pay for credit scores
              against the KCC-eligible base of 50M farmers. Insurers and PMFBY pay
              for crop-risk decisions at the regional level. The buyer changes —
              from a farmer&apos;s subscription to an institution&apos;s line item —
              and so does the value captured.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Sat2Farm</h4>
                <h5>Selling advisories to farmers</h5>
              </div>
              <h3>2019</h3>
            </div>
            <p>
              The first product moves Satyukt from raw analysis to a packaged
              decision: when to sow, when to spray, when to expect yield. A B2C
              subscription to smallholders — the smallest revenue line and the
              weakest moat, but the listening post that calibrates the models.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Consultancy</h4>
                <h5>IISc / ISRO DNA</h5>
              </div>
              <h3>2018</h3>
            </div>
            <p>
              Founded out of IISc / ISRO heritage. Selling raw remote-sensing
              analyses project by project. Lowest value captured — every engagement
              starts from zero — but the work that builds the India-specific data
              and model corpus everything else compounds on.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
