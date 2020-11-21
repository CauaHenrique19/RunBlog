module.exports = function formatDataAndHour(string){
    const createdAt = string.toLocaleString()
    const data = createdAt.substring(0, createdAt.indexOf(" ")).split('-').reverse().join(',').replace(',', '/').replace(',', '/')
    const hour = createdAt.substring(10, createdAt.length - 3).replace(" ", "")
                    
    return string = `${data} às ${hour}`
}