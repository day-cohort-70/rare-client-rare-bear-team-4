export const doGet = async (url) => {
    return await fetch(url).then(res => res.json())
}

export const doGetOne = async (url) => {
    return await fetch(url).then(res => res.json())
}

export const doPut = async (url, body) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
}

export const doPost = async (url, body) => {
    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then(res => res.json())
}

export const doDelete = async (url) => {
    return await fetch(url, {method: 'DELETE'})
}
