import './App.css';
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import { saveAs } from 'file-saver';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getResume, getCoverLetter } from './services/openai';
import { Button, Input, Experience, Skills, Summary, Extracurriculars, ContactInfo, Education } from './components';
import { EditInput } from './components/Input/EditInput';

function App() {
  const [name, setName] = useState();
  const [job, setJob] = useState();
  const [employer, setEmployer] = useState();
  const [experiences, setExperiences] = useState([""]);
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [linkedin, setLinkedin] = useState();
  const [github, setGithub] = useState();
  const [education, setEducation] = useState();

  const [resumeData, setResumeData] = useState();
  const [coverLetter, setCoverLetter] = useState();

  const fetchData = async () => {
    const toastId = toast.loading("Generating...");
    try {
      const resume = await getResume(job, education, experiences);
      const cover = await getCoverLetter(name, job, education, experiences, employer);
      toast.update(toastId, { render: "Success!", type: toast.TYPE.SUCCESS, autoClose: 2000, closeButton: true, isLoading: false });
      setResumeData(resume);
      setCoverLetter(cover);
    } catch (e) {
      toast.update(toastId, { render: "Error: " + e, type: toast.TYPE.ERROR, autoClose: 10000, closeButton: true, isLoading: false });
    }
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

  const handleInputChange = (e, label) => {
    const labelMapping = {
      "Name": setName,
      "Job": setJob,
      "Employer": setEmployer,
      "Email": setEmail,
      "Phone Number": setPhoneNumber,
      "LinkedIn": setLinkedin,
      "Github": setGithub,
      "Education": setEducation
    }

    if (label === "Experience") {
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
        <div className="grid grid-cols-5 mb-5">
          <h2 className="mt-8">Contact Info (Optional):</h2>
          <Input onChange={handleInputChange} label="Email" placeholder="Email"/>
          <Input onChange={handleInputChange} label="Phone Number" placeholder="Phone Number"/>
          <Input onChange={handleInputChange} label="LinkedIn" placeholder="LinkedIn"/>
          <Input onChange={handleInputChange} label="Github" placeholder="Github"/>
        </div>
        <div className="grid grid-cols-5">
          <Input onChange={handleInputChange} label="Name" placeholder="Name"/>
          <Input onChange={handleInputChange} label="Job" placeholder="Desired Job"/>
          <Input onChange={handleInputChange} label="Employer" placeholder="Employer"/>
          <Input onChange={handleInputChange} label="Education" placeholder="Education"/>
          <div className="flex flex-col gap-2">
            {experiences.map((experience, id) => {
                if (id == 0) {
                  return <EditInput label="Experience" onChange={handleExperienceChange} value={experience} placeholder="Work/Extracurricular Experience" id={id}/>
                } else {
                  return (
                    <div className="flex gap-2">
                      <EditInput onChange={handleExperienceChange} value={experience} placeholder="Work/Extracurricular Experience" id={id} />
                      <FontAwesomeIcon className="cursor-pointer h-8" onClick={() => removeExperience(id)} icon={faTrash} />
                    </div>
                  );
                }  
              })}
            <Button onClick={() => addExperience()}>Add Experience</Button>
          </div>        
        </div>
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10 mt-4 self-end" onClick={() => fetchData()}>Generate</Button>
        
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
            <ContactInfo email={email} number={phoneNumber} linkedin={linkedin} github={github}/>
            <Summary summary={resumeData["Summary of Qualifications"]}/>
            <Skills skills={resumeData["Skills"]}/>
            <Experience experience={resumeData["Work Experience"]}/>
            <Education education={resumeData["Education"]}/>
            <Extracurriculars extracurriculars={resumeData["Extracurriculars"]}/>
          </div>
        </div>}
      </header>
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
}

export default App;
