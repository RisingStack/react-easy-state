import axios from 'axios'

const ITEMS_PER_PAGE = 30

const api = axios.create({
  baseURL: 'https://api.punkapi.com/v2'
})

export async function fetchBeers (filter) {
  const { data } = await api.get('/beers', {
    params: {
      food: filter || undefined,
      per_page: ITEMS_PER_PAGE
    }
  })
  data.forEach(fillImage)
  return data
}

function fillImage (beer) {
  if (!beer.image_url || beer.image_url.indexOf('keg.png') !== -1) {
    beer.image_url =
      'http://www.patternpictures.com/wp-content/uploads/2015/11/PP07301706-Close-up-of-draft-beer-foam.jpg'
  }
}
