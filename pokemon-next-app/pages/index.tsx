import React, { ReactElement, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import { gql, useLazyQuery } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
import { PokeAPI } from '../apollo/datasources/pokeApi'
import { IPokemon } from '../apollo/types/pokemon'
import Layout from '../components/Layout'
import PokemonCardList from '../components/PokemonCardList'
import Scroll from '../components/Scroll'

export const PokemonQuery = gql`
  query Pokemon($type: String) {
    pokemon(type: $type) {
      name
      url
      imageUrl
      pokeIndex
      types
    }
  }
`

export interface GetPokemonQueryResult {
  pokemon: IPokemon[]
}

export interface GetPokemonQueryVariables {
  type?: string
}

export default function Home({
  pokemon: pokemonFromProps,
}: {
  pokemon: IPokemon[]
}): ReactElement {
  const [pokemon, setPokemon] = useState<IPokemon[]>(pokemonFromProps)

  return (
    <Layout title='Pokemon-site'>
      <div className='text-3xl mb-6 text-center mx-auto'>Pokemon list</div>
      <Scroll>
        <PokemonCardList pokemon={pokemon} />
      </Scroll>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { InMemoryLRUCache } = require('apollo-server-caching')
  const pokeAPI = new PokeAPI()
  pokeAPI.initialize({ context, cache: new InMemoryLRUCache() })
  const apolloClient = initializeApollo(null, { dataSources: { pokeAPI } })

  interface PokemonQueryResult {
    pokemon: IPokemon[]
  }

  try {
    const { data } = await apolloClient.query<PokemonQueryResult, null>({
      query: PokemonQuery,
    })

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        pokemon: data.pokemon,
      },
    }
  } catch (err) {
    return {
      props: { pokemon: [] },
    }
  }
}
