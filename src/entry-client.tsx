import '@vitejs/plugin-react/preamble';
import { hydrateRoot } from 'react-dom/client';
import { Router } from './router.tsx';

/** State from server. */
const state = window.__STATE__;

hydrateRoot(document.querySelector('#app')!, <Router {...state} />);
