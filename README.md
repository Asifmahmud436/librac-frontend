
# Librac University

Librac University introduces opportunity to Universities around the world which gives their students to select courses for their students before a semester starts,drop courses and see the assignments of their course.The teachers can schedule and drop assignments for their courses they are assigned in.The VC of the University is the admin who can append new courses and assign teachers to any particular courses.It makes the life of students and teachers easier.

## Tech Stack

**FrontEnd Technology:**  Html, CSS, Javascript

**Backend Technology used:**  Python, Django, Django Rest Framework

**Database:**  PostgreSQL



## Live Link

[Librac University](https://librac.netlify.app/) is currently deployed on netlify.Click on the blue link to go to the live website.


## Authors

- [Asifmahmud436](https://github.com/Asifmahmud436)



## Run Locally

Clone the project

```bash
  git clone https://github.com/Asifmahmud436/librac-frontend.git
```

Go to the project directory

```bash
  cd librac-frontend
```

Install dependencies

```bash
  npm install
```

Start the server from the vscode with liveserver




## API Reference

#### Get user details

```http
  https://librac-backend.vercel.app/accounts/user/?user_id=${user_id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | collects the user_id from the localstorage,after login and shows user details |

#### Get teacher courses

```http
  https://librac-backend.vercel.app/courses/list/?teacher_name=${name}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | shows all the courses of a teacher |

#### Get All the teacher_list

```http
  https://librac-backend.vercel.app/teachers/list/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | shows all the teacher |






## 🔗 Connect with me:
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/asif-mahmud-3bb1a627a/)

## Feedback

If you have any feedback, please reach out to us at safaandsafa4@gmail.com

