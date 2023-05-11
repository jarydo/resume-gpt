import axios from 'axios';

const endpoint = 'https://api.openai.com/v1/completions';
const config = {
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
    }
}

export const getResume = async (job, education, experiences) => {
    const body = {
        "model": "text-davinci-003",
        "prompt": `Generate a standout resume for a ${job} who studied ${education} with the following experience: ${experiences.toString()}. 
        Create Summary of Qualifications, Work Experience, Extracurriculars, Education, and Skill section formatted as a JSON object. 
        For each Work Experience and Extracurricular, create 3 unique, detailed points using action words in an array. The object should look as follows: 
        {
            "Summary of Qualifications": [""],
            "Skills": {
                "Category": [""]
            },
            "Work Experience": {
                "Company 1 - Position": [""]
            },
            "Extracurriculars": {
                "Activity": [""]
            },
            "Education": ""
        }`,
        "max_tokens": 1000,
        "temperature": 0
    }
    const response = await axios.post(endpoint, body, config);
    return JSON.parse(response.data.choices[0].text);
}

export const getCoverLetter = async (name, job, education, experiences, employer) => {
    const body = {
        "model": "text-davinci-003",
        "prompt": `My name is ${name}. Generate a unique, standout cover letter for a ${job} ${employer ? `at ${employer}` : "" } who studied ${education} with the following experience: ${experiences.toString()}.`,
        "max_tokens": 1000,
        "temperature": 0
    }
    const response = await axios.post(endpoint, body, config);
    return response.data.choices[0].text;
}