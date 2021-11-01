import axios from 'axios'

const SERVER_URL = 'http://localhost:5000'

export async function sendFeedbackService(data) {
    try {
        const response = await axios.post(`${SERVER_URL}/feedback`, data)
        return response
    } catch(err) {
        return false
    }
}

export async function getFeedbackService() {
    try {
        const response = await axios.get(`${SERVER_URL}/marketing`)
        return response
    } catch(err) {
        return false
    }
}