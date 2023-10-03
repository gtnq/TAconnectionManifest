const generate =(all) => all.map((item, ind) => {
    let title = item.date.date;
    //console.log(item.dep)
    let departure = item.dep ? "ARV" : "DEP";
    if (item.flight === "departure time") {
        departure = "";
    }

    if (title === all[ind - 1]?.date.date) {
        return (
            <div>
                {item.flight} @ {item.date.time} {departure}
            </div>
        );
    } else {
        return (
            <>
                <div>{title}</div>
                <div>
                    {item.flight} @ {item.date.time} {departure}
                </div>
            </>
        );
    }
});

export default generate