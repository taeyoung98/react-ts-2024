const BASE_URL = "https://api.coinpaprika.com/v1"

// Promise
export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then(response => {
    return response.json()
  })
}

// async await
export async function fetchCoinInfo(coinId: string) {
  return await (await fetch(`${BASE_URL}/coins/${coinId}`)).json()
}

// async await (arrow func)
export const fetchCoinTickers = async(coinId: string) => {
  return await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json()
}