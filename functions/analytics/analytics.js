const { GoogleSpreadsheet } = require('google-spreadsheet')
const { google_json, sheet_id } = process.env
	
const handler = async (event) => {
  try {
	const doc = new GoogleSpreadsheet(sheet_id)
	await doc.useServiceAccountAuth(JSON.parse(google_json))
	await doc.loadInfo()
	const sheet = doc.sheetsByIndex[0]
    
    
	const data = JSON.stringify(event)
	const addedRow = await sheet.addRow(data)
		
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Success!` })
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
