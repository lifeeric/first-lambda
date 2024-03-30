'use strict';
const fs = require('fs')
const papa = require('papaparse')

module.exports.handler = async (event) => {
  const stage = process.env.STAGE;
  const file = fs.createReadStream(`books-to-list-${stage}.csv`)
  const jsonData = await toJson(file)

  return jsonData

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};



const toJson = (file) => {
  return new Promise((resolve, reject) => {
    papa.parse(file, {
      header: true,
      complete(results) {
        resolve({data: results.data})
      },
      error(err) {
        reject(err)
      }
    })
  })
}