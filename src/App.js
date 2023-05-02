/**
 * Built by Sam Ayoub, Reallexi.com
 * https://github.com/melayyoub
 * https://apidocpro.com
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import EditorApp from './components/EditorApp';

export default function App() {
  const [progress, setProgress] = useState(0);
  return (
    <>
      <div id="App" className="d-block">
        <Router>
          <LoadingBar height={3} color="#f11946" progress={progress} />
          <NavBar />
          <Routes>
            <Route exact path="/" element={<EditorApp setProgress={setProgress} />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}
