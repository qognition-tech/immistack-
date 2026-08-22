import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './styles/index.css';

// vite-react-ssg controls hydration on the client and static rendering at build.
export const createRoot = ViteReactSSG({ routes });
