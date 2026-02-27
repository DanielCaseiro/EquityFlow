import React from 'react'
import './Card.css'

interface Props {
  companyName: string;
  ticker: string;
  price: number;
}

const Card = ({companyName, ticker, price}: Props) => {
  return (
    <div className='card'>
        <img src="https://testquality.com/wp-content/uploads/brizy/imgs/unnamed-2-787x449x0x0x787x448x1761773581.jpg" 
        alt="Placeholder Image" />

      <div className="details">
        <h2>{companyName} ({ticker})</h2>
        <p> ${price.toFixed(2)}</p>
      </div>
        <p className='info'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates, animi!
        </p>
    </div>
  )
}

export default Card