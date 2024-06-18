import dotenv from "dotenv"
dotenv.config()
import axios from "axios"

const apiKey = process.env.OPENAI_API_KEY;

export const getChatGPTResponse = async(prompt) => {
    const url = 'https://api.openai.com/v1/chat/completions';
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

    const data = {
        model: 'gpt-3.5-turbo', // Or another model if needed
        messages: [{ role: 'user', content: prompt }]
    };

    try {
        const response = await axios.post(url, data, { headers });
        const message = response.data.choices[0].message.content;
        return message;
    } catch (error) {
        console.error('Error fetching ChatGPT response:', error);
        throw error;
    }
}

// Example usage
const prompt = "Hello, how are you?";
getChatGPTResponse(prompt)
    .then(response => console.log('ChatGPT Response:', response))
    .catch(error => console.error('Error:', error));
