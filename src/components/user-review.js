import React from "react";
import {Loading} from "./loading";

const makeSmiles = rating => {
  let smiles = [];
  for (let i = 0; i < rating; i++) {
    smiles.push((<i key={i} className="icon icon-2x icon-emoji m-2"/>));
  }
  return smiles;
};

export const UserReview = ({review, trainee}) => {
  if (!review || !trainee) {
    return <Loading/>
  }

  const name = `${trainee.profile.firstName} ${trainee.profile.lastName}`;
  const image = `https://robohash.org/${trainee.credentials.id}?set=set3`;

  return (
    <div>
      <img className="centered" width="200" height="200" alt={name.slice(0, 2)} src={image}/>
      <h4>{name}</h4>
      <h6>{review.title}</h6>
      <p>{review.comment}</p>
      {makeSmiles(review.rating)}
    </div>
  );
};

