export interface pestResponse {
    data: Pest[],
    to: number,
    per_page: number,
    current_page: number,
    from: number,
    last_page: number,
    total:	number
}

export interface Pest {
  id: number
  common_name: string
  scientific_name: string
  other_name: any
  family: any
  description: Description[]
  solution: Solution[]
  host: string[]
  images: Image[]
}

export interface Description {
  subtitle: string
  description: string
}

export interface Solution {
  subtitle: string
  description: string
}

export interface Image {
  license: number
  license_name: string
  license_url: string
  original_url: string
  regular_url: string
  medium_url: string
  small_url: string
  thumbnail: string
}
