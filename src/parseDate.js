function parseDateString(dateStr) {
    console.log(dateStr)
    const months = {
        'Jan': 0,
        'Feb': 1,
        'Mar': 2,
        'Apr': 3,
        'May': 4,
        'Jun': 5,
        'Jul': 6,
        'Aug': 7,
        'Sep': 8,
        'Oct': 9,
        'Nov': 10,
        'Dec': 11
    };

    const parts = dateStr.split(' ');

    const month = months[parts[0]];
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    const timeParts = parts[3].split(':');
    let hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1].substr(0, 2), 10);
    const amPm = timeParts[1].substr(2);

    if (amPm === 'PM' && hours < 12) {
        hours += 12;
    } else if (amPm === 'AM' && hours === 12) {
        hours = 0;
    }

    let date = new Date(year, month, day, hours, minutes);
    let dateString = date.toDateString()
    let timeStr = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

    return {date: dateString, time: timeStr};
}

export default parseDateString;