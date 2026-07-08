// Типы для Telegram WebApp
export {}

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void
        expand: () => void
        close: () => void
        initDataUnsafe: {
          user?: {
            id: number
            first_name: string
            last_name?: string
            username?: string
            photo_url?: string
            language_code?: string
            is_premium?: boolean
            allows_write_to_pm?: boolean
          }
          auth_token?: string
          query_id?: string
          chat_type?: string
          chat_instance?: string
          start_param?: string
          can_send_after?: number
          signature?: string
        }
        themeParams: {
          bg_color?: string
          text_color?: string
          button_color?: string
          button_text_color?: string
          secondary_bg_color?: string
          hint_color?: string
          link_color?: string
        }
        colorScheme: 'light' | 'dark'
        version: string
        platform: string
        MainButton: {
          show: () => void
          hide: () => void
          setText: (text: string) => void
          setParams: (params: { color: string; text_color: string }) => void
          onClick: (callback: () => void) => void
          offClick: (callback: () => void) => void
          isActive: () => boolean
          enable: () => void
          disable: () => void
        }
        onEvent: (event: string, callback: (data: any) => void) => void
        offEvent: (event: string, callback: (data: any) => void) => void
        isExpanded: boolean
        headerColor: string
        backgroundColor: string
      }
    }
  }
}
