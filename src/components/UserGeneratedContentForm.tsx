import React, { useState } from 'react';
import axios from 'axios';

interface UserSubmissionFormProps {
  onSubmission: (hotel: string, userName: string, description: string) => void;
}

const UserSubmissionForm: React.FC<UserSubmissionFormProps> = ({
  onSubmission,
}) => {
  const [hotel, setHotel] = useState("");
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmission(hotel, userName, description);
    setHotel("");
    setUserName("");
    setDescription("");
  };
  ///


  return (
    <form onSubmit={handleSubmit} >
      <h3>Submit Your Content</h3>
      <div>
        <label htmlFor="hotel">Hotel:</label>
        <input
          type="text"
          id="hotel"
          value={hotel}
          onChange={(event) => setHotel(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="userName">User Name:</label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserSubmissionForm;








