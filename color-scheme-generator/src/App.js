import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import StartPage from './pages/Upload/Start';
import Select1Page from './pages/Upload/Select1';
import Select2Page from './pages/Upload/Select2';
import UploadPage from './pages/Upload/Upload';
import ResultsPage from './pages/Results';
import LoadingPage from './pages/Loading';
import ViewDetails from './pages/ViewDetails';
import ModifyScheme from './pages/ModifyScheme';
import EditColor from './pages/EditColor';
import SelectedPage from './pages/Selected';


function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Route path="/" exact>
            <StartPage />
          </Route>
          <Route path="/select1">
            <Select1Page />
          </Route>
          <Route path="/select2">
            <Select2Page />
          </Route>
          <Route path="/upload">
            <UploadPage />
          </Route>
          <Route path="/loading">
            <LoadingPage />
          </Route>
          <Route path="/results">
            <ResultsPage />
          </Route>
          <Route path="/selected">
            <SelectedPage />
          </Route>
          <Route path="/details">
            <ViewDetails />
          </Route>
          <Route path="/modify">
            <ModifyScheme />
          </Route>
          <Route path="/edit">
            <EditColor />
          </Route>
        </header>
      </Router>
    </div>
  );
}

export default App;
