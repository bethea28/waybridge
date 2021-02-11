import React, { useEffect, useState } from 'react'
import './App.css'
import Autocomplete from './components/autocomplete'

interface PartType {
  id: number
  name: string
  price: string
  instock: number
}

const Table = ({ parts }: { parts: PartType[] }) => {
  console.log('parts', parts)
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Instock</th>
          <th>Low Stock</th>
          <th>Out Of Stock</th>
        </tr>
      </thead>
      <tbody>
        {parts.map((part, i) => {
          return (
            <tr key={i}>
              <td>{part.id}</td>
              <td>{part.name}</td>
              <td>{part.price}</td>
              <td>{part.instock}</td>
              <td>{Number(part.instock) < 100 ? 'YES' : 'NO'}</td>
              <td>{Number(part.instock) === 0 && 'YES'}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function App() {
  const [parts, setParts] = useState<PartType[]>([])
  const [lowStock, setLow] = useState<PartType[]>([])
  const [called, setCall] = useState<PartType[]>([])
  const [final, setFinal] = useState<PartType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch('http://localhost:8000/parts')
      const data = await resp.json()
      const myData: PartType[] = data
      const allLowStocks = myData.filter((stock) => {
        return stock.instock < 100
      })
      setParts(myData)
      setLow(allLowStocks)
      console.log('bryan', lowStock)
    }
    fetchData()
  }, [])

  const callBack = (arg: any) => {
    console.log('bryan parts', arg)
    let done = parts.filter((a) => {
      if (arg.includes(a.name)) {
        return a
      }
    })

    console.log('callbac', done)
    setFinal(done)
    setCall(arg)
    console.log('final', final)
  }

  return (
    <div className='App'>
      Search:{' '}
      <Autocomplete getFromChild={callBack} data={parts.map((p) => p.name)} />
      <Table parts={parts} />
    </div>
  )
}

export default App
