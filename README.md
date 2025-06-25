# Photo-Album-mysql
A full-stack web application that allows users to upload, view, and delete photos. Built using React on the frontend and Node.js + Express + MySQL + Sequelize on the backend.

# Deployment links
- backend:https://photo-album-mysql-1.onrender.com
- frontend:https://photo-album-mysql.vercel.app/

# Folder Structure
![image](https://github.com/user-attachments/assets/982d63d7-7f5c-41a3-abcb-7613f9c14df1)
![image](https://github.com/user-attachments/assets/c2027054-97ab-4dd4-89d8-1c3b0f4dd55f)




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
|PUT     | /api/photos/:id      | Edit the existing photo | <br>
| DELETE | `/api/photos/:id`    | Delete a photo by ID ||<br>
## 🛠 Export MySQL Database (optional)

To export your database safely using `mysqldump`:


mysqldump --set-gtid-purged=OFF --single-transaction \
  -h <your_host> \
  -u <your_username> \
  -p <your_database_name> > db-export.sql



# UI
![image](https://github.com/user-attachments/assets/9e41cf78-06a8-4aae-b638-84d68e3839b4)
# Edit feature
![image](https://github.com/user-attachments/assets/6dafea54-4677-4881-910d-7b0235f96342)




