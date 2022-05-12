import React, { useState } from 'react'
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import { tag } from '../../interfaces';

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

interface ISelectItem {
  list: tag[]
  title: string
  id: string
  func: (value: string) => void
}

const SelectItem: React.FC<ISelectItem> = ({ title, id, list, func }) => {
  const [val, setVal] = useState<string>('')

  // handleChange
  const handleChange = (e: any) => {
    const { value } = e.target
    setVal(value)
    func(value)
  }

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id={id}>{title}</InputLabel>
        <Select
          labelId={id}
          value={val}
          onChange={handleChange}
          input={<OutlinedInput label={title} />}
          MenuProps={MenuProps}
        >
          {list.map(el => (
            <MenuItem key={el.name} value={el.name}>
              {el.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default SelectItem