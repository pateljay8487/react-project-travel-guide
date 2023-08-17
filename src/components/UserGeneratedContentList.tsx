import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import "./UserGeneratedContentList.css";
import UserSubmissionForm from "./UserGeneratedContentForm";

interface Submission {
  id: string;
  hotel: string;
  userName: string;
  date: string;
  description: string;
}

const UserGeneratedContentList: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: "1",
      hotel: "Westin Hotels & Resorts",
      userName: "John",
      date: "2023-06-18",
      description:
        "Hello everyone My family and I had dine-in at the restaurant last Saturday because it was my parents marriage anniversary (Jan 28). The food was awesome especially Boss sandwich. The only thing I would recommend is that the plates were small so maybe next time, please give us bigger plates so than more food can be covered. Other than that, my family and I enjoyed everything and we hope to come back again!",
    },
    {
      id: "2",
      hotel: "My Holiday",
      userName: "Jane",
      date: "2023-06-19",
      description:
        "Its near to home walking distance😎😎Paav Bhaji was amazingg very nice taste..Manchurian was delicious .. Veg Grill Cheese sandwich We missed cheese...Nevertheless Everything is very good delicious pure Gujarati Taste.. Love it ❤️❤️❤️ thanks for bringing the taste",
    },
  ]);

  const handleSubmission = (
    hotel: string,
    userName: string,
    description: string
  ) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString(); // Format the date as a string

    const newSubmission: Submission = {
      id: Date.now().toString(),
      hotel,
      userName,
      date: formattedDate,
      description,
    };
    setSubmissions([...submissions, newSubmission]);
  };

  const formatSubmissionDate = (date: string): string => {
    const currentDate = new Date();
    const submissionDate = new Date(date);
    const distance = formatDistanceToNow(submissionDate, { addSuffix: true });
    return distance;
  };

  return (
    <div>
      {submissions.map((submission) => (
        <div key={submission.id}>
          <h2>{submission.hotel}</h2>
          <p>{submission.userName}</p>
          <p>Time: {formatSubmissionDate(submission.date)}</p>
          <p>{submission.description}</p>
          <hr />
        </div>
      ))}
      <UserSubmissionForm onSubmission={handleSubmission} />
    </div>
  );
};
export default UserGeneratedContentList;
