const axios = require('axios')

export const BASE_URL = 'http://localhost:5000/currency/'

export const fetchTransactions = async () => {
  try {
    return await axios.get(`${BASE_URL}/converter?from=BRL&to=USD&amount=10&user_id=1`)
  } catch (e) {
    return []
}
}
