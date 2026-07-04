import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';

const el = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Prerendered build ships static HTML in #root: hydrate it.
// Dev server ships an empty #root: render normally.
if (el.hasChildNodes()) {
  hydrateRoot(el, app);
} else {
  createRoot(el).render(app);
}
