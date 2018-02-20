import React, { Component } from 'react'
import { view, store } from 'react-easy-state'
import Card, { CardContent, CardMedia, CardActions } from 'material-ui/Card'
import Button from 'material-ui/Button'

class Beer extends Component {
  store = store({ details: false })

  toggleDetails = () => this.store.details = !this.store.details

  render () {
    const { name, image_url, food_pairing, description } = this.props
    const { details } = this.store

    return (
      <Card onClick={this.toggleDetails} className='beer'>
        {!details && <CardMedia image={image_url} className='media'/>}
        <CardContent>
          <h3>{name}</h3>
          {details
            ? <p>{description}</p>
            : <ul>
                {food_pairing.map(food => <li key={food}>{food}</li>)}
              </ul>
            }
        </CardContent>
      </Card>
    )
  }
}

export default view(Beer)
