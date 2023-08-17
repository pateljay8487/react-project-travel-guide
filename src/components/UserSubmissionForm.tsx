import React, { useState } from "react";

const UserSubmissionForm: React.FC = () => {
  const [submission, setSubmission] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmission("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSubmission(event.target.value);
  };

  return (
    <div>
      <h2>User Submission Form</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={submission}
          onChange={handleChange}
          placeholder="Write your submission..."
          rows={5}
          cols={40}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserSubmissionForm;
