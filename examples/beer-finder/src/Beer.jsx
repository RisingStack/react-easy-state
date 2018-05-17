import React, { Component } from 'react'
import { view, store } from 'react-easy-state'
import Card, { CardContent, CardMedia } from 'material-ui/Card'

class Beer extends Component {
  store = store({ details: false });

  toggleDetails = () => (this.store.details = !this.store.details);

  render () {
    const {
      name,
      image_url: imageUrl,
      food_pairing: foodPairing,
      description
    } = this.props
    const { details } = this.store

    return (
      <Card onClick={this.toggleDetails} className='beer'>
        {!details && <CardMedia image={imageUrl} className='media' />}
        <CardContent>
          <h3>{name}</h3>
          {details ? (
            <p>{description}</p>
          ) : (
            <ul>{foodPairing.map(food => <li key={food}>{food}</li>)}</ul>
          )}
        </CardContent>
      </Card>
    )
  }
}

export default view(Beer)
