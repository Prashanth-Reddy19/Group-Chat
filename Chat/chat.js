const chattable = document.getElementById('chattable');

const message = document.getElementById('message');

const sendbtn = document.getElementById('sendbtn');

sendbtn.addEventListener('click', sendmessage);

async function sendmessage(e) {
    try {
        e.preventDefault();
        if (message.value === '') {
            msg.innerHTML = "Please Enter message";
            setTimeout(() => {
                msg.innerHTML = "";
            }, 3000)
        }
        else {
            const messagedata = {
                message: message.value
            }
            const token = localStorage.getItem('token')
            const response = await axios.post('http://localhost:3000/chat/add-message', messagedata, { headers: { "Authorization": token } })

            console.log(response.data, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

            showmessage(response.data.message.name, response.data.message.message)

            message.value = '';
        }
    }
    catch (err) {
        console.log(err);
        msg.innerHTML = "";
        msg.innerHTML = msg.innerHTML + `<div>${err.data.message}</div>`;
        setTimeout(() => {
            msg.innerHTML = "";
        }, 3000)
    }
}

async function showmessage(name, message) {
    try {
        chattable.innerHTML += `<tr><td>${name}-${message}</td></tr>`;
    } catch (err) {
        console.log(err);
    }
}

window.addEventListener('DOMContentLoaded', getchats);

async function getchats(e) {
    try {
        e.preventDefault();

        const response = await axios.get('http://localhost:3000/chat/get-message')

        console.log(response, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

        for (let i = 0; i < response.data.message.length; i++)
            showmessage(response.data.message[i].name, response.data.message[i].message)

    }
    catch (err) {
        console.log(err);
        msg.innerHTML = "";
        msg.innerHTML = msg.innerHTML + `<div>${err.data.message}</div>`;
        setTimeout(() => {
            msg.innerHTML = "";
        }, 3000)
    }
}