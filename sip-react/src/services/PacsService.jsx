export const PacsService = {
    find,
}

function  find(pacsID) {
    var url = 'https://v000561.fhnw.ch/orthanc/instances/'+pacsID+'/preview';
    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'image/jpeg',
            'Authorization': 'Basic b3J0aGFuYzpnMDREIWMwbSNvclQoaClhbmtz'
        }
    }).then(res => res.blob());
}