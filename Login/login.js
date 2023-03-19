async function login(event) {
    try {
        event.preventDefault();
        console.log(event.target.name)

        const loginDetails = {

            email: event.target.email.value,
            password: event.target.password.value
        }
        console.log(loginDetails)
        const response = await axios.post('http://localhost:3000/user/login', loginDetails)
        alert(response.data.message)
        console.log(response.data)
        localStorage.setItem('token', response.data.token)
        window.location.href = '../Group/group.html'

    } catch (err) {

        console.log(err);
        msg.innerHTML = "";
        msg.innerHTML = msg.innerHTML + `<div>${err.response.data.message}</div>`;
        setTimeout(() => {
            msg.innerHTML = "";
        }, 3000)
    }
}