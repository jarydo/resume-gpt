import { useEffect, useState } from 'react';
import { getSummaryOfQualifications, getWorkExperience, getResume, getCoverLetter } from './services/openai';
import logo from './logo.svg';
import './App.css';

// import { Experience } from './components/experience';
import { Button, Input, Experience, Skills, Summary } from './components';
import { EditInput } from './components/Input/EditInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';

//import HTMLtoDOCX from 'html-to-docx';
// import htmlDocx from 'html-docx-js';
//import PizZip from 'pizzip';
//import docxtemplater from 'docxtemplater';
import { Packer } from "docx";
import { saveAs } from 'file-saver';

function App() {
  const [name, setName] = useState();
  const [job, setJob] = useState();
  const [employer, setEmployer] = useState();
  const [experiences, setExperiences] = useState([""]);
  const [resumeData, setResumeData] = useState();
  const [coverLetter, setCoverLetter] = useState();

  const fetchData = async () => {
    const resume = await getResume(job, experiences);
    const cover = await getCoverLetter(name, job, experiences, employer);
    setResumeData(resume);
    setCoverLetter(cover);
  }

  const handleDownload = async (type) => {    
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml+document.getElementById(type).innerHTML+postHtml;
    
    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });

    saveAs(blob, `${name}-${employer}-${type}-${new Date().toLocaleDateString()}.doc`);
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
      "Employer": setEmployer
    }

    if (label === "Work Experience") {
      const newExperiences = [...experiences];
      newExperiences[0] = e.target.value;
      setExperiences(newExperiences);
    } else {
      labelMapping[label](e.target.value);
    }
  }

  const handleExperienceChange = (e, id) => {
    const newExperiences = [...experiences];
    newExperiences[id] = e.target.value;
    setExperiences(newExperiences);
  }

  const addExperience = () => {
    const newExperiences = [...experiences];
    newExperiences.push("");
    setExperiences(newExperiences);
  }

  const removeExperience = (id) => {
    const newExperiences = [...experiences];
    newExperiences.splice(id, 1);
    setExperiences(newExperiences);
  }

  return (
    <div className="m-10">
      <header className="flex flex-col gap-3">
        <div className="flex justify-between">
          <Input onChange={handleInputChange} label="Name" placeholder="Name"/>
          <Input onChange={handleInputChange} label="Job" placeholder="Desired Job"/>
          <Input onChange={handleInputChange} label="Employer" placeholder="Employer"/>
          <div className="flex flex-col gap-2">
            <Input onChange={handleInputChange} label="Work Experience" placeholder="Work Experience"/>
            {experiences?.length > 1 && 
              experiences.map((experience, id) => {
                if (id == 0) return;  
                return (
                  <div className="flex gap-2">
                    <EditInput onChange={handleExperienceChange} value={experience} placeholder="Work Experience" id={id} />
                    <FontAwesomeIcon className="cursor-pointer h-8" onClick={() => removeExperience(id)} icon={faTrash} />
                  </div>
                );
              })}
            <Button onClick={() => addExperience()}>Add Experience</Button>
          </div>        
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10 mt-8" onClick={() => fetchData()}>Generate</Button>
        </div>
        
        {coverLetter && <div>
          <div className="flex justify-between mb-3">
            <h2>Cover Letter:</h2>
            <FontAwesomeIcon size="xl" className="cursor-pointer" onClick={() => handleDownload('cover-letter')} icon={faDownload} />
          </div>
          <div id="cover-letter" className="border-black border-2 border-black px-10 py-5 whitespace-pre-wrap">
            {coverLetter}
          </div>
        </div>}  

        {resumeData && <div>
          <div className="flex justify-between mb-3">
            <h2>Resume:</h2>
            <FontAwesomeIcon size="xl" className="cursor-pointer" onClick={() => handleDownload('resume')} icon={faDownload} />
          </div>
          <div id="resume" className="border-2 border-black px-10 py-5 flex flex-col gap-4">
            <h1 className="text-center">{name}</h1>
            <ContactInfo />
            <Summary summary={resumeData["Summary of Qualifications"]}/>
            <Skills skills={resumeData["Skills"]}/>
            <Experience experience={resumeData["Work Experience"]}/>
          </div>
        </div>}
      </header>
    </div>
  );
}

export default App;
