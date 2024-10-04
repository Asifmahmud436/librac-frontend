const seeInfo = () => {
    const token = localStorage.getItem('token'); // Check if user is logged in
    
    if (token) {
        const user_id = localStorage.getItem('user_id');
        
        fetch(`http://127.0.0.1:8000/accounts/user/?user_id=${user_id}`)
            .then((res) => res.json())
            .then((data) => {
                showNavItems(data.is_staff);
            })
            .catch((err) => {
                console.error('Error fetching user data:', err);
            });
    } else {
        // No token, so show the default navbar
        showNavItems(null);
    }
};

const showNavItems = (is_staff) => {
    const container = document.querySelector('.dashboard-nav');
    
    if (is_staff !== null) {
        // User is logged in
        if (is_staff) {
            container.innerHTML =
            `   <ul class="name-ul">
                    <li><a href="index.html">Librac University</a></li>
                </ul>
                <ul class="special-ul">
                    <li><a href="dashboard.html">Add Course</a></li>
                    <li class='log-out-btn' onclick="handleLogOut()">Log Out</li>
                </ul>
            `;
        } else {
            container.innerHTML =
            `   <ul class="name-ul">
                    <li><a href="index.html">Librac University</a></li>
                </ul>
                <ul class="special-ul">
                    <li><a href="dashboard.html">Dashboard</a></li>
                    <li><a href="edit_profile.html">Edit Profile</a></li>
                    <li><a href="add_assignment.html">Assignments</a></li>
                    <li class='log-out-btn' onclick="handleLogOut()">Log Out</li>
                </ul>
            `;
        }
    } else {
        // User is not logged in
        container.innerHTML =
        `   <ul class="name-ul">
                <li><a href="index.html">Librac University</a></li>
            </ul>
            <ul class="special-ul">
                <li><a href="login.html">Sign In</a></li>
                <li><a href="register_as.html">Sign Up</a></li>
            </ul>
        `;
    }
};

seeInfo();
