import React, { Fragment } from 'react';
import StarRating from 'react-star-ratings';

const Star = ({ starClick, numberOfStars }) => (
  <Fragment
    /* style={{ marginTop: '-0.2rem', marginBottom: '-0.1rem' ,paddingLeft:'2.5rem'}} */>
    <StarRating
      changeRating={() => starClick(numberOfStars)}
      numberOfStars={numberOfStars}
      starDimension='20px'
      starSpacing='2px'
      starHoverColor='red'
      starEmptyColor='red'
    />
  </Fragment>
);

export default Star;
