import React from 'react';
import StarRating from 'react-star-ratings';

export const showAverege = (p) => {

  if (p && p.raitings) {
    let ratingsArray = p && p.raitings;
    let total = [];
    let length = ratingsArray.length;

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    let highest = length * 5;
    let result = (totalReduced * 5) / highest;

    return (
      <div className='text-center pt-1 pb-3'>
        <span>
          <StarRating rating={result} />
        </span>
      </div>
    );
  } else {
    return <div>Нет оценок {JSON.stringify(p)}</div>;
  }
};
