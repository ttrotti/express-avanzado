process.on('start', cant => {
    const n = cant || 100000000;
    const result = {};
    console.log('forStarted')
    for(let i = 0; i < n; i++) {
        const randomNum = Math.floor(Math.random() * 1000)
        if(!result[randomNum]) result[randomNum] = 0
        ++result[randomNum]
    }
    process.send({result: result})
})