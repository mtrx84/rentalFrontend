import React, { Component } from 'react'
import { useLocation } from 'react-router'
import Form from './Form'
import { Link } from 'react-router-dom';


function RentalProduct() {
  const location = useLocation();
  const {dates, product, rentSumNetto, rentSumBrutto}= location.state;
   
  return (
    <div id='rental-product' className='d-flex justify-content-around flex-wrap'>
      <h2 className='text-center border-bottom w-75 p-2 mx-auto'>{product.name}</h2>
      <div className="d-flex flex-md-nowrap flex-wrap justify-content-center">
        <div className='d-flex justify-space-between product-item-container flex-column align-items-center  '>
          <div className="image">
            <img data-src={`/img/rental/webp/${(product.img[0].split('.')[0])+'.webp'}`} className='lazyload p-2' alt="Produkt wypożyczalni" />
          </div>
          <div className="rent-term">
            <p className="rent-start">Dzień wypożyczenia: {dates[0]}</p>
            <p className="rent-end">Dzień zwrotu: {dates[dates.length-1]}</p>
          </div>
          <div className="prices text-center">
            <p className='price-netto'>{rentSumNetto}zł <span className='netto'>cena netto</span></p>
            <p className='price-brutto'>{rentSumBrutto}zł <span className="brutto">cena brutto</span></p>
              {dates.length>1? <p className='rent-rabat'>Rabat 10%</p>: ""}
            <p className='rental-deposit-price'>Depozyt: {product.deposit}zł</p>
          </div>
        </div>
        {/* .contact */}
        <div className="contact">
        <h3 className='p-2'>Dane do Umowy Najmu:</h3>
        <Form props={location.state}/>
        </div>
      </div>
    </div>
  )
}

export default RentalProduct