# Daily Journal Blog

A simple, full-stack blogging platform built with Node.js, Express, MongoDB, and EJS templating. Users can compose, publish, and read blog posts in a clean, responsive interface.

## Features

- Home page displaying all published blog posts
- Compose page for creating new blog entries
- Individual post pages with full content
- About and Contact pages
- Responsive design using Bootstrap
- Posts stored and managed via MongoDB
- EJS templating for dynamic rendering

## Technologies Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [EJS](https://ejs.co/)
- [Bootstrap 3](https://getbootstrap.com/docs/3.3/)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) and npm installed
- [MongoDB](https://www.mongodb.com/) instance (local or cloud)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/abdojat/blog.git
   cd blog
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure MongoDB connection in `app.js` if needed.
4. Start the application:
   ```sh
   node app.js
   ```
5. Open your browser and visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
blog/
├── app.js
├── package.json
├── public/
│   └── css/
│       └── styles.css
├── views/
│   ├── about.ejs
│   ├── compose.ejs
│   ├── contact.ejs
│   ├── home.ejs
│   ├── post.ejs
│   └── partials/
│       ├── footer.ejs
│       └── header.ejs
```

## License

This project is licensed under the ISC License.
