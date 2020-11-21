const formatDataAndHour = require('./FormatDataAndHour')

module.exports = function formatCorrespondingValues(values){
    return values.map(value => {
        value.createdAt = formatDataAndHour(value.createdAt)
        delete value.articleId
        return value
    })
}