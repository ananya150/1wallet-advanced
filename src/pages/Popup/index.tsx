import React from 'react';
import Popup from './Popup';
import './index.css';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('popup');
  if (container) {
    const root = createRoot(container);
    root.render(
          <Popup />
    );
  }
