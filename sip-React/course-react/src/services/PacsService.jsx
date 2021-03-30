import axios from 'axios'
export const PacsService = {
    find,
    authToken,
}
function  find() {
    authToken()
    var response = instance.get('http://localhost:8085/orthanc/instances/5cd65944-8a37c5f3-ecd23660-3238d171-41728b44/preview')
    console.log(response.data)

     
}

// -- Axios https://github.com/axios/axios#config-defaults
const instance =  axios.create({
    //baseURL: `${config.ORTHANC_BASE_URL}`,
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
    console.log(response)
    return response
    
})

// -- Helper functions
export function authToken() {
    // set default header to be sent with every request
    instance.defaults.headers.common.Authorization = `Basic b3J0aGFuYzpnMDREIWMwbSNvclQoaClhbmtz`
}