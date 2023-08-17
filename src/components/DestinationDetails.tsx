import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./DestinationDetails.css";

interface Rating {
  rating: number;
  review: string;
}

interface Attraction {
  name: string;
  image: string;
  latitude: number;
  longitude: number;
  description: string;
  ratings: Rating[];
}

interface Location {
  name: string;
  image: string;
  description: string;
  province: string;
  latitude: number;
  longitude: number;
  attractions: Attraction[];
}

interface ReviewPopupProps {
  ratings: Rating[];
  onClose: () => void;
}

const ReviewPopup: React.FC<ReviewPopupProps> = ({ ratings, onClose }) => (
  <div className="review-popup">
    <div className="review-popup-content">
      <h3>Reviews</h3>
      {ratings.map((rating: Rating, index: number) => (
        <div key={index} className="rating">
          <span className="rating-stars">{'★'.repeat(Math.round(rating.rating))}</span>
          <p>{rating.review}</p>
        </div>
      ))}
      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  </div>
);

// ...

const DestinationDetails: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [showReviews, setShowReviews] = useState<boolean>(false);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [destinationsData, setDestinationData] = useState<Location[] | null>(null);

  useEffect(() => {
    const fetchDestinationsData = async () => {
      try {
        const response = await axios.get<Location[]>('http://localhost:5500/api/login/locations');
        setDestinationData(response.data);
      } catch (error) {
        console.error('Error fetching destinations data:', error);
      }
    };

    fetchDestinationsData();
  }, []);

  const handleSelectDestination = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDestination(event.target.value);
  };

  const selectedDestinationData = destinationsData?.find(
    (location: Location) => location.name === selectedDestination
  );

  const handleAttractionMapClick = (latitude: number, longitude: number) => {
    window.open(`https://maps.google.com/maps?q=${latitude},${longitude}`, '_blank');
  };

  const handleDestinationMapClick = () => {
    if (selectedDestinationData) {
      const { latitude, longitude } = selectedDestinationData;
      window.open(`https://maps.google.com/maps?q=${latitude},${longitude}`, '_blank');
    }
  };

  const handleShowReviews = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    setShowReviews(true);
  };

  const handleCloseReviews = () => {
    setShowReviews(false);
    setSelectedAttraction(null);
  };

  return (
    <div className="destination-details-container">
      <h1>Select a Destination:</h1>
      <select className="destination-select" value={selectedDestination} onChange={handleSelectDestination}>
        <option value="">Select Destination</option>
        {destinationsData?.map((location: Location) => (
          <option key={location.name} value={location.name}>
            {location.name}
          </option>
        ))}
      </select>

      {selectedDestinationData && (
        <div className="destination-details">
          <h2>{selectedDestinationData.name}</h2>
          <img className="destination-image" src={selectedDestinationData.image} alt={selectedDestinationData.name} />
          <p>{selectedDestinationData.description}</p>
          <p>Province: {selectedDestinationData.province}</p>

          <div className="map-button-container">
            <button className="map-button" onClick={handleDestinationMapClick}>
              View on Map
            </button>
          </div>
          <h3>Main Attractions:</h3>
          <div className="attraction-list">
            {selectedDestinationData.attractions.map((attraction: Attraction) => (
              <div key={attraction.name} className="attraction-card">
                <img className="attraction-image" src={attraction.image} alt={attraction.name} />
                <div className="attraction-info">
                  <h4>{attraction.name}</h4>
                  <p>{attraction.description}</p>
                  <div className="rating-container">
                    <span className="average-rating-stars">
                      {'★'.repeat(Math.round(attraction.ratings.reduce((sum, rating) => sum + rating.rating, 0) / attraction.ratings.length))}
                    </span>
                    <button className="reviews-button" onClick={() => handleShowReviews(attraction)}>
                      Reviews ({attraction.ratings.length})
                    </button>
                  </div>
                  <button
                    className="map-button"
                    onClick={() => handleAttractionMapClick(attraction.latitude, attraction.longitude)}
                  >
                    View on Map
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showReviews && selectedAttraction && (
        <ReviewPopup ratings={selectedAttraction.ratings} onClose={handleCloseReviews} />
      )}
    </div>
  );
};

export default DestinationDetails;
