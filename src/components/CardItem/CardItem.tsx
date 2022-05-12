import React, { useState } from 'react'
import './carditem.scss'
import { Checkbox, Chip, Button } from '@mui/material'
import { contact } from '../../interfaces'

export interface ICard {
  card: contact
}

const CardItem: React.FC<ICard> = ({ card }) => {
  const [checked, setChecked] = useState<boolean>(false)
  const CardClass = checked ? 'cardItem cardItem-checked' : 'cardItem'
  
  return (
    <div className={CardClass}>
      <div className="cardItem-inner">
        <Checkbox onChange={() => setChecked(!checked)} />
        <div className="cardItem-details">
          <h4>{card.name}</h4>
          <p>{card.phoneNumber && `+${card.phoneNumber}`}</p>
          <p className="small">Sent masseges: <b>{card.messagesSent}</b></p>
          <p className="small">Recieved masseges: <b>{card.messagesReceived}</b></p>
        </div>
        <div className="cardItem-options">
          {card.tags.length !== 0 && <div className="cardItem-tags">
            {card.tags.map(tag => (
              <Chip key={tag.name} label={tag.name} color="success" />
            ))}
          </div>}
          <Button variant="outlined">More</Button>
        </div>
      </div>
    </div>
  )
}

export default CardItem