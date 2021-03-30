import axios from 'axios'


export const PacsService = {
    find,
    authToken,
}

function find() {
    console.log(instance.get('http://localhost:8085/orthanc/instances/e6060fd2-81ee48ae-68ac5bd2-325c5ef6-955a3576/preview'))
}

// -- Axios https://github.com/axios/axios#config-defaults
const instance = axios.create({
    //baseURL: `${config.ORTHANC_BASE_URL}`,
    headers: {
        'Content-Type': 'image/png',
        'Access-Control-Allow-Origin': '*'
    },
    auth: {
        username: "orthanc",
        password: "g04D!c0m#orT(h)anks"
    }
})

instance.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
})

instance.interceptors.response.use(response => {
    console.log('Response:', JSON.stringify(response, null, 2))
    console.log(response)
    return response
    
})

// -- Helper functions
export function authToken() {
    // set default header to be sent with every request
    instance.defaults.headers.common.Authorization = `Basic b3J0aGFuYzpnMDREIWMwbSNvclQoaClhbmtz`
}