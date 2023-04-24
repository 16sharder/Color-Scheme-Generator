import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import StartPage from './pages/Start';
import Select1Page from './pages/Select1';
import Select2Page from './pages/Select2';
import UploadPage from './pages/Upload';
import ResultsPage from './pages/Results';
import LoadingPage from './pages/Loading';
import ViewDetails from './pages/ViewDetails';


function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Route path="/" exact>
            <StartPage />
          </Route>
          <Route path="/select1" exact>
            <Select1Page />
          </Route>
          <Route path="/select2" exact>
            <Select2Page />
          </Route>
          <Route path="/upload" exact>
            <UploadPage />
          </Route>
          <Route path="/loading">
            <LoadingPage />
          </Route>
          <Route path="/results">
            <ResultsPage />
          </Route>
          <Route path="/details">
            <ViewDetails />
          </Route>
        </header>
      </Router>
    </div>
  );
}

export default App;
