import React, {Component, useState, useEffect} from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

function Form(props){
  const { register, handleSubmit,watch, formState: { errors } } = useForm();
  const { product, dates}=props.props;
  const dataForm = watch()
  const onSubmit =(data) => {
    const path= (window.location.href).split('/')
    console.log(path)
        fetch(`${process.env.REACT_APP_API_HOST}/api/${path[5]}/${path[6]}/najem`, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ product, dates, dataForm})
        })
        .then(response => response.json())
        .then(response => {console.log(JSON.stringify(response))
          console.log(response)
          const {redirectUrl, orderId} = response
        window.location.assign(`${redirectUrl}/${orderId}`)
        })
    }
  
  return(

    <form onSubmit={handleSubmit(onSubmit)}   className='my-3 d-flex flex-wrap justify-content-center'>
      <p className='w-50  p-2 d-flex flex-column'>
        <label>Imię</label>
        <input className='data-form' type="text" {...(register('name', { required: true }))} required/>
        {errors.name && <span>Wypełnij to pole</span>}
      </p>
      <p className='w-50 p-2'>
        <label>Nazwisko</label>
        <input className='data-form' type="text" {...(register('surname', { required: true }))} required/>
        {errors.surname && <span>Wypełnij to pole</span>}
      </p>
      <p className='w-50 p-2'>
        <label>Numer PESEL*</label>
        <input className='data-form w-100' type="number" {...(register('pesel', { required: true }))} required/>
        {errors.pesel && <span>Wypełnij to pole</span>}
      </p>
      <p className='w-50 p-2'>
        <label>Ulica (Miejscowość)</label>
        <input className='data-form ' type="text" {...(register('sstreet', { required: true }))} required/>
        {errors.street && <span>Wypełnij to pole</span>}
      </p>
      <p className='w-50 p-2'>
        <label >Numer budynku</label>
       <input className='data-form' type="text" {...(register('houseNumber', { required: true }))} required/>
        {errors.houseNumber && <span>Wypełnij to pole</span>}
      </p>
      <p className='w-50 p-2'>
        <label>Kod pocztowy</label>
        <input className='data-form' type="text" {...(register('post', { required: true }))} required/>
        {errors.post && <span>Wypełnij to pole</span>}
      </p>
      <p className='w-50 p-2'>
        <label>Miasto</label>
        <input className='data-form' type="text" {...(register('city', { required: true }))} required/>
        {errors.city && <span>Wypełnij to pole</span>}
      </p>
      <p className='w-50 p-2'>
        <label>Adres email</label>
        <input className='data-form' type="email" {...register("email", { required: true })}/>
        {errors.email && <span>This field is required</span>}
      </p>
      <p className='w-50 p-2'>
        <label>Numer telefonu</label>
        <input className='data-form w-100' type="number" {...(register('phone', { required: true }))} required/>
        {errors.phone && <span>Wypełnij to pole</span>}
      </p>
      <div>
        <div className="regulation-check full d-flex flex-row-reverse align-items-middle">
          <label className='p-2 m-0'>
            Zapoznałem się i akceptuję <a className="link-blank-regulations" href="/regulamin" target="_blank">Regulamin Wypożyczalni</a> oraz <a href="/regulamin" target="_blank">Politykę Prywatności</a> serwisu www.wrobud.com.pl
          </label>
            <input  className='regulations data-form mx-2' type="checkbox" {...(register('regulations', { required: true }))}/>
        </div>
        {errors.regulations && <p className='w-100' style={{"color":"red"}}>To pole musi być zaznaczone.</p>}
      </div> 
      <p className="full w-100 text-center">
          *można podać na miejscu podczas podpisania umowy
      </p>
      <button type="submit"  className="hover-button"><span>Zarezerwuj</span></button>
    </form>
  );
 }


export default Form;
