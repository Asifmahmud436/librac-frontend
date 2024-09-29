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
    data.forEach(course => {
        const container = document.querySelector('.student-course-container');
        container.innerHTML +=`
            <div class="course-card">
                <h3 class="course-title course-title-owned">${course.course_name}</h3>
                <button class="course-btn drop-btn" type="submit">Drop Course</button>
            </div>
        `
    });
}
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