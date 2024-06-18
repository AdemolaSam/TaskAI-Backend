import {getChatGPTResponse} from "../services/ai.service.js"

export const testAI = async(req, res) => {
   
        getChatGPTResponse(prompt)
        .then(response => console.log('ChatGPT Response:', response))
        .catch(error => console.error('Error:', error));
}