const showNavItems=()=>{
    const token = localStorage.getItem('token');
    const container = document.querySelector('.dashboard-nav');
    if(token){
        container.innerHTML +=
        `   <ul class="name-ul">
                <li><a href="index.html">Librac University</a></li>
                <!-- <li><small>Assalamu Alaikum, Asif Mahmud !</small></li> -->
            </ul>
            <ul class="special-ul">
                <li><a href="dashboard.html">Dashboard</a></li>
                <li><a href="edit_profile.html">Edit Profile</a></li>
                <li><a href="add_assignment.html">Assignments</a></li>
                
                <li class='log-out-btn' onclick="handleLogOut() ">Log Out</li>
            </ul>
        `;
    }
    else{
        container.innerHTML +=
        `   <ul class="name-ul">
                <li><a href="index.html">Librac University</a></li>
                <!-- <li><small>Assalamu Alaikum, Asif Mahmud !</small></li> -->
            </ul>
            <ul class="special-ul">
                <li><a href="login.html">Sign In</a></li>
                <li><a href="register_as.html">Sign Up</a></li>
                <!-- <li>Log Out</li> -->
            </ul>
        `;
    }
}


showNavItems();