import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {

  static defaultProps = {
    title: "Wypożyczalnia sprzętu budowlanego",
  }

  render(){

    return (
      <nav className='shadow navbar d-flex justify-content-around' >
        <Link to={'/'}> <img src="/wrobud.png" className='p-2' alt="logo Wrobud" /></Link>
        {/* <h1>{this.props.title}</h1> */}
      </nav>
    );

  }
  
}

export default Navbar;
