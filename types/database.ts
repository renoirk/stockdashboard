export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      portfolio: {
        Row: {
          id: string
          ticker: string
          name: string
          quantity: number
          avg_price: number
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          ticker: string
          name: string
          quantity: number
          avg_price: number
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          ticker?: string
          name?: string
          quantity?: number
          avg_price?: number
          notes?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type PortfolioItem = Database['public']['Tables']['portfolio']['Row']
export type PortfolioInsert = Database['public']['Tables']['portfolio']['Insert']
export type PortfolioUpdate = Database['public']['Tables']['portfolio']['Update']
