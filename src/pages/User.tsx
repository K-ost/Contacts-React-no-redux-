import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../helpers/useFetch'
import { RootState } from '../store/store'

const User: React.FC = () => {
  const { id } = useParams()
  const { request } = useFetch()
  const token = useSelector((state: RootState) => state.app.token)

  useEffect(() => {
    
  }, [id, token, request])


  return (
    <div className="userpage">
      <p><Link to="/">Return to home</Link></p>
      <h1>User</h1>
      <p>Account ID: {id}</p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis laudantium suscipit saepe dolores quasi nulla id veniam eveniet voluptate, laborum fugiat ullam cupiditate distinctio officia ipsam, voluptas placeat maxime consectetur.
    </div>
  )
}

export default User