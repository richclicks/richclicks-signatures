const axios  = require('axios');
const seed   = require('../../../utils/save-seed.js');


// Once a googel sheet is "published to the web" we can access its JSON
// via a URL of this form. We just need to pass in the ID of the sheet
// which we can find in the URL of the document.
// const sheetID = "2PACX-1vRTw-J5XfC8H5VcGnte0CCUWeCMTQHjg7sh_5c4HmimcMnOIf3i3XJJgC3zC8N7UNTs02vfsvNYVKRU";
const sheetID = "1p53sbNLw_uc14cHlMrMbXFo00woRF1oHuJNFLNyfBgs";
const googleSheetUrl = `https://spreadsheets.google.com/feeds/list/${sheetID}/default/public/values?alt=json`;
// const googleSheetUrl = `https://spreadsheets.google.com/feeds/list/${sheetID}/od6/public/values?alt=json`;



module.exports = () => {
  return new Promise((resolve, reject) => {
    console.log(`Requesting content from ${googleSheetUrl}`);
    axios.get(googleSheetUrl)
      .then(response => {
        // massage the data from the Google Sheets API into
        // a shape that will more convenient for us in our SSG.
        var data = {
          "content": []
        };
        response.data.feed.entry.forEach(item => {
          data.content.push({
            "name": item.gsx$name.$t,
            "imgext": item.gsx$imgext.$t,
            "role": item.gsx$role.$t,
            "engtel": item.gsx$engtel.$t,
            "itatel": item.gsx$itatel.$t,
            //"tel_ita": item["gsx$tel_ita"].$t,
            //"tel_eng": item["gsx$tel_eng"].$t,
            //"skype_id": item["gsx$skype_id"].$t,
            "skype": item.gsx$skype.$t,
            "skypename": item.gsx$skypename.$t,
            
          })
        });
        // stash the data locally for developing without
        // needing to hit the API each time.
        seed(JSON.stringify(data), `${__dirname}/../dev/sheet.json`);
        // resolve the promise and return the data
        resolve(data);
      })
      // uh-oh. Handle any errrors we might encounter
      .catch(error => {
        console.log('Error :', error);
        reject(error);
      });
  })
}
