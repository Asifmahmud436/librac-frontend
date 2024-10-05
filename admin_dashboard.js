const isAdmin = () => {
    const user_id = localStorage.getItem('user_id');
    
    fetch(`https://librac-backend.vercel.app/accounts/user/?user_id=${user_id}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.is_staff === true) { 
                document.querySelector('.student-course-container').style.display = 'none';
                document.querySelector('.teacher-course-container').style.display = 'none';
                document.querySelector('.admin-container').style.display = 'block';
                document.querySelector('.dashboard-body').style.backgroundColor = 'bisque';
            } 
            else {
                document.querySelector('.admin-container').style.display = 'none';
            }
        })
        .catch(error => console.error('Error:', error));
};

const getTeachers = () =>{
    fetch('https://librac-backend.vercel.app/teachers/list/')
        .then((res) => res.json())
        .then((data) => loadTeachers(data));
}

const loadTeachers = (teachers) =>{
    const container = document.getElementById('teacher-name');
    container.innerHTML = '';
    teachers.forEach(teacher => {
        container.innerHTML += `<option value="${teacher.id}">${teacher.user.first_name} ${teacher.user.last_name}</option>`;
    });
}

function handleCourse(event){
    event.preventDefault();
    const token = localStorage.getItem('token');
    const name = document.getElementById('course-name').value;
    const code = document.getElementById('course-code').value;
    const description = document.getElementById('course-description').value;
    const teacher = document.getElementById('teacher-name').value;

    if(token){
        const courseData = {
            name : name,
            code : code,
            description : description,
            teacher : teacher,
        }
        fetch('https://librac-backend.vercel.app/courses/list/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(courseData)
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
            console.log('Course Added to Curriculum:', data);
            alert('Course added successfully!');
            window.location.href = 'dashboard.html'; 
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error adding the course.');
        });
    }
}


isAdmin();
getTeachers();
