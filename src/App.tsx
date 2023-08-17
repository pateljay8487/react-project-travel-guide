import React from "react";
// import LoginForm from "./components/LoginForm";
// import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import Home from './components/Home';
import Booking from './components/Booking';
import CurrencyConverter from './components/CurrencyConverter';
import UserGeneratedContentList from './components/UserGeneratedContentList';
import UserSubmissionForm from './components/UserSubmissionForm';
import LocalTransportation from './components/LocalTransportation';
import Weather from './components/Weather';
import Maps from './components/Maps';
import DestinationDetails from "./components/DestinationDetails";

import SocialSharing from "./components/SocialSharing";
// import './LocalTransportation.css';
// import login from './components/Login';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translations from './components/translations';
import Language from './components/Language';
import Login from "./components/Login";
import Register from "./components/Register";
import useTranslation from "./hooks/useTranslation";
import strings from "./lang/Lang";

enum AuthStatus {
  NOT_AUTHENTICATED,
  AUTHENTICATED,
}

const App: React.FC = () => {
  const [authStatus, setAuthStatus] = React.useState<AuthStatus>(
    AuthStatus.NOT_AUTHENTICATED
  );

  const handleLogin = () => {
    // Perform authentication logic here
    // If authentication is successful, update authStatus to AuthStatus.AUTHENTICATED
  };

  const handleLogout = () => {
    // Perform logout logic here
    // Update authStatus to AuthStatus.NOT_AUTHENTICATED
  };

  React.useEffect(() => {
    i18next
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources: translations,
        fallbackLng: 'en',
        debug: true,
      });
  }, []);
	const [lang] = useTranslation()

  return (
    <>
			{strings.setLanguage(lang)}
      <Router>
        <div className="app">
        <Dashboard /> 
          <div className="content" style={{backgroundColor:'#000'}}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/currency-converter" element={<CurrencyConverter />} />
              <Route path="/language" element={<Language />} />
              <Route path="/userGeneratedContentList" element={<UserGeneratedContentList />} />
              <Route path="/userSubmissionForm" element={<UserSubmissionForm />} />
              <Route path="/Booking" element={<Booking/>} />
              <Route path="/Register" element={<Register/>} />
              <Route path="/LocalTransportation" element={<LocalTransportation/>}/>
              <Route path="/Weather" element={<Weather/>}/>
              <Route path="/Maps" element={<Maps/>}/>
              <Route path="/destination-details" element={<DestinationDetails/>}/>
              <Route path="/socialSharing" element={<SocialSharing />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
