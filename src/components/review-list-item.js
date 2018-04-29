import React from "react";

const mkDate = reviewDate => {
  const date = new Date(reviewDate);
  return date.toLocaleDateString();
};

export const ReviewListItem = review => {
  const rev = review.review;
  return (
    <div className="p-2">
      <h5 className="d-inline">{rev.title}</h5>
      <span className="text-gray text-italic"> - {mkDate(rev.date)}</span>
      <p>{rev.comment}</p>
    </div>
  );
};
