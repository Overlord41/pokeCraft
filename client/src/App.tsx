import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from './redux/slices/numbers'
import { AppDispatch, RootState } from 'redux/store'
import { fetchPoke, selectPoke } from './redux/slices/pokemons'

const App: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  const pokeName = useSelector(selectPoke)
  const dispatch = useDispatch<AppDispatch>()
  const NPoke = useRef<HTMLInputElement>(null)

  const changeName = () => {
    if (NPoke.current?.value) {
      dispatch(fetchPoke(Number(NPoke.current?.value)))
      NPoke.current.value = ''
      NPoke.current.focus()
    }
  }

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <div>
        <input type="text" ref={NPoke} />
        <button onClick={changeName}>Mostrar Pokémon</button>
      </div>
      Nombre Pokemon: {pokeName.isLoading ? '...' : pokeName.data.name}
      <div>
        {pokeName.isLoading && !pokeName.isError ? (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
            alt=""
          />
        ) : (
          <>
            {pokeName.isError ? (
              <img
                src="https://www.hostingplus.pe/wp-content/uploads/2020/02/error.jpg"
                alt=""
              />
            ) : (
              <img src={pokeName.data.img ? pokeName.data.img : ''} alt="" />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App
