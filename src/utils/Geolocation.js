import axios from 'axios';
import { GOOGLE_API_KEY as key } from '../global/Constants';

export async function searchPlace(input, sessiontoken, location) {
    return new Promise(resolve => {
        axios.get(
            'https://maps.googleapis.com/maps/api/place/autocomplete/json',
            { params: { input, key, sessiontoken, origin: `${location.lat},${location.lng}` }}
        ).then(res => resolve(res))
    });
}

export async function getPlaceDetail(place_id, sessiontoken) {
    return new Promise(resolve => {
       axios.get(
           'https://maps.googleapis.com/maps/api/place/details/json',
           { params: { key, place_id, sessiontoken, fields: 'formatted_address,name,geometry,photos,opening_hours' } }
       ).then(res => resolve(res));
    });
}
