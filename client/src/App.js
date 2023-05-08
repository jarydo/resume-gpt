import { useEffect, useState } from 'react';
import { getSummaryOfQualifications, getWorkExperience, getResume, getCoverLetter } from './services/openai';
import logo from './logo.svg';
import './App.css';

// import { Experience } from './components/experience';
import { Button, Input, Experience, Skills, Summary } from './components';

function App() {
  const [name, setName] = useState();
  const [job, setJob] = useState();
  const [experience, setExperience] = useState();
  const [data, setData] = useState();

  const fetchData = async () => {
    const formattedExperience = experience.split(";");
    const resume = await getResume(job, formattedExperience);
    setData(resume);
  }

  const ContactInfo = () => {
    return (
      <div className="flex justify-around">
        <div>Email</div>
        <div>Phone Number</div>
        <div>Linkedin</div>
        <div>Github</div>
      </div>
    );
  }

  const Projects = () => {

  }

  const Education = () => {

  }

  const Extracurriculars = () => {

  }

  // const handleNameChange = (e) => {
  //   setName(e.target.value);
  // }

  // const handleExperienceChange = (e) => {
  //   setExperience(e.target.value);
  // }

  const handleInputChange = (e, label) => {
    const labelMapping = {
      "Name": setName,
      "Job": setJob,
      "Work Experience": setExperience
    }

    labelMapping[label](e.target.value);
  }

  return (
    <div className="m-10">
      <header className="flex flex-col gap-3">
        <div className="flex justify-between">
          <Input onChange={handleInputChange} label="Name" placeholder="Name"/>
          <Input onChange={handleInputChange} label="Job" placeholder="Desired Job"/>
          <Input onChange={handleInputChange} label="Work Experience" placeholder="Work Experience (semicolon-delimited)"/>
          <Button onClick={() => fetchData()}>Generate</Button>
        </div>
        
        <h1 className="text-center">{name}</h1>
        <ContactInfo />
        {data && <div>
        <Summary summary={data["Summary of Qualifications"]}/>
        <Skills skills={data["Skills"]}/>
        <Experience experience={data["Work Experience"]}/>
        </div>}
        
      </header>
    </div>
  );
}

export default App;
