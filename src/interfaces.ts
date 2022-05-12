
export interface tag {
  name: string
  value: string
  remove: boolean
}

export interface img {
  url: string
  fullUrl: string
  fetchedAt: string
}

export interface chat {
  lastMessage: string
}

export interface contact {
  id: string
  accountId: string
  type: string
  name: string
  platformNames: string[]
  createdAt: string
  updatedAt: string
  phoneNumber: string
  email: string
  img: img
  tags: tag[]
  assignee: string | null
  assigner: string
  messagesSent: number
  messagesReceived: number
  chat: chat
}

export interface IFilterData {
  includeTags?: string
  excludeTags?: string
  sentMin?: string
  sentMax?: string
  recvMin?: string
  recvMax?: string
}