import React, { Component} from 'react';
import {BrowserRouter as Router, Routes,  Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css'; 
import './main.css'; 
import Spinner from './components/layout/Spinner';
import Product from './components/products/Product';
import Products from './components/products/Products';
import Navbar from './components/layout/Navbar'
import Efr from './components/layout/Efr';
import RentalProduct from './components/products/RentalProduct';
import ContractPrint from "./components/layout/ContractPrint"
import Home from './components/layout/Home';


class App extends Component {
  state = {
    products:[],
    localizations:[],
    isLoaded: false,
    
  }
  async componentDidMount(){

    const res = await axios.get(`${process.env.REACT_APP_API_HOST}/api/products-localizations`)

    try {
      this.setState({
        products: res.data.products,
        localizations: res.data.localizations,
        isLoaded: true})
    } catch (error) {
      this.setState({error})
    }
  }

  render(){
    
    const {products,error,isLoaded, localizations}=this.state
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <Spinner/>;
    } else {
      return (

          <Router>
            <Navbar products={products} />
            <Routes>
              <Route exact path='/' element={<Home localizations={localizations}/>} />
              <Route exact path='/efr' element={<Efr/>} />
              <Route exact path='/:localization/:id'  element={<Products products={products} />} />
              <Route exact path='/:localization/:id/:name/:id'  element={<Product products={products} />} />
              <Route exact path='/:localization/:id/:name/:id/najem'  element={<RentalProduct />} />
              <Route exact path='/umowa/:_id'  element={<ContractPrint />} />
            </Routes>
          </Router>
          
      );
    }
  }
}

export default App;
