function getNotifications() {
    return new Promise((resolve, reject) => {
        // fetch('http://10.0.2.2:3000/messages').then((res) => {
            fetch('https://messaging-code-fest.herokuapp.com/messages').then((res) => {
            resolve(res.json())
        }).catch(err => {
            alert(JSON.stringify(err))
            reject(err)
        })
    })
}

function dismissNotification(id) {
    return new Promise((resolve, reject) => {
        // fetch('http://10.0.2.2:3000/messages/dismiss', {
            fetch('https://messaging-code-fest.herokuapp.com/messages/dismiss', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({id: id})
        }).then((res) => {
            // alert(id)
            // alert(JSON.stringify(res))
            resolve(res.json())
        }).catch(err => {
            // alert("ERROR")
            // alert(JSON.stringify(err))
            reject(err)
        })
    })
    
}

export {
    getNotifications,
    dismissNotification
}

export default getNotifications