
const fs = require('fs')
const request = require('request')

module.exports = function downloadImage(url, path) {
    return new Promise((resolve) => {
        request.head(url, (err, res, body) => {

            request(url)
              .pipe(fs.createWriteStream(path))
              .on('close', () => resolve())
          })
    })
}
