import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import "lazysizes"
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function Search(props) {

  const handleOnSelect = (item) => {
    const url = `${window.location.href}/${item.img[0].split('.')[0]}/${item._id}`
    window.location.reload(false)
    window.location.assign(url)
  }

  const formatResult = (item) => {
    return (
      <Fragment>
        <img data-src={`/img/rental/webp/${(item.img[0].split('.')[0])+'.webp'}`} className='lazyload' style={{ display: 'block', textAlign: 'left', height:"3rem", width:"auto" }}></img>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </Fragment>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={props.products}
            onSelect={handleOnSelect}
            autoFocus
            formatResult={formatResult}
          />
        </div>
      </header>
    </div>
  )
}

export default Search