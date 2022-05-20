import React, { useState } from 'react'
import { Button, CircularProgress, Grid, TextField } from '@mui/material'
import logo from '../../assets/svg/logo.svg'
import { IFilterData, tag } from '../../interfaces'
import './filter.scss'
import SelectItem from './SelectItem'

export interface IFilter {
  tags: tag[]
  incFunc: (info: any) => void
  load: boolean
}

const Filter: React.FC<IFilter> = ({ tags, incFunc, load }) => {
  const [valIncTags, setValIncTags] = useState<string>('')
  const [valExcTags, setValExcTags] = useState<string>('')
  const [sentMin, setSentMin] = useState<string>('')
  const [sentMax, setSentMax] = useState<string>('')
  const [recvMin, setRecvMin] = useState<string>('')
  const [recvMax, setRecvMax] = useState<string>('')
  
  // saveFilters
  const saveFilters = () => {
    const filterData: IFilterData = {}
    filterData['includeTags'] = valIncTags
    filterData['excludeTags'] = valExcTags
    filterData['sentMin'] = sentMin
    filterData['sentMax'] = sentMax
    filterData['recvMin'] = recvMin
    filterData['recvMax'] = recvMax
    incFunc(filterData)
  }



  return (
    <Grid item md={3} className="aside">
      <div className="aside-logo"><img src={logo} alt="" /></div>
      <div className="filter-body">

        <SelectItem title="Include tags" id="inc-tags" list={tags} func={(value: string) => setValIncTags(value)} />
        <SelectItem title="Exclude tags" id="exc-tags" list={tags} func={(value: string) => setValExcTags(value)} />

        <h4>Message sent:</h4>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField size="small" id="sent-min" label="Min" variant="outlined" fullWidth onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSentMin(e.target.value)} />
          </Grid>
          <Grid item sm={6}>
            <TextField size="small" id="sent-max" label="Max" variant="outlined" fullWidth onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSentMax(e.target.value)} />
          </Grid>
        </Grid>

        <h4>Message recieved:</h4>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField size="small" id="sent-min" label="Min" variant="outlined" fullWidth onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecvMin(e.target.value)} />
          </Grid>
          <Grid item sm={6}>
            <TextField size="small" id="sent-max" label="Max" variant="outlined" fullWidth onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecvMax(e.target.value)} />
          </Grid>
        </Grid>
       
      </div>
      <div className="filter-footer">
        <Button variant="contained" color="success" fullWidth onClick={saveFilters}>
          {load
            ? <><CircularProgress color="inherit" /> Loading...</>
            : 'Save filters'
          }
        </Button>
      </div>
    </Grid>
  )
}

export default Filter