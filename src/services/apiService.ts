// File: src/services/apiService.ts

import axios from 'axios';

export const defaultArtworks = [
    {
        id: 1,
        title: 'Mona Lisa',
        place_of_origin: 'France',
        artist_display: 'Leonardo da Vinci',
        inscriptions: 'None',
        date_start: 1503,
        date_end: 1506,
    },
    {
        id: 2,
        title: 'The Starry Night',
        place_of_origin: 'Netherlands',
        artist_display: 'Vincent van Gogh',
        inscriptions: 'Oil on canvas',
        date_start: 1889,
        date_end: 1889,
    },
    {
        id: 3,
        title: 'The Last Supper',
        place_of_origin: 'Italy',
        artist_display: 'Leonardo da Vinci',
        inscriptions: 'Fresco',
        date_start: 1495,
        date_end: 1498,
    },
];

const API_URL = 'https://api.artic.edu/api/v1/artworks';

export const fetchArtworks = async (page: number) => {
    try {
        const response = await axios.get(`${API_URL}?page=${page}`);
        return response.data;
    } catch (error) {
        console.error('API failed, using default data.');
        return { data: defaultArtworks };
    }
};
