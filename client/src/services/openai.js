import axios from 'axios';

const endpoint = 'https://api.openai.com/v1/completions';
const config = {
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
    }
}
const getReqBody = (section, additionalInfo="") => {
    return {
        "model": "text-davinci-003",
        "prompt": "Generate a " + section + " for a resume, 3 bullet points " + additionalInfo,
        "max_tokens": 100,
        "temperature": 0
    }
}

const getSummaryReqBody = (job, experience) => {
    return {
        "model": "text-davinci-003",
        "prompt": `Generate a standout resume for a ${job} with the following experience: ${experience.toString()}. 
        Create Summary of Qualifications, Work Experience, and Skill section formatted as a JSON object. For each Work Experience, create 3 points in an array. The object should look as follows: 
        {
            "Summary of Qualifications": [""],
            "Skills": {
                "Category": [""]
            },
            "Work Experience": {
                "Company 1 - Position": [""]
            }
        }`,
        "max_tokens": 1000,
        "temperature": 0
    }

    // {
    //     "Summary of Qualifications": [""],
    //     "Skills": [""],
    //     "Work Experience": {
    //         "Job 1": [""],
    //         "Job 2": [""]
    //     }
    // }
}

const getCLReqBody = (name, job, experience, employer) => {
    return {
        "model": "text-davinci-003",
        "prompt": `My name is ${name}. Generate a standout cover letter for a ${job} ${employer ? `at ${employer}` : "" } with the following experience: ${experience.toString()}.`,
        "max_tokens": 1000,
        "temperature": 0
    }
}

export const getResume = async (job, experience) => {
    const response = await axios.post(endpoint, getSummaryReqBody(job, experience), config);
    return JSON.parse(response.data.choices[0].text);
}

export const getCoverLetter = async (name, job, experience, employer) => {
    const response = await axios.post(endpoint, getCLReqBody(name, job, experience, employer), config);
    return response.data.choices[0].text;
}

export const getSummaryOfQualifications = async () => {
    const response = await axios.post(endpoint, getReqBody("summary of qualifications"), config);
    return response.data.choices[0].text;
}

export const getWorkExperience = async () => {
    const response = await axios.post(endpoint, getReqBody("work experience", "with experience as a junior fullstack web developer at Arctic AI. Formatted as <ul>"), config);
    return response.data.choices[0].text;
}

export const getEducation = async () => {
    const response = await axios.post(endpoint, getReqBody("eduction"), config);
    return response.data.choices[0].text;
}

export const getExtracurriculars = async () => {
    const response = await axios.post(endpoint, getReqBody("extracurriculars"), config);
    return response.data.choices[0].text;
}

export const getSkills = async () => {
    const response = await axios.post(endpoint, getReqBody("skills"), config);
    return response.data.choices[0].text;
}