const handleReg=(event)=>{
    event.preventDefault();
    const username = getVal('username');
    const first_name = getVal('first-name');
    const last_name = getVal('last-name');
    const email = getVal('email');
    const librac_id = getVal('librac-id');
    const designation = getVal('designation');
    const password = getVal('password');
    const confirm_password = getVal('confirm-password');
    const info = {
            username,
            first_name,
            last_name,
            librac_id,
            designation,
            email,
            password,
            confirm_password,
        };     
    if(password===confirm_password){
        fetch("https://librac-backend.vercel.app/teachers/register/",{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(info),
        })
            .then((res)=>(res.json()))
            .then((data)=>console.log(data))
        // console.log(itemName,serviceId);
        window.location.href = 'login.html';

    }   
    else{
        document.getElementById('error').innerText = 'Passwords Do Not Match 😢';
    }
};
const handleRegStudent=(event)=>{
    event.preventDefault();
    const username = getVal('username');
    const first_name = getVal('first-name');
    const last_name = getVal('last-name');
    const email = getVal('email');
    const librac_id = getVal('librac-id');
    const password = getVal('password');
    const confirm_password = getVal('confirm-password');
    const info = {
            username,
            first_name,
            last_name,
            librac_id,
            email,
            password,
            confirm_password,
        };     
    if(password===confirm_password){
        fetch("https://librac-backend.vercel.app/students/register/",{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(info),
        })
            .then((res)=>(res.json()))
            .then((data)=>console.log(data))
        // console.log(itemName,serviceId);
        window.location.href = 'login.html';

    }   
    else{
        document.getElementById('error').innerText = 'Passwords Do Not Match 😢';
    }
};

const getVal=(id)=>{
    const val =  document.getElementById(id).value;
    return val;
};

const handleLogin = (event) => {
    event.preventDefault();
    const username = getVal('username');
    const password = getVal('password');
    const info = {
        username,
        password,
    }
    const errorMessageDiv = document.getElementById('error-message');
    if (errorMessageDiv) {
        errorMessageDiv.textContent = '';
    }
    if(username && password){
        fetch(`https://librac-backend.vercel.app/accounts/login/`,{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(info),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((data) => {
            if (data.token && data.user_id) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user_id', data.user_id);
                localStorage.setItem('username', username);
                window.location.href = 'dashboard.html';
            } else if (data.error) {
                showErrorMessage(data.error);
            }
        }) 
        .catch((error) => {
            console.error("Fetch error: ", error);
            showErrorMessage('Login failed. Please try again.');
        });
    }
}

const showErrorMessage =(message)=>{
    const errorMessageDiv = document.getElementById('error-message');
    if(errorMessageDiv){
        errorMessageDiv.textContent = message;
        errorMessageDiv.style.color = 'red';
    }
};

const handleLogOut =()=>{
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    fetch(`https://librac-backend.vercel.app/accounts/logout/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
    .then((res) => res.json())
    .then(data => {
        console.log(data);
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        window.location.href = 'login.html';
    }
)};


