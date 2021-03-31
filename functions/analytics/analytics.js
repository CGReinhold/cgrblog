const { GoogleSpreadsheet } = require('google-spreadsheet')
const { google_json, sheet_id } = process.env
	
const handler = async (event) => {
  try {
	const doc = new GoogleSpreadsheet(sheet_id)
	await doc.useServiceAccountAuth(JSON.parse(google_json))
	await doc.loadInfo()
	const sheet = doc.sheetsByIndex[0]
    
    
	await sheet.addRow({
    referer: event?.headers?.referer || '',
    country: event?.multiValueHeaders?['X-Country'] || '' : '',
    agent: event?.headers?['user-agent'] || '' : '',
    date: new Date().toISOString(),
  })
		
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Success!` })
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
