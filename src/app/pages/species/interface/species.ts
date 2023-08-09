export interface apiResponse {
    data: Species[],
    to: number,
    per_page: number,
    current_page: number,
    from: number,
    last_page: number,
    total: number
}

export interface Species {
    id: number,
    common_name: string,
    scientific_name: string[],
    other_name: string[],
    cycle: string,
    watering: string,
    sunlight: string[],
    default_image: DefaultImage
}

export interface DefaultImage {
    licence: number,
    original_url: string,
    thumbnail: string
}
