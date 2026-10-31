import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { TermsOfService } from './pages/TermsOfService.tsx';
import { PrivacyPolicy } from './pages/PrivacyPolicy.tsx';

function RootRouter() {
  const path = window.location.pathname.toLowerCase();

  if (path.includes('terms')) {
    return <TermsOfService />;
  }

  if (path.includes('privacy')) {
    return <PrivacyPolicy />;
  }

  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootRouter />
  </StrictMode>,
);
