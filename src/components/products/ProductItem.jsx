

import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import "lazysizes"

export class Product extends Component {

  render() {
    const product = this.props.product
    
    return (
      <div className='product-item-container shadow d-flex flex-column justify-content-between'>
        <h2>{product.name}</h2>
        <div className="image">
          <img data-src={`/img/rental/webp/${(product.img[0].split('.')[0])+'.webp'}`} className='lazyload' alt="Produkt wypożyczalni" />
        </div>
        <div>
          <div className="prices text-center">
            <p className='price-netto'>{product.cena_netto.toFixed(2)}zł <span className='netto'>cena netto</span></p>
            <p className='price-brutto'>{product.cena_brutto.toFixed(2)}zł <span className="brutto">cena brutto</span></p>
          </div>
          <div className='reservation-container flex-container'>
            <Link  key={product._id} to={`${product.img[0].split('.')[0]}/${product._id}`} className="hover-button mx-auto my-1"><span>Zarezerwuj online</span></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Product