const doWorkPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve([1,23,4])
    },2000)
})

doWorkPromise.then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})