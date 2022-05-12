import React from 'react'
import { TextField } from '@mui/material'
import './search.scss'

interface ISearch {
  handler: (value: string) => void
}

const Search: React.FC<ISearch> = ({ handler }) => {
  return (
    <div className="searchbox">
      <TextField id="outlined-basic" label="Search contacts" variant="outlined" onChange={e => handler(e.target.value)} />
    </div>
  )
}

export default Search