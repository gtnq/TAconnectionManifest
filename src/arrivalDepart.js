const filterArvDep = (data, arvDep) => {
    if (arvDep) {
        return data.filter((item) => item.dep === true)
    } else {
        return data.filter((item) => item.dep === false)
    }
}

export default filterArvDep;