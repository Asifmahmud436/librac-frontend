const loadUser = () => {
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    fetch(`http://127.0.0.1:8000/accounts/user/?user_id=${user_id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        }
    })
    .then((res) => res.json())
    .then(data => {
        document.getElementById('user-photo').src = data.image; // Fallback to a default image if none is provided
        document.getElementById('username').value = data.user.username || 'Add Something!';
        document.getElementById('first-name').value = data.user.first_name || 'Add Something!';
        document.getElementById('last-name').value = data.user.last_name || 'Add Something!';
        document.getElementById('phone-no').value = data.phone_no || '';
        document.getElementById('librac-id').value = data.librac_id || 'Add Something!';
        document.getElementById('address').value = data.address || 'Add Something!';
        
    })
    .catch(error => {
        console.error('Error loading user data:', error);
    });
};



document.getElementById('save-button').addEventListener('click', function() {
    const user_id = localStorage.getItem('user_id'); // Make sure this calculation is correct
    const token = localStorage.getItem('token');
    
    const formData = new FormData();
    formData.append('user.username', document.getElementById('username').value);
    formData.append('user.first_name', document.getElementById('first-name').value);
    formData.append('user.last_name', document.getElementById('last-name').value);
    formData.append('phone_no', document.getElementById('phone-no').value);
    formData.append('librac_id', document.getElementById('librac-id').value);
    formData.append('address', document.getElementById('address').value);
    
    
    const imageFile = document.getElementById('user-image').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }

    fetch(`http://127.0.0.1:8000/students/list/${user_id}/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Token ${token}`,
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('User updated successfully', data);
        loadUser(); 
    })
    .catch(error => {
        console.error('Error updating user:', error);
    });
});

loadUser();