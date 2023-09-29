function filterInfo(string,setAll) {
    //match 4 digit number either start with AS or plain 4 digit number
    //also filter out Oct 01, 2023 10:57PM format using regex

    let regex = /AS[0-9]{4}$|^[0-9]{4}$|[A-Za-z]+ (0?[1-9]|[12][0-9]|3[01]), [A-Za-z0-9]+ (0?[0-9]|1[0-9]|2[0-3]):[0-9]+[A-Za-z]+/i
    string = string.filter((item) => {
        return regex.test(item)
    })
    //keep unique
    string = [...new Set(string)]
    let result = []
    for (let i = 0; i < string.length; i +=2) {
        result.push({flight: string[i], time: string[i+1]})
    }
    return result
    
    
}   




export default filterInfo