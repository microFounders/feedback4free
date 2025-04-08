import React from "react";

interface FeedbackComponentProps {
  onSubmit: (feedback: string) => void;
}

const FeedbackComponent: React.FC<FeedbackComponentProps> = ({ onSubmit }) => {
  const [feedback, setFeedback] = React.useState("");

  const handleSubmit = () => {
    onSubmit(feedback);
    setFeedback("");
  };

  return (
    <div>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Enter your feedback"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FeedbackComponent;
