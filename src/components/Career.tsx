import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My Journey <span>&</span>
          <br /> Milestones
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech CSE (Artificial Intelligence)</h4>
                <h5>KIET Group of Institutions</h5>
              </div>
              <h3>2024-28</h3>
            </div>
            <p>
              Acquiring deep specialization in Artificial Intelligence and Machine Learning models while establishing a rigorous foundation in core computer science subjects like Data Structures, Algorithms, Object-Oriented Programming, and DBMS.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AWS Certified Cloud Practitioner</h4>
                <h5>Amazon Web Services (AWS)</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Earned global validation of fundamental cloud expertise. Demonstrated proficiency in designing secure cloud environments, utilizing core AWS services, and applying cloud architectural principles to full-stack applications.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full-Stack & AI Systems</h4>
                <h5>Personal & Open Source Projects</h5>
              </div>
              <h3>ACTIVE</h3>
            </div>
            <p>
              Designing end-to-end full-stack systems like TalentPulse AI and Lost & Found. Specialized in modern frontend responsive interfaces, secure backend server APIs, predictive algorithms, and database persistence architectures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
