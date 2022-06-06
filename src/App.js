import React, { useState } from "react";
import "./App.css";
 
import Rules2 from "./components/Rules"
import Contractid  from "./components/Contractid"
 
// import Contract from './components/contract';

const firstComponent = () => {
  return (
    <div className="div3">
      
     
       </div>
  );
}
            

const secondComponent = () => {
  return(
    <div className="div1">
    
    <Contractid/>
     </div>
  );
}
const thirdComponent = () => {
  return (<div className="div4">
    <Rules2/>
     
    </div>
  );
}
const fourcomponent = () => {
  return <div>Four Component</div>;
};

const finalComponent = () => {
  return <div>Final Component</div>;
};

function App() {
  const [steps, setSteps] = useState([
    {
      key: "firstStep",
      label: "first step ",
      isDone: true,
      component: firstComponent,
    },
    {
      key: "secondStep",
      label: " Contract Id",
      isDone: false,
      component: secondComponent,
    },
    {
      key: "thirdStep",
      label: "Rule",
      isDone: false,
      component: thirdComponent,
    },
    {
      key: "fourStep",
      label: "My four Step",
      isDone: false,
      component: fourcomponent,
    },
    {
      key: "finalStep",
      label: "My Final Step",
      isDone: false,
      component: finalComponent,
    },
  ]);

  const [activeStep, setActiveStep] = useState(steps[0]);

  const handleNext = () => {
    if (steps[steps.length - 1].key === activeStep.key) {
      alert("You have completed all steps.");
      return;
    }

    const index = steps.findIndex((x) => x.key === activeStep.key);
    setSteps((prevStep) =>
      prevStep.map((x) => {
        if (x.key === activeStep.key) x.isDone = true;
        return x;
      })
    );
    setActiveStep(steps[index + 1]);
  };

  const handleBack = () => {
    const index = steps.findIndex((x) => x.key === activeStep.key);
    if (index === 0) return;

    setSteps((prevStep) =>
      prevStep.map((x) => {
        if (x.key === activeStep.key) x.isDone = false;
        return x;
      })
    );
    setActiveStep(steps[index - 1]);
  };

  return (
    <div className="App">
          
      <div className="box" style={{ backgroundColor: "white" }}>
        <div className="steps">
          <ul className="nav">
            {steps.map((step, i) => {
              return (
                <li
                  key={i}
                  className={`${activeStep.key === step.key ? "active" : ""} ${
                    step.isDone ? "done" : ""
                  }`}
                >
                  <div>
                    Step {i + 1}
                    <br />
                    <span>{step.label}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="step-component">{activeStep.component()}</div>
        <div className="btn-component">
          {/* <Contract/> */}
          <input
            type="button"
            value="Back"
            onClick={handleBack}
            disabled={steps[0].key === activeStep.key}
          />
          <input
            type="button"
            value={
              steps[steps.length - 1].key !== activeStep.key ? "Next" : "Submit"
            }
            onClick={handleNext}
          />
        </div>
      </div>
       
    </div>
  );
}

export default App;
