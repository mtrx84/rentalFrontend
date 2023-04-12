

import React, { Component } from 'react'
import ProductItem from './ProductItem.jsx'
import Search from './Search.jsx'

function Products(props) {
  const localizationId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
  const products = props.products.filter(el=>el.localization == localizationId)
 
  return (
    <div className='products-container '>
      <div className='w-100 d-flex justify-content-center'>
    <Search products = {products}/>
    </div>
      {products.map((product, index)=>(
        <ProductItem  key={index} product={product} />
      ))}
      </div>
  )
}

export default Products