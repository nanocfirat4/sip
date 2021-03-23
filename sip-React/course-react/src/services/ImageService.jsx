import axios from 'axios'
import { config } from '../config'
export const ImageService = {
    findAll,
    findById,
    authToken
}
function findAll() {
    return instance.get('/api/images')
}
function findById(id) {
    return instance.get(`/api/image/${id}`)
}

// -- Axios https://github.com/axios/axios#config-defaults
const instance = axios.create({
    baseURL: `${config.API_BASE_URL}`,
    headers: {
        'Content-Type': 'application/json'
    }
})

instance.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
})

instance.interceptors.response.use(response => {
    console.log('Response:', JSON.stringify(response, null, 2))
    return response
})

// -- Helper functions
export function authToken(token) {
    // set default header to be sent with every request
    instance.defaults.headers.common.Authorization = `Bearer ${token}`
}