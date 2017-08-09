require('dotenv').load()

const {KRAKEN_API_KEY, KRAKEN_API_SECRET} = process.env

const KrakenClient = require('kraken-api');
const kraken       = new KrakenClient(KRAKEN_API_KEY, KRAKEN_API_SECRET);

const TRADE_KEYS = ['price', 'volume', 'time', 'buy/sell', 'market/limit', 'miscellaneous']

;(async () => {
	// Display user's balance
	console.log(await kraken.api('Balance'));
  // console.log(await kraken.api('AssetPairs'));

	// Get Ticker Info
  const TradesResponse = await kraken.api('Trades', { pair : 'XETHZUSD' })
  const Trades = TradesResponse.result.XETHZUSD

  Trades.forEach(Trade => {
    const FormattedTrade = Trade.reduce((prev, curr, index) => {
      prev[TRADE_KEYS[index]] = curr
      return prev
    }, {})
    console.log(FormattedTrade)
  })
})()

