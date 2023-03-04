import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from 'redux/store'

export interface PokeInfo {
  order: number | null
  name: string | null
  img: string | null
}

export interface chargeData {
  isLoading: boolean
  isError: boolean
  data: PokeInfo
}

const pokeInitialState: chargeData = {
  isLoading: false,
  isError: false,
  data: {
    order: null,
    name: null,
    img: null
  }
}

export const fetchPoke = createAsyncThunk(
  'fetch para buscar un pokemon',
  async (order: number, thunkApi) => {
    const dataPoke = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${order}`
    )
    return {
      order: dataPoke.data.id,
      name: dataPoke.data.name,
      img: dataPoke.data.sprites.other.dream_world.front_default
    }
  }
)

const pokemons = createSlice({
  name: 'pokemons',
  initialState: pokeInitialState,
  reducers: {
    setLoading: (state, action) => {
      return {
        isLoading: true,
        isError: false,
        data: {
          order: null,
          name: null,
          img: null
        }
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(
      fetchPoke.fulfilled,
      (state, action: PayloadAction<PokeInfo>) => {
        return {
          isLoading: false,
          isError: false,
          data: {
            name: action.payload.name,
            order: action.payload.order,
            img: action.payload.img
          }
        }
      }
    )
    builder.addCase(fetchPoke.pending, (state, action) => {
      return {
        isLoading: true,
        isError: false,
        data: {
          order: null,
          name: null,
          img: null
        }
      }
    })
    builder.addCase(fetchPoke.rejected, (state, action) => {
      return {
        isLoading: false,
        isError: true,
        data: {
          order: null,
          name: null,
          img: null
        }
      }
    })
  }
})

export const { setLoading } = pokemons.actions

export const selectPoke = (state: RootState) => state.pokemons

export default pokemons.reducer
