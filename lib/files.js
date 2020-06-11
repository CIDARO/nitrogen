const fs = require('fs');

module.exports = {
    appendToFile: (filename, newData) => {
        const data = require(`${filename}`)
        data.push(newData);
        fs.writeFileSync(filename, JSON.stringify(data));
    },
    createEmptyFile: (filename) => {
        fs.writeFileSync(filename, JSON.stringify([]));
    }
}