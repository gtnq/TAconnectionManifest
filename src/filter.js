import parseDateString from "./parseDate"

function filterInfo(string) {
    //match 4 digit number either start with AS or plain 4 digit number
    //also filter out Oct 01, 2023 10:57PM format using regex

    let regex = /AS[0-9]{4}$|^[0-9]{4}$|[A-Za-z]+ (0?[1-9]|[12][0-9]|3[01]), [A-Za-z0-9]+ (0?[0-9]|1[0-9]|2[0-3]):[0-9]+[A-Za-z]+/i
    string = string.filter((item) => {
        return regex.test(item)
    })
    //keep unique
    let dateRegex = /[A-Za-z]+ (0?[1-9]|[12][0-9]|3[01]), [A-Za-z0-9]+ (0?[0-9]|1[0-9]|2[0-3]):[0-9]+[A-Za-z]+/i
    string = [...new Set(string)]
    let result = []
    for (let i = 0; i < string.length; i +=2) {
        //if the string is a date, parse it
        if (dateRegex.test(string[i+1])) {
            string[i+1] = parseDateString(string[i+1])
        }else {
            break
        }
        
        
        result.push({flight: string[i], time: string[i+1]})
    }
    return result
    
    
}   




export default filterInfo