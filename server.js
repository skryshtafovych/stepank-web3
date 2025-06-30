import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3001;

if (!process.env.GEMINI_API_KEY) {
  console.error('FATAL ERROR: GEMINI_API_KEY is not defined in your .env file.');
  process.exit(1); // Stop the server
}

app.use(cors());
app.use(express.json());

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'dist')));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/rewrite', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).send('No text provided');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
    const prompt = `Rewrite the following text in a more creative and engaging way: "${text}"`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rewrittenText = await response.text();
    
    res.json({ rewrittenText });
  } catch (error) {
    console.error('Error rewriting text:', error);
    res.status(500).send('Failed to rewrite text');
  }
});

// The "catchall" handler: for any request that doesn't match one above,
// send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
}); 