const getName = () =>{
    const user_id = localStorage.getItem('user_id');
    fetch(`http://127.0.0.1:8000/accounts/user/?user_id=${user_id}`)
        .then((res) => res.json())
        .then((data) => getID(data));
};

const getID = (userInfo) =>{
    if(userInfo.user_type === "Student"){
        fetch(`http://127.0.0.1:8000/students/list/?student_name=${userInfo.username}`)
        .then((res) => res.json())
        .then((data) => {
            const studentId = data[0].id;
            loadStudent(studentId);
            
            // Add an event listener to the 'Save Changes' button to call editTeacher with the teacher ID
            document.getElementById('save-button').addEventListener('click', function() {
                editStudent(studentId);
            });
        });
    } else if (userInfo.user_type === "Teacher") {
        fetch(`http://127.0.0.1:8000/teachers/list/?teacher_name=${userInfo.username}`)
        .then((res) => res.json())
        .then((data) => {
            const teacherId = data[0].id;
            loadTeacher(teacherId);
            
            // Add an event listener to the 'Save Changes' button to call editTeacher with the teacher ID
            document.getElementById('save-button').addEventListener('click', function() {
                editTeacher(teacherId);
            });
        });
    }
};

const loadStudent = (id) => {
    const token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/students/list/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        }
    })
    .then((res) => res.json())
    .then(data => {
        document.getElementById('user-photo').src = data.image || '';
        document.getElementById('username').value = data.user.username || 'Add Something!';
        document.getElementById('first-name').value = data.user.first_name || 'Add Something!';
        document.getElementById('last-name').value = data.user.last_name || 'Add Something!';
        document.getElementById('phone-no').value = data.phone_no || '';
        document.getElementById('librac-id').value = data.librac_id || 'Add Something!';
        document.getElementById('address').value = data.address || 'Add Something!';
    })
    .catch(error => console.error('Error loading student data:', error));
};

const loadTeacher = (id) => {
    const token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/teachers/list/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        }
    })
    .then((res) => res.json())
    .then(data => {
        document.getElementById('user-photo').src = data.image || '';
        document.getElementById('username').value = data.user.username || 'Add Something!';
        document.getElementById('first-name').value = data.user.first_name || 'Add Something!';
        document.getElementById('last-name').value = data.user.last_name || 'Add Something!';
        document.getElementById('phone-no').value = data.phone_no || '';
        document.getElementById('librac-id').value = data.librac_id || 'Add Something!';
        document.getElementById('address').value = data.address || 'Add Something!';
    })
    .catch(error => console.error('Error loading teacher data:', error));
};

const editTeacher = (id) =>{
    const token = localStorage.getItem('token');
    
    const formData = new FormData();
    // formData.append('user.username', document.getElementById('username').value);
    // formData.append('user.first_name', document.getElementById('first-name').value);
    // formData.append('user.last_name', document.getElementById('last-name').value);
    formData.append('phone_no', document.getElementById('phone-no').value);
    formData.append('librac_id', document.getElementById('librac-id').value);
    formData.append('address', document.getElementById('address').value);
    
    const imageFile = document.getElementById('user-image').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }

    fetch(`http://127.0.0.1:8000/teachers/list/${id}/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Token ${token}`,
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Teacher updated successfully', data);
        loadTeacher(id); // Refresh teacher data after successful update
    })
    .catch(error => console.error('Error updating teacher:', error));
};
const editStudent = (id) =>{
    const token = localStorage.getItem('token');
    
    const formData = new FormData();
    // formData.append('user.username', document.getElementById('username').value);
    // formData.append('user.first_name', document.getElementById('first-name').value);
    // formData.append('user.last_name', document.getElementById('last-name').value);
    formData.append('phone_no', document.getElementById('phone-no').value);
    formData.append('librac_id', document.getElementById('librac-id').value);
    formData.append('address', document.getElementById('address').value);
    
    const imageFile = document.getElementById('user-image').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }

    fetch(`http://127.0.0.1:8000/students/list/${id}/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Token ${token}`,
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Student updated successfully', data);
        loadStudent(id); 
    })
    .catch(error => console.error('Error updating student:', error));
};

getName(); 
