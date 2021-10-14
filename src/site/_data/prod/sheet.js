const axios  = require('axios');
const seed   = require('../../../utils/save-seed.js');

// src/_data/all.js
require('dotenv').config();
const Airtable = require('airtable');
let base = new Airtable({ apiKey: process.env.KEY }).base('appnvJNwJP8gkEES7');

module.exports = () => {
  return new Promise((resolve, reject) => {
    let allDatasets = []; // change 'allDatasets' to something more relevant to your project
      base('richclicks-team') // change 'New' to your base name
        .select({ view: 'richclicks-team' }) // change 'All' to your view name
        .eachPage(
          function page(records, fetchNextPage) {
            records.forEach((record) => {
              allDatasets.push({
                "id" : record._rawJson.id,
                ...record._rawJson.fields
              });
            });
            fetchNextPage();
          },
          function done(err) {
            if (err) {
              reject(err)
              console.log('Error:', err);
            } else {
              resolve(allDatasets);
              console.log('Success:', JSON.stringify(allDatasets));
              return seed(JSON.stringify(allDatasets), `${__dirname}/../dev/sheet.json`);
            }
          }
        );
      });
    };



// // Once a googel sheet is "published to the web" we can access its JSON
// // via a URL of this form. We just need to pass in the ID of the sheet
// // which we can find in the URL of the document.
// // const sheetID = "2PACX-1vRTw-J5XfC8H5VcGnte0CCUWeCMTQHjg7sh_5c4HmimcMnOIf3i3XJJgC3zC8N7UNTs02vfsvNYVKRU";
// const sheetID = "1p53sbNLw_uc14cHlMrMbXFo00woRF1oHuJNFLNyfBgs";
// var query_params = new URLSearchParams({
//   'limit': 21
//   // 'query_type': 'and',
//   // 'Name': 'example value',
//   // 'Favourite Thing': 'example value',
//   // 'Image': 'example value'
// });
// const googleSheetUrl = 'https://sheet2api.com/v1/J6odEOHFT7yJ/richclicks-signatures/richclicks-signatures';

// // const googleSheetUrl = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json`;
// // old methode before August 2021 -> const googleSheetUrl = `https://spreadsheets.google.com/feeds/list/${sheetID}/default/public/values?alt=json`;
// // const googleSheetUrl = `https://spreadsheets.google.com/feeds/list/${sheetID}/od6/public/values?alt=json`;



// module.exports = () => {
//   return new Promise((resolve, reject) => {
//     console.log(`Requesting content from ${googleSheetUrl}`);
//     /*
//     fetch(`https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json`)
//       .then(res => res.text())
//       .then(text => {
//           const jsondata = JSON.parse(text.substr(47).slice(0, -2))
//           console.log('Success:', jsondata);
//     })
//     */
//     const result = axios.get(googleSheetUrl);
//     console.log('Success:', result);
//     var data = {
//       "content": []
//     };
//     data.content.push(result);
//     return seed(JSON.stringify(data), `${__dirname}/../dev/sheet.json`);
    
//     /*
//     axios(googleSheetUrl)
//       .then(response => response.json)
//       .then(data => {
//         console.log('Success:', data);
//         // stash the data locally for developing without
//         // needing to hit the API each time.
//         seed(JSON.stringify(data), `${__dirname}/../dev/sheet.json`);
//         // resolve the promise and return the data
//         resolve(data);
//       })
    
//     // uh-oh. Handle any errrors we might encounter
//     .catch(error => {
//       console.log('Error :', error);
//       reject(error);
//     });
    
    
//     axios.get(googleSheetUrl)
//       .then(response => {
//         // massage the data from the Google Sheets API into
//         // a shape that will more convenient for us in our SSG.
//         var data = {
//           "content": []
//         };
//         response.data.feed.entry.forEach(item => {
//           data.content.push({
//             "name": item.gsx$name.$t,
//             "imgext": item.gsx$imgext.$t,
//             "role": item.gsx$role.$t,
//             "engtel": item.gsx$engtel.$t,
//             "itatel": item.gsx$itatel.$t,
//             //"tel_ita": item["gsx$tel_ita"].$t,
//             //"tel_eng": item["gsx$tel_eng"].$t,
//             //"skype_id": item["gsx$skype_id"].$t,
//             "skype": item.gsx$skype.$t,
//             "skypename": item.gsx$skypename.$t,
            
//           })
//         });
//         // stash the data locally for developing without
//         // needing to hit the API each time.
//         seed(JSON.stringify(data), `${__dirname}/../dev/sheet.json`);
//         // resolve the promise and return the data
//         resolve(data);
//       })
//       // uh-oh. Handle any errrors we might encounter
//       .catch(error => {
//         console.log('Error :', error);
//         reject(error);
//       });
//       */
    
//   })
// }
