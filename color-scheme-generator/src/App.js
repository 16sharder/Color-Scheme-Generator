import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import UploadPage from './pages/Upload';
import ResultsPage from './pages/Results';


function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Route path="/" exact>
            <UploadPage />
          </Route>
          <Route path="/results">
            <ResultsPage />
          </Route>
        </header>
      </Router>
    </div>
  );
}

export default App;
