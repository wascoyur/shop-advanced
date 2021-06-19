import React, { useEffect, useState } from 'react';
import { getProducts } from '../functions/product';
import ProductCard from '../components/cards/ProductCard';
import Jumbotron from '../components/cards/Jumbotron';
import NewArrivals from '../components/home/NewArrivals';

const Home = () => {
  return (
    <div>
      <div className='jumbotron text-danger h1 font-weight-bold text-center'>
        <Jumbotron
          text={['Новинки!!!', 'Лидеры продаж', 'Последние поступления']}
        />
      </div>
      <div className='text-center p-3 mb-5 display-3 jumbotron'>Новинки!!!</div>

      <NewArrivals />
      <br/>
      <br/>
    </div>
  );
};

export default Home;
