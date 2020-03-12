const postFormData = async (url = '', headers = {}, body = new FormData()) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
    })
    return await response.json()
}

const postData = async (url = '', 
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}, 
    body = '') => {
    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
    })
    return await response.json()
}

const getData = async (url = '', headers = {}) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: headers,
    })
    return await response.json()
}
const putData = async (url = '', headers = {}, body = {}) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body)
    })
    return await response.json()
}
const deleteData = async (url = '', headers = {}, body = {}) => {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(body)
    })
    return await response.json()
}

export {
    postData,
    getData,
    putData,
    deleteData,
    postFormData
}