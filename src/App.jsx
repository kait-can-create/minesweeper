import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Fields from './components/Fields'
// import Message from './components/Message'

const App = () => {
  const [gameID, setGameId] = useState('')
  const [board, setBoard] = useState([])
  const [state, setState] = useState('')
  const [bombs, setBombs] = useState('')
  const apiUrl = 'https://minesweeper-api.herokuapp.com/games'

  const createBoard = async () => {
    const resp = await Axios.post(
      'https://minesweeper-api.herokuapp.com/games',
      { difficulty: 0 }
    )
    console.log(resp.data)
    setGameId(resp.data.id)
    setBoard(resp.data.board)
    setBombs(resp.data.bombs)
    setState(resp.data.state)
  }

  useEffect(() => {
    createBoard()
  }, [])

  const rClick = async (x, y) => {
    const resp = await Axios.post(`${apiUrl}/${gameID}/flag`, {
      row: x,
      col: y
    })
    setGameId(resp.data.id)
    setBoard(resp.data.board)
    setBombs(resp.data.bombs)
    setState(resp.data.state)
  }

  const lClick = async (x, y) => {
    const resp = await Axios.post(`${apiUrl}/${gameID}/check`, {
      row: x,
      col: y
    })
    setGameId(resp.data.id)
    setBoard(resp.data.board)
    setBombs(resp.data.bombs)
    setState(resp.data.state)
  }

  const game = async () => {
    const resp = await Axios.post(apiUrl, { difficulty: 0 })
    setGameId(resp.data.id)
    setBoard(resp.data.board)
    setBombs(resp.data.bombs)
    setState(resp.data.state)
  }

  const displayMessage = () => {
    if (state === 'lost') {
      setState({
        status: 'You lost, try again'
      })
    } else if (state === 'won') {
      setState({
        status: 'You won, go again?'
      })
    }
  }

  console.log('test' + displayMessage())

  return (
    <>
      <header>Minesweeper</header>
      <section className='newGameButton'>
        <button onClick={game}>New Game</button>
      </section>
      <p className="bombsLeft">Bombs Remaining: {bombs}</p>
      <table className="gameBoard">
        <tbody>
          {board.map((col, i) => {
            return (
              <tr key={i}>
                {col.map((row, j) => {
                  return (
                    <Fields
                      key={j}
                      displayMessage={board[i][j]}
                      onClick={() => lClick(i, j)}
                      onClick={() => rClick(i, j)}
                    />
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

    </>
  )
}

export default App


// maps
// wrap head around nested maps