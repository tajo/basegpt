import express from 'express';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

const app = express();

app.get('/', async (req, res) => {
    try {
        const res = await openai.createCompletion({
            model: "gpt-4",
            prompt: "It was the best of times",
            max_tokens: 100,
            temperature: 0,
            stream: true,
        }, { responseType: 'stream' });
        
        res.data.on('data', data => {
            const lines = data.toString().split('\n').filter(line => line.trim() !== '');
            for (const line of lines) {
                const message = line.replace(/^data: /, '');
                if (message === '[DONE]') {
                    return; // Stream finished
                }
                try {
                    const parsed = JSON.parse(message);
                    console.log(parsed.choices[0].text);
                } catch(error) {
                    console.error('Could not JSON parse stream message', message, error);
                }
            }
        });
    } catch (error) {
        if (error.response?.status) {
            console.error(error.response.status, error.message);
            error.response.data.on('data', data => {
                const message = data.toString();
                try {
                    const parsed = JSON.parse(message);
                    console.error('An error occurred during OpenAI request: ', parsed);
                } catch(error) {
                    console.error('An error occurred during OpenAI request: ', message);
                }
            });
        } else {
            console.error('An error occurred during OpenAI request', error);
        }
    }
})

app.listen(3000);

export const viteNodeApp = app;