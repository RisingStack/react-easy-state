import { gql } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  uri: 'https://graphql-pokemon.now.sh/',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const fetchList = async () => {
  const result = await client.query({
    query: gql`
      {
        pokemons(first: 10000) {
          id
          name
          image
          classification
          types
        }
      }
    `,
  });

  return result.data.pokemons;
};

export const fetchPokemon = async (id) => {
  const result = await client.query({
    query: gql`
        {
          pokemon(id: "${id}") {
            id
            name
            image
            classification
            types
            weight {
              minimum
              maximum
            }
            height {
              minimum
              maximum
            }
            resistant
            attacks {
              fast {
                name
                type
                damage
              }
              special {
                name
                type
                damage
              }
            }
            weaknesses
            fleeRate
            maxCP
            maxHP
            evolutions {
              id
              name
              image
            }
            evolutionRequirements {
              amount
              name
            }
          }
        }
      `,
  });

  return result.data.pokemon;
};
