import React, { useState } from 'react'
import './style.css'

const Autocomplete = ({
  data = [],
  getFromChild,
}: {
  data: string[]
  getFromChild: any
}) => {
  const [userInput, setUserInput] = useState<string>('')
  const [filtered, setFiltered] = useState<string[]>([])
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0)
  // console.log('test', callBack)
  const cmp = (row: string, text: string) => {
    // console.log(`cmp: ${row} to ${text}`)

    const r = row.toLocaleLowerCase().indexOf(text) > -1
    // console.log(r)
    return r
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setUserInput(text)
    const filtered = data.filter((row) => {
      return cmp(row, text)
    })
    setFiltered(filtered)
    setActiveSuggestion(0)
    getFromChild(filtered)
    console.log('bryan filt', filtered)
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setUserInput(filtered[activeSuggestion])
      setFiltered([])
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (activeSuggestion === 0) {
        return
      }
      setActiveSuggestion(activeSuggestion - 1)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      // console.log(`Active ${activeSuggestion} Length: ${filtered.length}`)
      if (activeSuggestion + 1 === filtered.length) {
        return
      }
      setActiveSuggestion(activeSuggestion + 1)
    }
  }

  const onClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setActiveSuggestion(0)
    setFiltered([])
    setUserInput(e.currentTarget.innerText)
  }

  return (
    <div className='autocomplete'>
      <input
        type='text'
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
      />

      <ul>
        {filtered.length > 0 ? (
          filtered.map((row, idx) => {
            // console.log(`row ${row} - ${idx}`)
            return (
              <li
                className={
                  idx === activeSuggestion ? 'autocomplete-active' : ''
                }
                key={row}
                onClick={onClick}
              >
                {row}
              </li>
            )
          })
        ) : (
          <></>
        )}
      </ul>
    </div>
  )
}

export default Autocomplete
