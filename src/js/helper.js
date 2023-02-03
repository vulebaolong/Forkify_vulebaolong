import { TIMEOUT_SEC, LOG_STATE } from "./config.js"

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(
                new Error(`Request took too long! Timeout after ${s} second`)
            )
        }, s * 1000)
    })
}

export async function getJSON(url) {
    try {
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)])
        const data = await res.json()
        // console.log(res)
        if (!res.ok)
            throw new Error(`${data.message}, có lỗi xảy ra ${data.status}`)

        return data.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export function log(mess, data) {
    if (LOG_STATE) {
        console.groupCollapsed(mess)
        console.log(data)
        console.groupEnd()
    }
}
