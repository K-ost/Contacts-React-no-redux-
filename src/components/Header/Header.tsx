import React from 'react'
import { Badge } from '@mui/material'

interface IHeader {
  count: number
}

const Header: React.FC<IHeader> = ({ count }) => {
  return (
    <div className="maincontent-header-top">
      <Badge badgeContent={count} max={999} color="primary">
        <h2>All contacts</h2>
      </Badge>
    </div>
  )
}

export default Header