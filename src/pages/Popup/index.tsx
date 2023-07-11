import React from 'react';
import Popup from './Popup';
import './index.css';
import { createRoot } from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { MemoryRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import {store} from './store/store';


  const container = document.getElementById('popup');
  if (container) {
    const root = createRoot(container);
    root.render(
      <MemoryRouter>
        <Provider store={store}>
          <Popup />
        </Provider>
      </MemoryRouter>
    );
  }

