// openai.js


import { OpenAIApi } from 'openai';

const apiKey = process.env.OPENAI_API_KEY;
console.log('API Key:', apiKey); // Logging for API key

const openai = new OpenAIApi({ key: apiKey, version: 'v1' });

export async function sendMsgToOpenAI(input) {
  try {
    const response = await openai.axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'text-embedding-ada-002',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: input },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    console.log(response.data.choices[0].message.content);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Authentication error. Check your API key and permissions.');
    } else {
      console.error('Error calling OpenAI API:', error);
    }
  }
}
