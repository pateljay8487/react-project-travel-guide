import React, { useState } from "react";
import "./Booking.css"; // Import the CSS file if using an external file

interface HotelOption {
  name: string;
  price: number;
  description: string;
}

interface TourOption {
  name: string;
  price: number;
  description: string;
}

interface TicketOption {
  name: string;
  price: number;
  description: string;
}

interface BookingData {
  hotel: HotelOption;
  tour: TourOption;
  ticket: TicketOption;
}

const BookingApp: React.FC = () => {
  const [bookingData, setBookingData] = useState<BookingData>({
    hotel: { name: "", price: 0, description: "" },
    tour: { name: "", price: 0, description: "" },
    ticket: { name: "", price: 0, description: "" }
  });

  const [bookingCart, setBookingCart] = useState<BookingData[]>([]);

  const handleBooking = () => {
    // Perform API call or integration with external booking platform
    // Use the bookingData state to send the selected options

    // Assuming you have an API call or integration here
    // You can use the bookingData state to send the selected options

    // Add the current bookingData to the bookingCart
    setBookingCart([...bookingCart, bookingData]);

    // Clear the bookingData
    setBookingData({
      hotel: { name: "", price: 0, description: "" },
      tour: { name: "", price: 0, description: "" },
      ticket: { name: "", price: 0, description: "" }
    });
  };

  const handleSelection = (
    type: keyof BookingData,
    option: HotelOption | TourOption | TicketOption
  ) => {
    setBookingData({ ...bookingData, [type]: option });
  };

  const handleCheckout = () => {
    // Perform any necessary checkout logic or API calls

    // Calculate the total price
    const totalPrice = bookingCart.reduce(
      (acc, booking) =>
        acc +
        booking.hotel.price +
        booking.tour.price +
        booking.ticket.price,
      0
    );

    // Redirect to the checkout page with the total price
    window.location.href = `https://example.com/checkout?totalPrice=${totalPrice}`;
  };

  const hotels: HotelOption[] = [
    {
      name: "Grand Hotel",
      price: 300,
      description: "Luxurious hotel with stunning views"
    },
    {
      name: "Beach Resort",
      price: 200,
      description: "Relaxing resort located on a beautiful beach"
    },
    {
      name: "City Center Hotel",
      price: 150,
      description: "Conveniently located hotel in the heart of the city"
    },
    {
      name: "Mountain Lodge",
      price: 250,
      description: "Cozy lodge nestled in the mountains"
    }
  ];

  const tours: TourOption[] = [
    {
      name: "Historical Walking Tour",
      price: 50,
      description: "Explore the rich history of the city with a guided walking tour"
    },
    {
      name: "Adventure Excursion",
      price: 100,
      description: "Embark on an adrenaline-pumping adventure through the wilderness"
    },
    {
      name: "Cultural Heritage Tour",
      price: 75,
      description: "Immerse yourself in the local culture and traditions"
    },
    {
      name: "Wine Tasting Tour",
      price: 80,
      description: "Indulge in a delightful tour of local wineries and vineyards"
    }
  ];

  const tickets: TicketOption[] = [
    {
      name: "Museum Pass",
      price: 30,
      description: "Access to top museums and cultural attractions"
    },
    {
      name: "Theme Park Ticket",
      price: 70,
      description: "Experience thrilling rides and entertainment at the theme park"
    },
    {
      name: "Concert Admission",
      price: 60,
      description: "Enjoy live music performances by renowned artists"
    },
    {
      name: "Sports Event Ticket",
      price: 50,
      description: "Cheer for your favorite team at an exciting sports event"
    }
  ];

  return (
    <div>
      <h1>Travel Booking App</h1>
      <h2>Make a Booking</h2>
      <div>
        <h3>Select a Hotel:</h3>
        <div className="card-container">
          {hotels.map((hotel) => (
            <div
              key={hotel.name}
              className={`card ${
                bookingData.hotel.name === hotel.name ? "selected" : ""
              }`}
              onClick={() => handleSelection("hotel", hotel)}
            >
              <h4>{hotel.name}</h4>
              <p>{hotel.description}</p>
              <p>Price: ${hotel.price}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3>Select a Tour:</h3>
        <div className="card-container">
          {tours.map((tour) => (
            <div
              key={tour.name}
              className={`card ${
                bookingData.tour.name === tour.name ? "selected" : ""
              }`}
              onClick={() => handleSelection("tour", tour)}
            >
              <h4>{tour.name}</h4>
              <p>{tour.description}</p>
              <p>Price: ${tour.price}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3>Select a Ticket:</h3>
        <div className="card-container">
          {tickets.map((ticket) => (
            <div
              key={ticket.name}
              className={`card ${
                bookingData.ticket.name === ticket.name ? "selected" : ""
              }`}
              onClick={() => handleSelection("ticket", ticket)}
            >
              <h4>{ticket.name}</h4>
              <p>{ticket.description}</p>
              <p>Price: ${ticket.price}</p>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleBooking}>Add to Cart</button>
      <div>
        <h3>Booking Cart:</h3>
        {bookingCart.map((booking, index) => (
          <div key={index}>
            <p>Hotel: {booking.hotel.name}</p>
            <p>Tour: {booking.tour.name}</p>
            <p>Ticket: {booking.ticket.name}</p>
            <p>
              Total Price: $
              {booking.hotel.price +
                booking.tour.price +
                booking.ticket.price}
            </p>
          </div>
        ))}
        {bookingCart.length > 0 && (
          <div>
            <p>
              Total: $
              {bookingCart.reduce(
                (acc, booking) =>
                  acc +
                  booking.hotel.price +
                  booking.tour.price +
                  booking.ticket.price,
                0
              )}
            </p>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingApp;
