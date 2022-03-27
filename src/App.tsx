import React from 'react';
import { ToastContainer, ToastOptions } from 'react-toastify';

import { TasksPage } from './pages';

const toastifyOptions = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
} as ToastOptions;

function App() {
  return (
    <>
      <TasksPage />
      <ToastContainer {...toastifyOptions} />
    </>
  );
}

export default App;
