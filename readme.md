**Mini Social Media Application - Django REST Framework Backend and React Frontend**

Welcome to the Mini Social Media Application! This project combines the power of Django REST Framework for the backend, React for the frontend, and PostgreSQL for the database. It allows users to post mini blogs, interact with other users' posts by liking and commenting on them, and much more.

### Features

1. **User Authentication**: Users can sign up, log in, and log out securely. JWT (JSON Web Tokens) may be used for authentication.

2. **Posting Mini Blogs**: Users can create and share their mini blogs with the community. Each post can include text content, images, or links.

3. **Interacting with Posts**:
   - **Like**: Users can like posts to show appreciation or agreement.
   - **Comment**: Users can comment on posts to express their thoughts or engage in discussions.
   - **DraftPosts**: Users can draft their mini blogs(posts) for future use.

### Technologies Used

- **Backend**:
  - Django: Python-based web framework for building robust web applications.
  - Django REST Framework: Toolkit for building Web APIs in Django.
  - PostgreSQL: Powerful open-source relational database.

- **Frontend**:
  - React: JavaScript library for building user interfaces.
  - React Router: Declarative routing for React applications.
  

### Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Roomshambles0/Be_Social
   ```

2. Set up the Django backend:
   - Install Python and Django if you haven't already.
   - Navigate to the backend directory and install dependencies:

     ```bash
     cd Server/myproject
     pip install -r requirements.txt
     ```

   - Set up PostgreSQL and configure the database settings in `Server/myproject/myproject/settings.py`.
   - Apply migrations:

     ```bash
     python manage.py migrate
     ```

   - Start the Django development server:

     ```bash
     python manage.py runserver
     ```

3. Set up the React frontend:
   - Install Node.js and npm if you haven't already.
   - Navigate to the frontend directory and install dependencies:

     ```bash
     cd frontend
     npm install
     ```

   - Start the React development server:

     ```bash
     npm start
     ```

4. Access the application at  `http://localhost:5173/` in your web browser.

### Contribution Guidelines

Contributions to this project are welcome! If you find any bugs or have suggestions for new features, feel free to open an issue or submit a pull request.

