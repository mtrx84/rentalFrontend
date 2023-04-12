import React, {Component, Suspense} from 'react'
import { Link } from 'react-router-dom'
import 'lazysizes'
import Spinner from '../layout/Spinner'
import ProductDescription from './ProductDescription'
import Flatpickr from "./Flatpickr"
import sharedOptions from"../../options"

export class Product extends Component {
  constructor(props){
    super(props)
    this.state = {
      _id:'',
      product:{},
      technical_data: {},
      isLoaded: false,
      dates:[],
      rentSumNetto:0,
      rentSumBrutto:0
     }
  }

   async componentDidMount(){
    const products = this.props.products
    const product = await products.find((el)=>{
      return el._id === (window.location.href).split('/')[((window.location.href).split('/')).length-1]
    })
    const _id = (window.location.href).split('/')[((window.location.href).split('/').length-1)]
    try {
      this.setState({
        _id: _id,
        product: product,
        technical_data: product.technical_data,
        isLoaded:true,
       })
    } catch (error) {
      console.log(error)
      this.setState({
        error
      })
    }
  };

  setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  };

  onChange(selectedDates, dateStr, instance) {

    function getDates (startDate, endDate) {
      const dates = []
      let currentDate = startDate
      const addDays = function (days) {
        const date = new Date(this.valueOf())
        date.setDate(date.getDate() + days)
        dates.push(new Date(date).toISOString().split('T')[0])
        return date
      }
      while (currentDate <= endDate) {
        currentDate = addDays.call(currentDate,1)
      }
      return dates
    }

    const dates = getDates(new Date(selectedDates[0]), new Date(selectedDates[1]))

    const rentResult = document.querySelector('.rent-result')
    const rentTerm = document.querySelector('.rent-term')
    if(dates.length ===1 ){
      rentResult.classList.remove('d-none')
      rentTerm.classList.add('d-none')
    }
     if(dates.length ===0 ){
      rentResult.classList.add('d-none')
      rentTerm.classList.remove('d-none') 
    }
    const rentFee = document.querySelector('.rent-fee')
    const rentFeeNetto = document.getElementById("rent-fee-netto");
    const rentFeeBrutto = document.getElementById("rent-fee-brutto");
    const priceNetto= rentFeeNetto.getAttribute('data-netto')
    const priceBrutto= rentFeeBrutto.getAttribute('data-brutto')
    let rentSumNetto;
    let rentSumBrutto
    if(dates.length>=2){
      rentResult.classList.remove('d-none')
      rentTerm.classList.add('d-none')
      rentSumNetto=(priceNetto * dates.length*0.9).toFixed(2)
      rentSumBrutto=(priceBrutto * dates.length*0.9).toFixed(2)
      rentFeeNetto.textContent= `${rentSumNetto}zł`
      rentFeeBrutto.textContent= `${rentSumBrutto}zł`
     
      if(document.querySelector('.rent-rabat')===null){
        const span = document.createElement('span')
        span.textContent = "Rabat 10%"
        rentFee.append(span)
        this.setAttributes(span, {"className":"rent-rabat"})
      }
    } else{
      rentSumNetto=(priceNetto * dates.length).toFixed(2)
      rentSumBrutto=(priceBrutto * dates.length).toFixed(2)
      rentFeeNetto.textContent= `${rentSumNetto}zł`
      rentFeeBrutto.textContent= `${rentSumBrutto}zł`
      if(document.querySelector('.rent-rabat') !== null){ rentFee.removeChild(document.querySelector('.rent-rabat')) }
    }
    this.setState({
      dates:dates,
      rentSumNetto: rentSumNetto,
      rentSumBrutto: rentSumBrutto
    })
    document.getElementById('calendar').value = dates
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevState.dates !== this.state.dates){
      prevState.dates = this.state.dates;
      prevState.rentSumNetto = this.state.rentSumNetto
      prevState.rentSumBrutto = this.state.rentSumBrutto
    }
  }

  fetchCart(dates) {
    fetch(`${process.env.REACT_APP_API_HOST}/api${window.location.pathname}`, {
      method: "POST",
      body: dates,
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
    })
      .then((response) => console.log(response.text()))
  };

  render() {

    const {product, technical_data, error, isLoaded } = this.state
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <Spinner/>;
    } else {
      return (
        
        <div id="product">
          <h2 className='text-center border-bottom w-75 p-2 mx-auto'>{product.name}</h2>
          <div className="product-container d-flex flex-column flex-sm-row flex-wrap justify-content-around   p-2 align-items-center">
            <div className='calendar-container my-3'>
              <div className="choice-term">
                <div className="position-relative">
                  <div className="h6 m-0  rent-term d-flex align-items center">
                  <p className="align-self-end">Wybierz termin najmu:</p>
                  </div>
                  <div className="rent-result d-flex justify-content-between align-items-center d-none">
                    <div className="rent-fee text-center">
                      <p>Opłata: </p>
                      <p>
                        <span id="rent-fee-netto" data-netto={(product.cena_netto).toFixed(2)}>0 zł</span> netto
                      </p>
                      <p>
                        <span id="rent-fee-brutto" data-brutto={(product.cena_brutto).toFixed(2)}>0 zł
                        </span> brutto 
                      </p>
                    </div>
                    <Link to={`${window.location.href}/najem`} state={{dates:this.state.dates, product:this.state.product, rentSumNetto:this.state.rentSumNetto, rentSumBrutto:this.state.rentSumBrutto}}  id="add-to-rental-basket"   className="add-to-basket hover-button">
                      <span > Dalej </span>
                    </Link>
                  </div>
                  <input  type="calendar" style={{display:"none"}} name="rentDate" defaultValue=""  id="calendar" >
                  </input>
                </div>
              </div>
              <Flatpickr 
                onDayCreate={(dObj, dStr, fp, dayElem)=>{
                  const rentalsDate = product.rentals_date
                  const day = dayElem.getAttribute('aria-label')
                  rentalsDate.forEach(el => {
                    if(el === day){
                      dayElem.style.background="orange"
                      dayElem.style.color="black"
                      dayElem.classList.add("flatpickr-disabled")
                    } 
                  })
                }}
                options={sharedOptions()}
                onClose={(date) => {
                this.onChange(date);
                }}
              />
            </div>
            <div className="img-container my-3  align-self-center">
              <img data-src={`/img/rental/${product.img}`} className='lazyload product-image ' alt="Produkt wypożyczalni" />
            </div>
            <div className="description-container my-3">
              <ProductDescription product={this.state.product}/>
            </div>
          </div>
        </div>
    )}
  }
}

export default Product

