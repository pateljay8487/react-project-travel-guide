// import React from 'react';
import './LocalTransportation.css';
// const LocalTransportation: React.FC = () => {
//   // Define your local transportation options here
//   const transportationOptions = [
//     { name: 'Public Transit', description: 'Take the subway or bus to get around the city.' },
//     { name: 'Taxi Service', description: 'Hail a taxi or use a ride-hailing app like Uber or Lyft.' },
//     { name: 'Car Rental', description: 'Rent a car to have more flexibility and independence.' },
//     { name: 'Ride-sharing', description: 'Use ride-sharing services like Uber or Lyft for convenient transportation.' },
//   ];

//   return (
//     <div>
//       <h2>Local Transportation</h2>
//       {transportationOptions.map(option => (
//         <div key={option.name}>
//           <h3>{option.name}</h3>
//           <p>{option.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LocalTransportation;



import React, { useState } from 'react';

interface TransportationOption {
  name: string;
  description: string;
  icon: string;
}

const LocalTransportation: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [transportationOptions, setTransportationOptions] = useState<TransportationOption[]>([]);

  const handleOriginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrigin(event.target.value);
  };

  const handleDestinationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
  };

  const handleSearch = () => {
    // Custom logic to provide transportation options based on the selected locations
    const options: TransportationOption[] = [];
  
    if (origin === 'New York' && destination === 'Los Angeles') {
      options.push(
        {
          name: 'Flight',
          description: 'Fly from New York to Los Angeles with major airlines.',
          icon: '/icons/flight.png',
        },
        {
          name: 'Train',
          description: 'Take a cross-country train journey from New York to Los Angeles.',
          icon: '/icons/train.png',
        }
      );
    } else if (origin === 'London' && destination === 'Paris') {
      options.push(
        {
          name: 'Eurostar',
          description: 'Travel between London and Paris via the high-speed Eurostar train.',
          icon: '/icons/eurostar.png',
        },
        {
          name: 'Ferry',
          description: 'Enjoy a scenic ferry ride across the English Channel.',
          icon: '/icons/ferry.png',
        }
      );
    } else {
      options.push(
        {
          name: 'Bus',
          description: 'Travel by bus between the selected locations.',
          icon: '/icons/bus.png',
        },
        {
          name: 'Car Rental',
          description: 'Rent a car and drive from the origin to the destination.',
          icon: '/icons/car-rental.png',
        }
      );
    }
  
    setTransportationOptions(options);
  };
  return (
    <div>
      <h2>Local Transportation</h2>
      <div>
        <label htmlFor="originInput">Origin: </label>
        <input id="originInput" type="text" value={origin} onChange={handleOriginChange} />
      </div>
      <div>
        <label htmlFor="destinationInput">Destination: </label>
        <input id="destinationInput" type="text" value={destination} onChange={handleDestinationChange} />
      </div>
      <button onClick={handleSearch}>Search</button>
      {transportationOptions.map(option => (
        <div key={option.name}>
          <h3>{option.name}</h3>
          <p>{option.description}</p>
          <img src={option.icon} alt={option.name} />
        </div>
      ))}
    </div>
  );
};

export default LocalTransportation;  