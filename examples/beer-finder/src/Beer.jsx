import React from 'react'
import { view, store } from 'react-easy-state'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'

// this is re-rendered whenever the relevant parts of the used data stores change
export default view(
  ({ name, description, image_url: imageUrl, food_pairing: foodPairing }) => {
    const beer = store({ details: false })

    return (
      <Card onClick={() => (beer.details = !beer.details)} className='beer'>
        {!beer.details && <CardMedia image={imageUrl} className='media' />}
        <CardContent>
          <h3>{name}</h3>
          {beer.details ? (
            <p>{description}</p>
          ) : (
            <ul>
              {foodPairing.map(food => (
                <li key={food}>{food}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    )
  }
)
