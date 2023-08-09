export interface caresResponse {
    data: Cares[]
    to: number
    per_page: number
    current_page: number
    from: number
    last_page: number
    total: number
}

export interface Cares {
    id: number
    species_id: number
    common_name: string
    scientific_name: string[]
    section: Section[]
}

export interface Section {
    id: number
    type: string
    description: string
}
  