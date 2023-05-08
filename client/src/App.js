import { useEffect, useState } from 'react';
import { getSummaryOfQualifications, getWorkExperience, getResume, getCoverLetter } from './services/openai';
import logo from './logo.svg';
import './App.css';

// import { Experience } from './components/experience';
import { Button, Input, Experience, Skills, Summary } from './components';

function App() {
  const [name, setName] = useState();
  const [job, setJob] = useState();
  const [employer, setEmployer] = useState();
  const [experience, setExperience] = useState();
  const [resumeData, setResumeData] = useState();
  const [coverLetter, setCoverLetter] = useState();

  const fetchData = async () => {
    const formattedExperience = experience.split(";");
    const resume = await getResume(job, formattedExperience);
    const cover = await getCoverLetter(name, job, formattedExperience, employer);
    setResumeData(resume);
    setCoverLetter(cover);
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

  const handleInputChange = (e, label) => {
    const labelMapping = {
      "Name": setName,
      "Job": setJob,
      "Work Experience": setExperience,
      "Employer": setEmployer
    }

    labelMapping[label](e.target.value);
  }

  return (
    <div className="m-10">
      <header className="flex flex-col gap-3">
        <div className="flex justify-between">
          <Input onChange={handleInputChange} label="Name" placeholder="Name"/>
          <Input onChange={handleInputChange} label="Job" placeholder="Desired Job"/>
          <Input onChange={handleInputChange} label="Employer" placeholder="Employer"/>
          <Input onChange={handleInputChange} label="Work Experience" placeholder="Work Experience (semicolon-delimited)"/>
          <Button onClick={() => fetchData()}>Generate</Button>
        </div>
        
        <h2>Cover Letter:</h2>
        <div className="border-black border-2 border-black px-10 py-5 whitespace-pre-wrap">
          {coverLetter}
        </div>

        <h2>Resume:</h2>
        {resumeData && <div className="border-2 border-black px-10 py-5 flex flex-col gap-4">
          <h1 className="text-center">{name}</h1>
          <ContactInfo />
          <Summary summary={resumeData["Summary of Qualifications"]}/>
          <Skills skills={resumeData["Skills"]}/>
          <Experience experience={resumeData["Work Experience"]}/>
        </div>}
      </header>
    </div>
  );
}

export default App;
