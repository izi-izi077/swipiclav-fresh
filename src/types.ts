// Типы для Telegram Mini App знакомств

// Данные пользователя из Telegram
export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

// Данные инициализации Telegram WebApp
export interface InitData {
  user?: TelegramUser
  auth_token: string
  query_id?: string
  chat_type?: string
  chat_instance?: string
  start_param?: string
  can_send_after?: number
  signature?: string
}

// Данные профиля пользователя
export interface UserProfile {
  name: string
  age: number
  location: string
  bio: string
  photo?: string
  telegramId?: number
}

// Состояние экрана
export type Screen = 'auth' | 'profile' | 'cards'

// Данные карточки для свайпа
export interface CardData {
  id: string
  name: string
  age: number
  location: string
  bio: string
  photo: string
}
