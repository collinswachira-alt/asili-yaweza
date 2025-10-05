import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AsiliCampaignSite from './AsiliCampaignSite';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AsiliCampaignSite />
  </StrictMode>,
)
