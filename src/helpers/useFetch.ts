import { useCallback } from "react"

export const useFetch = () => {
  const request = useCallback(async (url: string, method: string = 'GET', body: string | null = null, token?: string) => {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body
    })
    const data = await response.json()
    return data
  }, [])

  return { request }
}