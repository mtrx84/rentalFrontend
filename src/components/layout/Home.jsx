

import React from 'react'
import { Link } from 'react-router-dom'

function Home(props) {
  
  return (
    <div >
      <section className="efr-baner d-flex flex-column align-items-center my-4 ">
        <Link to={"/efr"} className="d-flex flex-column align-items-center mx-2" >
          <img className="img-fluid w-75 px-4" src="/img/baner-efr.jpg" alt="Baner EFR"/>
          <p className="efr-text mt-2 px-4 text-center">„Europejski Fundusz Rolny na rzecz Rozwoju Obszarów Wiejskich: Europa inwestująca w obszary wiejskie"
          </p>
        </Link>
        <div className="w-75 border-bottom"></div>
      </section>
      <section className="rental-text px-4 mb-4 ">
        <h2>Wypożyczalnia sprzętów budowlanych i ogrodniczych Wrobud Łańcut - Idealne rozwiązanie dla Ciebie!</h2> 
        <p >Budujesz, remontujesz? Ułatw sobie pracę, skorzystaj z oferty najmu urządzeń budowlanych! Oferujemy sprzęt najwyższej jakości, renomowanych producentów w bardzo atrakcyjnych cenach, który pomoże Ci wykonać pracę sprawniej i szybciej. Ofertę kierujemy zarówno do firm jak i osób prywatnych. Na tej stronie możesz sprawdzić dostępność oraz zarezerwujesz potrzebny sprzęt w wybranym terminie.
        </p>
      </section>
      <section className="localization-container d-flex flex-wrap justify-content-around text-center">
        <p className="m-0 h6 text-center w-100 select">Wybierz oddział:</p>
        <ul className='localization-items'>
          {props.localizations.map((el, id)=>{
              return(
                <li className='flex-container m-2 localization-item text-center' key={id}>
                  <Link className="rent-local-btn hover-button" to={`${el.link}/${el.id}`} data-id="<%-localization.id  %>"> <span><strong>{el.name}</strong></span> <br/>
                      <span >{el.contact.poczta}<br/>{el.contact.ulica}</span> <br/>
                      <span className="text-center" >  {el.contact.phone}<br/>{el.contact.email}</span>
                    </Link>
                </li>
              )
            })
          }
        </ul>
      </section>
    </div>
  )
}

export default Home