import axios from 'axios'
import { config } from '../config'
export const courseService = {
    findAll,
    findById,
    save,
    remove,
    authToken
}
function findAll() {
    return instance.get('/api/courses')
}
function findById(id) {
    return instance.get(`/api/course/${id}`)
}
function save(course) {
    return instance.post('/api/course', course)
}
function remove(id) {
    return instance.delete(`/api/courses/${id}`)
}
// -- Axios https://github.com/axios/axios#config-defaults
const instance = axios.create({
    baseURL: `${config.API_BASE_URL}`,
    headers: {
        'Content-Type': 'application/json'
    }
})
instance.interceptors.response.use(response => {
    return response
}, function (error) {
    if (error.response) {
        return { status: error.response.status }
    }
    if (error.request) {
        return { error: error.request }
    }
    return { error: error.message }
})
// -- Helper functions
export function authToken(token) {
    // set default header to be sent with every request
    instance.defaults.headers.common.Authorization = `Bearer ${token}`
}