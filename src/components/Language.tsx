import React from 'react';
import useTranslation, { Languages } from "../hooks/useTranslation";
import strings from '../lang/Lang';
import languages from "../config/languages";

const Language: React.FC = () => {
  const [language, setLanguage] = useTranslation();
  const selectedLanguage = languages.find((lang) => lang.value === language);

  return (
    <div>
      <h1>{strings.language}</h1>
      <div>
        <label>{strings.select_language}</label>
        <select 
          onChange={async (lang) => setLanguage(lang.target.value as Languages)}
          value={selectedLanguage?.value}
          >
      <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>
    </div>
  );
};

export default Language;

{/* <div>
      <h2>Language</h2>
      <button onClick={() => handleChangeLanguage('en')}>English</button>
      <button onClick={() => handleChangeLanguage('fr')}>French</button>
    </div> */}