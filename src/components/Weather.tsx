import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Weather.css";

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cityName, setCityName] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = '7afba5215327c7e8dca5b8ef371e2832';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

      try {
        const response = await axios.get(url);
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [cityName]);

  const handleSave = async () => {
    // console.log('Save function entered');
    if (!weatherData) {
      return;
    }

    try {
      // console.log('try block  entered');
      await axios.post('http://localhost:5500/api/login/weatherData', {
        city: weatherData.name,
        temperature: weatherData.main.temp,
        description: weatherData.weather[0].description,
      });
      console.log('Weather data saved successfully');
    } catch (error) {
      console.error('Error saving weather data:', error);
    }
  };

  return (
    <div className="Text-align-at-center" >
      <p className= "entercityname"> Enter The City Name - </p> 
      <input
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        placeholder="City Name"
      />
      <br/>
      {loading ? (
        <div>Loading...</div>
      ) : !weatherData ? (
        <div className='Red-Color'><br/>Error Loading Weather Data!!</div>
      ) : (
        <div className='Display'>
          <h2>Weather Information For {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <button onClick={handleSave}>Save Weather Data</button>
        </div>
      )}
    </div>
  );
};

export default Weather;




































































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "./Weather.css";

// const Weather: React.FC = () => {
//   const [weatherData, setWeatherData] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [cityName, setCityName] = useState<string>('');

//   useEffect(() => {
//     const fetchData = async () => {
//       const apiKey = '7afba5215327c7e8dca5b8ef371e2832';
//       const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

//       try {
//         const response = await axios.get(url);
//         setWeatherData(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching weather data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [cityName]);

//   const handleSave = async () => {
//     if (!weatherData) {
//       return;
//     }

//     try {
//       await axios.post('http://localhost:5000/api/login', {
//         city: weatherData.name,
//         temperature: weatherData.main.temp,
//         description: weatherData.weather[0].description,
//       });
//       console.log('Weather data saved successfully');
//     } catch (error) {
//       console.error('Error saving weather data:', error);
//     }
//   };

//   return (
//     <div>
//       <p> Enter The City Name - </p> 
//       <input
//         type="text"
//         value={cityName}
//         onChange={(e) => setCityName(e.target.value)}
//         placeholder="City Name"
//       />
//       {loading ? (
//         <div>Loading...</div>
//       ) : !weatherData ? (
//         <div>Error loading weather data.</div>
//       ) : (
//         <div>
//           <h2>Weather Information for {weatherData.name}</h2>
//           <p>Temperature: {weatherData.main.temp}°C</p>
//           <p>Description: {weatherData.weather[0].description}</p>
//           <button onClick={handleSave}>Save Weather Data</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Weather;