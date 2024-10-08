const getAllTeachers = () => {
    fetch(`https://librac-backend.vercel.app/teachers/list/`)
        .then((res) => res.json())
        .then((data) => loadAllTeachers(data))
        .catch((error) => {
            console.error("Error fetching teachers:", error);
        });
}

const loadAllTeachers = (teachers) => {
    teachers.forEach(teacher => {
        const container = document.querySelector('#teacher-container');
        container.innerHTML +=
        `
            <div class="course-card faculty-card">
                <img class='teacher-img' src="${teacher.image}" alt="">
                <h3 class="course-title course-title-owned faculty-title">${teacher.user.username} ${teacher.user.last_name}</h3>
                <h4 class="course-title course-title-owned faculty-title">Designaion: ${teacher.designation}</h4>
                <h4 class="course-title course-title-owned faculty-title">Email: ${teacher.user.email}</h4>
                <h4 class="course-title course-title-owned faculty-title">Librac_id: ${teacher.librac_id}</h4>
            </div>
        `;
    });
}

getAllTeachers();
