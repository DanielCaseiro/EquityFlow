import React from 'react'
import Card from '../Card/Card'

interface Props {}

const CardList = (props: Props) => {
  return (
    <div>
        <Card companyName='Aple' ticker='AAPL' price={100} />
        <Card companyName='Aple' ticker='AAPL' price={100}/>
        <Card companyName='Aple' ticker='AAPL' price={100}/>
    </div>
  )
}

export default CardList