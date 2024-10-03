const getInfo = () =>{
    const user_id = localStorage.getItem('user_id');

    // fetch to load the name of the user
    fetch(`http://127.0.0.1:8000/accounts/user/?user_id=${user_id}`)
        .then((res) => res.json())
        .then((data) => loadName(data));

    // fetch to see if the user is student or teacher
    fetch(`http://127.0.0.1:8000/accounts/user/?user_id=${user_id}`)
        .then((res) => res.json())
        .then((data) => loadCourse(data));
};

const loadName = (data) =>{
    const container = document.querySelector('.name-ul');
    container.innerHTML += `<li><small>Assalamu Alaikum, ${data.username} ${data.last_name}!</small></li>`;
}

const loadCourse = (data) =>{
    // load all the courses of a student
    if(data.user_type == "Student"){

        fetch(`http://127.0.0.1:8000/dashboards/list/?student_name=${data.username}`)
        .then((res) => res.json())
        .then((data) => loadStudentCourses(data));
    }
    else{
        document.querySelector('.student-course-container').style.display = 'none';
        fetch(`http://127.0.0.1:8000/courses/list/?teacher_name=${data.username}`)
        .then((res) => res.json())
        .then((data) => loadTeacherCourses(data));
    }
}

const loadStudentCourses = (data) =>{
    if(data.length>0){
        data.forEach(course => {
            if(!course.drop_course){
                const container = document.querySelector('.student-course-container');
                const courseCard = document.createElement('div');
                courseCard.classList.add('course-card','student-course-card');
                courseCard.innerHTML +=
                `
                    <h3 class="course-title course-title-owned">${course.course_name}</h3>
                    <button class="course-btn drop-btn" type="button" data-course-id='${course.id}'>Drop Course</button>
                `;
                container.appendChild(courseCard);
                courseCard.querySelector('.drop-btn').addEventListener('click',()=>{
                    dropCourse(course.id);
                })
            }
        });
    }
    else{
        const container = document.querySelector('.student-course-container');
        container.innerHTML =`
            <h1>Go to the <a href="course_page.html">Advising Page</a> to Add Courses for this Semester</h1>
        `;
    }
}

const dropCourse = (courseId) => {
    const token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/dashboards/list/${courseId}/drop/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token here
        },
        body: JSON.stringify({ drop_course: true }), // Example payload
    })
    .then(response => {
        // Check if response is ok
        if (!response.ok) {
            throw new Error("Failed to drop course. Please try again."); // Throw an error for non-200 responses
        }
        return response.json(); // Return the JSON data if the response is OK
    })
    .then(data => {
        alert("Course dropped successfully");
        location.reload();  // Force page refresh to show updated data
    })
    .catch(error => {
        alert(error.message); // Show the error message
    });
};
const loadTeacherCourses = (data) =>{
    data.forEach(course => {
        const container = document.querySelector('.teacher-course-container');
        container.innerHTML +=`
            <div class="course-card teacher-course-card">
                <h3 class="course-title">${course.name}</h3>
                <p class="course-description">${course.description}</p>
                <button class="course-btn" type="submit">Drop Course</button>
            </div>
        `
    });
}

getInfo();
// alert()