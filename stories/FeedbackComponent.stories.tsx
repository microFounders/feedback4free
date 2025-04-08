import React from "react";
import FeedbackComponent from "../src/FeedbackComponent";

export default {
  title: "FeedbackComponent",
  component: FeedbackComponent,
};

export const Default = () => (
  <FeedbackComponent onSubmit={(feedback) => alert(`Feedback: ${feedback}`)} />
);
