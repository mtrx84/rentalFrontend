

import React, { Component }  from 'react'
import Accordion from 'react-bootstrap/Accordion';

 function ProductDescription(props) {
  const product = props.product
  const technical_data =  props.product.technical_data
   
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Informacje</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li key={0}>Producent: <strong>{product.producer}</strong></li>
              <li key={1}>Indeks: <strong>{product.index}</strong></li>
            </ul>
            <div className="prices text-center">
              <p className='price-netto'>{product.cena_netto.toFixed(2)}zł <span className='netto'>cena netto</span></p>
              <p className='price-brutto'>{product.cena_brutto.toFixed(2)}zł <span className="brutto">cena brutto</span></p>
            </div>
          </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Opis</Accordion.Header>
          <Accordion.Body>
            {product.desc}
          </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Dane Techniczne</Accordion.Header>
          <Accordion.Body>
            <ul>
              {Object.keys(technical_data).map(key => {
                return (
                  <li key={key}>
                      {key.toLocaleUpperCase()}: <strong>{technical_data[key]}</strong>
                  </li>
                );
              })}
            </ul>
        </Accordion.Body>
      </Accordion.Item> 
    </Accordion>
  );
}

export default ProductDescription;