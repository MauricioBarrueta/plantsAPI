export interface Specie {
  common_name: string,
  scientific_name: string[],
  other_name: string[],
  family: any,
  origin: string[],
  type: string,
  dimension: string,
  dimensions: Dimensions,
  cycle: string,
  propagation: string[],
  hardiness: Hardiness,
  hardiness_location: HardinessLocation,
  watering: string,
  watering_general_benchmark: WateringGeneralBenchmark,
  sunlight: string[],
  pruning_month: string[],
  depth_water_requirement: any[]
  volume_water_requirement: any[]
  watering_period: any
  plant_anatomy: any[]
  pruning_count: any[]
  seeds: number
  maintenance: any
  "care-guides": string
  soil: any[]
  growth_rate: string
  drought_tolerant: boolean
  salt_tolerant: boolean
  thorny: boolean
  invasive: boolean
  tropical: boolean
  indoor: boolean
  care_level: string
  pest_susceptibility: any[]
  pest_susceptibility_api: string
  flowers: boolean
  flowering_season: any
  flower_color: string
  cones: boolean
  fruits: boolean
  edible_fruit: boolean
  edible_fruit_taste_profile: string
  fruit_nutritional_value: string
  fruit_color: any[]
  harvest_season: any
  leaf: boolean
  leaf_color: string[]
  edible_leaf: boolean
  cuisine: boolean
  medicinal: boolean
  poisonous_to_humans: number
  poisonous_to_pets: number
  description: string
  default_image: DefaultImage
}
  
  export interface Dimensions {
    type: string
    min_value: number
    max_value: number
    unit: string
  }
  
  export interface Hardiness {
    min: string
    max: string
  }
  
  export interface HardinessLocation {
    full_url: string
    full_iframe: string
  }
  
  export interface WateringGeneralBenchmark {
    value: string
    unit: string
  }
  
  export interface DefaultImage {
    license: number
    license_name: string
    license_url: string
    original_url: string
    regular_url: string
    medium_url: string
    small_url: string
    thumbnail: string
  }
  