const getAllCourses = () => {
    fetch(`http://127.0.0.1:8000/courses/list/`)
        .then((res) => res.json())
        .then((data) => loadCoureForReg(data));
}
const getStudentId = () => {
    const user_id = localStorage.getItem('user_id');
    fetch(`http://127.0.0.1:8000/students/by_user_id/?user_id=${user_id}`)
        .then((res) => res.json())
        .then((data) => localStorage.setItem('special_id',data.id));
}
getStudentId();
const loadCoureForReg = (courses) => {
    const container = document.getElementById('advising-courses');
    container.innerHTML = ''; // Clear previous courses if needed

    courses.forEach(course => {
        const courseCard = `
            <div class="course-card advising-card">
                <h2 class="course-title course-code">${course.code}</h2>
                <h3 class="course-title course-name">${course.name}</h3>
                <h3 class="course-title course-teacher_name">by ${course.teacher_name} ${course.teacher_last_name}</h3>
                <p class="course-description">${course.description}</p>
                <button class="course-btn" type="button" data-course-id="${course.id}">Append</button>
            </div>
        `;
        container.innerHTML += courseCard;
    });

    // Add event listeners to all "Append" buttons
    const appendButtons = container.querySelectorAll('.course-btn');
    appendButtons.forEach(button => {
        button.addEventListener('click', () => appendCourse(button.dataset.courseId)); // Pass course ID to the handler
    });
}

const appendCourse = (courseId) => {
    const token = localStorage.getItem('token'); // Get the token for authorization
    const special_id = localStorage.getItem('special_id'); // Retrieve the student ID from localStorage

    if (token) {
        const courseData = {
            course: courseId,
            student: special_id,
            drop_course: false,
        };

        fetch('http://127.0.0.1:8000/dashboards/list/', { // Use the correct URL for creating a new dashboard entry
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
            console.log('Course appended successfully:', data);
            alert('Course appended successfully!');
            // Optionally refresh the courses list or update the UI
            // getAllCourses(); // Uncomment if you want to refresh the list
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error appending the course.');
        });
    } else {
        alert('You must be logged in to append a course.');
    }
}

// Initial fetch to load all courses
getAllCourses();
