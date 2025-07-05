const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');

const app = express();
const port = 3000;

// --- Configuration ---
const USERNAME = 'admin';
const PASSWORD = 'password'; // In a real application, use a more secure method for storing passwords
const POSTS_DIR = path.join(__dirname, 'posts');
const UPLOADS_DIR = path.join(__dirname, 'assets');

// --- Middleware ---
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key', // Replace with a real secret key
  resave: false,
  saveUninitialized: true,
}));
app.use('/assets', express.static(UPLOADS_DIR));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage });

// --- Authentication Middleware ---
const requireLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
};

// --- Routes ---
app.get('/login', (req, res) => {
  res.send(`
    <form action="/login" method="post">
      <input type="text" name="username" placeholder="Username" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USERNAME && password === PASSWORD) {
    req.session.loggedIn = true;
    res.redirect('/admin');
  } else {
    res.send('Invalid username or password');
  }
});

app.get('/admin', requireLogin, (req, res) => {
  res.send(`
    <h1>Create a New Post</h1>
    <link rel="stylesheet" href="https://unpkg.com/easymde/dist/easymde.min.css">
    <script src="https://unpkg.com/easymde/dist/easymde.min.js"></script>
    <form action="/admin/create" method="post" enctype="multipart/form-data">
      <input type="text" name="title" placeholder="Title" required>
      <textarea name="content" id="markdown-editor" placeholder="Content (in Markdown)" required></textarea>
      <input type="file" name="image" accept="image/*">
      <button type="submit">Create Post</button>
    </form>
    <script>
      const easyMDE = new EasyMDE({element: document.getElementById('markdown-editor')});
    </script>
  `);
});

app.post('/admin/create', requireLogin, upload.single('image'), (req, res) => {
  const { title, content } = req.body;
  const image = req.file;

  const slug = title.toLowerCase().replace(/\s+/g, '-');
  const date = new Date().toISOString().split('T')[0];
  const imagePath = image ? `/assets/${image.filename}` : '';

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <link rel="stylesheet" href="../style.css">
    </head>
    <body>
      <header>
        <h1>${title}</h1>
        <p>${date}</p>
        ${image ? `<img src="${imagePath}" alt="${title}">` : ''}
      </header>
      <main>
        ${marked(content)}
      </main>
    </body>
    </html>
  `;

  fs.writeFileSync(path.join(POSTS_DIR, `${slug}.html`), htmlContent);

  res.send('Post created successfully!');
});

app.listen(port, () => {
  console.log(`Admin panel listening at http://localhost:${port}`);
});
