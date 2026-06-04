import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    title: "TalentPulse AI",
    category: "AI-Powered HR Tech",
    tech: "React, Node.js, Express, MongoDB, JWT, OpenRouter API",
    image: "/images/talentpulse.png",
    link: "https://employee-performance-ai.vercel.app",
    github: "https://github.com/Udaybanduni/employee-performance-ai",
  },
  {
    title: "Lost & Found Platform",
    category: "Community Full-Stack",
    tech: "React, Node.js, Express, MongoDB, Vercel, Render",
    image: "/images/lostfound.png",
    link: "https://lost-found-mern-project.vercel.app",
    github: "https://github.com/Udaybanduni/Lost-Found-MERN-Project",
  },
  {
    title: "Titanic Survival Prediction",
    category: "Machine Learning / Data Science",
    tech: "Python, scikit-learn, Pandas, NumPy, Jupyter, EDA",
    image: "/images/titanic.png",
    link: "https://github.com/Udaybanduni/Titanic-Survival-Prediction",
    github: "https://github.com/Udaybanduni/Titanic-Survival-Prediction",
  },
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (!box || box.length === 0) return;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // Use actual scroll width
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Clean up (optional, good practice)
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tech}</p>
              </div>
              <WorkImage image={project.image} alt={project.title} link={project.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
