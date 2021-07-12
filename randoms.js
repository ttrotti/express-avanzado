process.on("message", cant => {
    const result = {};
    for(let i = 0; i < cant; i++) {
        const randomNum = Math.floor(Math.random() * 1000);
        if(!result[randomNum]) {
            result[randomNum] = 0
        }
        ++result[randomNum]
    }
    console.log(result)
    process.send({result: result})
})