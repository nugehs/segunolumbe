import { renderToString } from 'react-dom/server';
import App from './App';

export { allPaths, NOT_FOUND_PATH, resolveRoute } from './routes';
export { applyHead, headFor, SITE_URL } from './head';

export function render(path: string): string {
  return renderToString(<App initialPath={path} />);
}
