import { objectType } from 'nexus'

export interface IPokemon {
  name: string
  url: string
  imageUrl: string
  pokeIndex: number
  types: string
}

export const Pokemon = objectType({
  name: 'Pokemon',
  definition(t) {
    t.string('name'), t.string('url'), t.string('imageUrl'), t.int('pokeIndex'), t.string('types')
  },
})
