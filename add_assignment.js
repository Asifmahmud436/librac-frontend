const getInfo = () =>{
    const user_id = localStorage.getItem('user_id');

    // fetch to load the course of the teachers to set assignment
    fetch(`http://127.0.0.1:8000/accounts/user/?user_id=${user_id}`)
        .then((res) => res.json())
        .then((data) => loadCourse(data.username));

    // fetch to load the name of the user
    fetch(`http://127.0.0.1:8000/accounts/user/?user_id=${user_id}`)
        .then((res) => res.json())
        .then((data) => loadName(data));

    // fetch to see if the user is student or teacher
    fetch(`http://127.0.0.1:8000/accounts/user/?user_id=${user_id}`)
        .then((res) => res.json())
        .then((data) => {
            if(data.user_type=='Student'){
                document.querySelector('.assignment-container').style.display = 'none';
            }
        });
};

const loadName = (data) =>{
    const container = document.querySelector('.name-ul');
    container.innerHTML += `<li><small>Assalamu Alaikum, ${data.username} ${data.last_name}!</small></li>`
}

const loadCourse = (name) =>{
    fetch(`http://127.0.0.1:8000/courses/list/?teacher_name=${name}`)
    .then((res) => res.json())
    .then((data) => displayCourse(data));
}

const displayCourse = (courses) =>{
    const container = document.getElementById('course');
    // Clear existing options if needed
    container.innerHTML = ''; // Optional: Clear existing options

    courses.forEach(course => {
        container.innerHTML += `<option value="${course.id}">${course.name}</option>`;
    });
}

function handleAssignment(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const course = document.getElementById('course').value;
    const marks = parseInt(document.getElementById('marks').value, 10); // Ensure marks is an integer
    const token = localStorage.getItem('token');

    if (token) {
        const assignmentData = {
            name: name,
            course: course,  // Ensure this is the course ID
            marks: marks,
        };

        fetch('http://127.0.0.1:8000/assignments/list/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(assignmentData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    console.error('Server responded with error:', err);
                    throw new Error('Network response was not ok.');
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Assignment submitted:', data);
            alert('Assignment submitted successfully!');
            // window.location.href = 'dashboard.html'; 
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your assignment.');
        });
    } else {
        alert('You must be logged in to submit an assignment.');
    }
}

getInfo();