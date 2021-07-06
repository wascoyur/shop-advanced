import React, { Fragment } from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import BestSellers from '../components/home/BestSellers';
import NewArrivals from '../components/home/NewArrivals';
import CategoryList from '../components/category/CategoryList';
import SubList from '../components/sub/SubList';

const Home = () => {
  return (
    <Fragment>
      <div className='jumbotron text-danger h1 font-weight-bold text-center'>
        <Jumbotron
          text={['Новинки!!!', 'Лидеры продаж', 'Последние поступления']}
        />
      </div>

      <div className='text-center p-3 mb-5 display-3 jumbotron'>Новинки!!!</div>

      <NewArrivals />
      <br />
      <br />
      <div className='text-center p-3 mb-5 display-3 jumbotron'>
        Лидеры продаж!!!
      </div>
      <BestSellers />
      <h4 className='text-center p-3 mb-5 display-3 jumbotron'>
        Категории товаров
      </h4>
      <CategoryList />

      <h4 className='text-center p-3 mb-5 display-3 jumbotron'>
        Подкатегории товаров
      </h4>
      <SubList/>
    </Fragment>
  );
};

export default Home;
