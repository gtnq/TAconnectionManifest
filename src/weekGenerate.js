const weekGenerate = (data) => {
    let arr = [],
        dup,
        today,
        title,
        counter
    data.map((item, ind) => {
        if (dup) {
            dup = false
            
        } else {
            title = item.date.date;
            if (ind + 1 < data.length) {
                if ((item.flight === data[ind + 1]?.flight && item.dep === data[ind + 1]?.dep) || item.flight === data[ind - 1]?.flight) {
                    dup = true
                }
            }

        }
        if (title === data[ind - 1]?.date.date){
            if (ind) {
                today.flights.push(item);
                if (ind + 1 >= data.length) {
                    arr.push(today);
                }
            }
        }
}