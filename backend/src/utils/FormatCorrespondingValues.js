const formatDataAndHour = require('./FormatDataAndHour')

module.exports = function format(values){
    return values.map(value => {
        value.createdAt = formatDataAndHour(value.createdAt)
        delete value.articleId
        return value
    })
}