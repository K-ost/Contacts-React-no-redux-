import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './carditem.scss'
import { Checkbox, Chip, Button, TextField, CircularProgress } from '@mui/material'
import { contact } from '../../interfaces'

export interface ICard {
  card: contact
}

const CardItem: React.FC<ICard> = ({ card }) => {
  const [checked, setChecked] = useState<boolean>(false)
  const CardClass = checked ? 'cardItem cardItem-checked' : 'cardItem'
  const cardRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState<boolean>(false)

  const height = show ? `${cardRef.current?.offsetHeight}px` : 0
  
  return (
    <div className={CardClass}>
      <div className="cardItem-inner">
        <Checkbox onChange={() => setChecked(!checked)} />
        <div className="cardItem-details">
          <h4><Link to={`/${card.accountId}`}>{card.name}</Link></h4>
          <p>{card.phoneNumber && `+${card.phoneNumber}`}</p>
          <p className="small">Tags: <b>{card.tags.length}</b></p>
        </div>
        <div className="cardItem-options">
          <Button variant="outlined" onClick={() => setShow(!show)}>{show ? 'Close' : 'More'}</Button>
          <Button variant="outlined">Edit</Button>
          <Button variant="outlined">Delete</Button>
        </div>
      </div>
      <div className="cardItem-hidden" style={{ height }}>
        <div className="cardItem-hidden__inner" ref={cardRef}>
          <p className="small">Sent messages: <b>{card.messagesSent}</b></p>
          <p className="small">Recieved messages: <b>{card.messagesReceived}</b></p>
          <p className="small">ID: <b>{card.id}</b></p>
          <p className="small">Account ID: <b>{card.accountId}</b></p>
          {card.tags.length !== 0 && 
            <div className="cardItem-tags">
              <h4>Tags:</h4>
              {card.tags.map(tag => (
                <Chip key={tag.name} label={tag.name} color="success" />
              ))}
            </div>
          }
          <div className="cardItem-newtag">
            <TextField size="small" label="New tag" variant="outlined" />
            <Button variant="contained">
              <CircularProgress color="inherit" />
              Add tag
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardItem