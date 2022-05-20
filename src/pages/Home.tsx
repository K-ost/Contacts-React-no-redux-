import React, { useEffect, useState } from 'react'
import { CircularProgress, Grid } from '@mui/material'
import Filter from '../components/Filter/Filter'
import Header from '../components/Header/Header'
import Search from '../components/Search/Search'
import { useFetch } from '../helpers/useFetch'
import { contact, IFilterData, tag } from '../interfaces'
import { url } from '../helpers/helpers'
import CardItem from '../components/CardItem/CardItem'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

const Home: React.FC = () => {
  const [contacts, setContacts] = useState<contact[]>([])
  const [totalCount, setTotalCount] = useState<number>(1)
  const [tags, setTags] = useState<tag[]>([])
  const [count, setCount] = useState<number>(10)
  const { request } = useFetch()
  const [loading, setLoading] = useState<boolean>(true)
  const [loadFilter, setLoadFilter] = useState<boolean>(false)
  const [filters, setFilters] = useState<string>('')
  const [searchFind, setSearchFind] = useState<string>('')
  const token = useSelector((state: RootState) => state.app.token)


  // Fetch contacts
  useEffect(() => {
    const getContacts = async () => {
      const data = await request(`${url}/contacts?returnTotalCount=true&count=${count}${filters}${searchFind}`, 'GET', null, token)
      setTotalCount(data.totalCount)
      setContacts(data.contacts)
      setLoading(false)
      setLoadFilter(false)
    }
    if (token) {
      if (loading) getContacts()
    }
  }, [request, token, loading, count, filters, searchFind])


  // Fetch tags
  useEffect(() => {
    const getTags = async () => {
      const data = await request(`${url}/tags`, 'GET', null, token)
      setTags(data.tags)
    }
    token && getTags()
  }, [request, token])
  

  // Scroll
  const scrolFunc = (e: any) => {
    const winHeight = e.target.scrollHeight
    const scrollBottom = e.target.scrollTop + window.innerHeight
    if (scrollBottom - winHeight === 0) {
      setCount(prev => prev + 10)
      setLoading(true)
    }
  }

  // Listening scroll
  useEffect(() => {
    document.querySelector('.maincontent')?.addEventListener('scroll', scrolFunc)
    return () => {
      document.querySelector('.maincontent')?.removeEventListener('scroll', scrolFunc)
    }
  }, [])


  // searchFunc
  const searchFunc = (value: string) => {
    setSearchFind(`&q=${value}`)
    setCount(10)
    setLoading(true)
  }

  
  // incFunc
  const incFunc = (info: IFilterData) => {
    let tags = info.includeTags ? `&tags=${info.includeTags}` : ''
    let notTags = info.excludeTags ? `&notTags=${info.excludeTags}` : ''
    let minMessagesSent = info.sentMin ? `&minMessagesSent=${info.sentMin}` : ''
    let maxMessagesSent = info.sentMax ? `&maxMessagesSent=${info.sentMax}` : ''
    let minMessagesRecv = info.recvMin ? `&minMessagesRecv=${info.recvMin}` : ''
    let maxMessagesRecv = info.recvMax ? `&maxMessagesRecv=${info.recvMax}` : ''
    setFilters(`${tags}${notTags}${minMessagesSent}${maxMessagesSent}${minMessagesRecv}${maxMessagesRecv}`)
    setCount(20)
    setLoading(true)
    setLoadFilter(true)
  }


  return (
    <Grid container spacing={0} className="app">
      <Filter tags={tags} incFunc={incFunc} load={loadFilter} />

      <Grid item md={9} className="maincontent">
        <div className="maincontent-header">
          <Header count={totalCount} />
          <Search handler={searchFunc} />
        </div>

        <div className="maincontent-body">
          {contacts?.map(el => <CardItem key={el.id} card={el} />)}
          
          {
            ((contacts.length >= 20 && contacts.length === 0) || contacts.length < totalCount)
            ? <div className="maincontent-more">
              <CircularProgress />
            </div>
            : null
          }
          {totalCount === 0 && <div className="empty">Contacts not found</div>}
        </div>
      </Grid>
    </Grid>
  )
}

export default Home