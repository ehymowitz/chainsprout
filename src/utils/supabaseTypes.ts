export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      links: {
        Row: {
          description: string | null
          id: number
          link: string | null
          title: string
          user: number
        }
        Insert: {
          description?: string | null
          id?: number
          link?: string | null
          title: string
          user: number
        }
        Update: {
          description?: string | null
          id?: number
          link?: string | null
          title?: string
          user?: number
        }
      }
      users: {
        Row: {
          id: number
          name: string | null
          password: string | null
        }
        Insert: {
          id?: number
          name?: string | null
          password?: string | null
        }
        Update: {
          id?: number
          name?: string | null
          password?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      continents:
        | "Africa"
        | "Antarctica"
        | "Asia"
        | "Europe"
        | "Oceania"
        | "North America"
        | "South America"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
