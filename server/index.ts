import express from 'express';
import cors from 'cors';
import routes from './routes';
import { setupVite } from './vite';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API routes
app.use(routes);

// Setup Vite for development
setupVite(app);

app.listen(port, '0.0.0.0', () => {
  console.log(`🌸 Kawaii Bot Dashboard running on port ${port} uwu *happy*`);
  console.log('💫 *susurra* Ready to manage your cute Discord bot~');
});
