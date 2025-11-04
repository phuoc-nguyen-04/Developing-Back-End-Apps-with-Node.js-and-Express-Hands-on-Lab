import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import { books, findBooksByAuthor, findBooksByTitle } from './data/books.js';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'very_secret_key_change_me';

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// In-memory users store
// users: { username: string, password: string }
const users = new Map();

// Avoid favicon 404 noise in browser console
app.get('/favicon.ico', (req, res) => res.status(204).end());

function generateToken(username) {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token missing' });
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = { username: payload.username };
    next();
  });
}

// Root
app.get('/', (req, res) => {
  res.json({ message: 'Bookstore API is running' });
});

// Task 1: Get the book list available in the shop (all books)
app.get('/books', (req, res) => {
  res.json(Object.values(books));
});

// Task 2: Get the books based on ISBN
app.get('/books/isbn/:isbn', (req, res) => {
  const { isbn } = req.params;
  const book = books[isbn];
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// Task 3: Get all books by Author
app.get('/books/author/:author', (req, res) => {
  const { author } = req.params;
  const result = findBooksByAuthor(author);
  res.json(result);
});

// Task 4: Get all books based on Title
app.get('/books/title/:title', (req, res) => {
  const { title } = req.params;
  const result = findBooksByTitle(title);
  res.json(result);
});

// Task 5: Get book Review
app.get('/reviews/:isbn', (req, res) => {
  const { isbn } = req.params;
  const book = books[isbn];
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book.reviews);
});

// Task 6: Register New user
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  if (users.has(username)) return res.status(409).json({ error: 'User already exists' });
  users.set(username, { username, password });
  res.status(201).json({ message: 'User registered successfully' });
});

// Task 7: Login as a Registered user
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.get(username);
  if (!user || user.password !== password) return res.status(401).json({ error: 'Invalid credentials' });
  const token = generateToken(username);
  res.json({ token });
});

// Task 8: Add/Modify a book review (Registered users)
app.put('/auth/review/:isbn', authenticateToken, (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;
  const book = books[isbn];
  if (!book) return res.status(404).json({ error: 'Book not found' });
  if (!review || typeof review !== 'string') return res.status(400).json({ error: 'review (string) required' });
  book.reviews[req.user.username] = review;
  res.json({ message: 'Review added/updated', reviews: book.reviews });
});

// Task 9: Delete book review added by that particular user
app.delete('/auth/review/:isbn', authenticateToken, (req, res) => {
  const { isbn } = req.params;
  const book = books[isbn];
  if (!book) return res.status(404).json({ error: 'Book not found' });
  if (book.reviews[req.user.username]) {
    delete book.reviews[req.user.username];
    return res.json({ message: 'Review deleted', reviews: book.reviews });
  }
  res.status(404).json({ error: 'No review by this user for the book' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${PORT}`);
});


