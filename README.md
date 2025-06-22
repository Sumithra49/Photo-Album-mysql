# Photo-Album-mysql
A full-stack web application that allows users to upload, view, and delete photos. Built using React on the frontend and Node.js + Express + MySQL + Sequelize on the backend.

# Folder Structure
![image](https://github.com/user-attachments/assets/982d63d7-7f5c-41a3-abcb-7613f9c14df1)
![image](https://github.com/user-attachments/assets/a377c6b5-138c-42bd-b1d5-6cd8f79d448e)



# Tech Stack
- Frontend: React, Axios, CSS

- Backend: Node.js, Express.js, Sequelize

- Database: MySQL (hosted on Clever Cloud )

- File Upload: Multer (images stored locally)
  # Features
-  Upload a photo with title and description

-  Display all uploaded photos in a gallery

-  Delete photos

-  Images stored in a local uploads/ folder

-  Auto-sync database tables with Sequelize

- # .env
- DB_DATABASE=your_db_name
- DB_USERNAME=your_username
- DB_PASSWORD=your_password
- DB_HOST=your_db_host
- DB_PORT=3306
- PORT=8080
- | Method | Endpoint             | Description          |<br>
| ------ | -------------------- | -------------------- ||<br>
| GET    | `/api/photos`        | Get all photos       ||<br>
| POST   | `/api/photos/upload` | Upload a new photo   ||<br>
| DELETE | `/api/photos/:id`    | Delete a photo by ID ||<br>


# UI
![image](https://github.com/user-attachments/assets/46d205b4-11c7-468e-9c39-656471acef7f)


