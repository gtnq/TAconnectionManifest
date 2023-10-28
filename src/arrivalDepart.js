const filterArvDep = (data, arvDep) => {
    if (arvDep) {
        return data.filter((item) => item.dep === true)
    } else {
        console.log(data)
        return data.filter((item) => typeof item.dep === 'object')
    }
}

export default filterArvDep;