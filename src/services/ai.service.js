import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

const apiKey = process.env.OPENAI_API_KEY;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getChatGPTResponse = async (prompt, retries = 3, delay = 1000) => {
    const url = 'https://api.openai.com/v1/chat/completions';
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

    const data = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }]
    };

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await axios.post(url, data, { headers });
            const message = response.data.choices[0].message.content;
            return message;
        } catch (error) {
            if (error.response && error.response.status === 429 && attempt < retries) {
                const retryAfter = error.response.headers['retry-after'];
                const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : delay * attempt;
                console.warn(`Rate limit exceeded. Retrying in ${waitTime}ms...`);
                await sleep(waitTime);
            } else {
                if (error.response) {
                    console.error('Error Response:', error.response.data);
                    console.error('Status Code:', error.response.status);
                    console.error('Headers:', error.response.headers);
                } else if (error.request) {
                    console.error('Error Request:', error.request);
                } else {
                    console.error('Error Message:', error.message);
                }
                throw error;
            }
        }
    }
};



import { OpenAI } from "openai"

const openai = new OpenAI({
  apiKey: process.env.AIML_KEY,
  baseURL: "https://api.aimlapi.com",
});

export const testAIML = async () => {
  const chatCompletion = await openai.chat.completions.create({
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    messages: [
      { role: "system", content: "You are a travel agent. Be descriptive and helpful" },
      { role: "user", content: "Tell me about San Francisco" }
    ],
    temperature: 0.7,
    max_tokens: 128,
  });
  return {"AI/ML API": chatCompletion.choices[0].message.content}
};



export const generateTasks = async (project, startDate, endDate) => {
    const chatCompletion = await openai.chat.completions.create({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        messages: [
          {
            role: "system",
            content: "You are a project manager. You want to itemize and describe tasks that need to be done in a project. You will be given a start date and a due date. Make sure the tasks are listed in order and also give timeline for completion"
        },
          { role: "user", content: `Break down this project: ${project}. it will start on: ${startDate}, and end on: ${endDate}` }
        ],
        temperature: 0.7,
        max_tokens: 128,
      });
      return {"Result": chatCompletion.choices[0].message.content}
}