import axios from 'axios';

const API_BASE = process.env.API_BASE || 'http://localhost:5000';

// Helper to log with a label
function log(label, data) {
  // eslint-disable-next-line no-console
  console.log(`\n=== ${label} ===`);
  // eslint-disable-next-line no-console
  console.log(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
}

// Task 10: Get all books – Using async/await (async function)
async function getAllBooksAsync() {
  const res = await axios.get(`${API_BASE}/books`);
  return res.data;
}

// Task 11: Search by ISBN – Using Promises (.then/.catch)
function getBookByIsbnPromise(isbn) {
  return axios.get(`${API_BASE}/books/isbn/${encodeURIComponent(isbn)}`)
    .then(res => res.data);
}

// Task 12: Search by Author – Using async/await
async function searchByAuthor(author) {
  const res = await axios.get(`${API_BASE}/books/author/${encodeURIComponent(author)}`);
  return res.data;
}

// Task 13: Search by Title – Using async/await
async function searchByTitle(title) {
  const res = await axios.get(`${API_BASE}/books/title/${encodeURIComponent(title)}`);
  return res.data;
}

// Demo runner for convenience (can be used to generate screenshots)
async function runDemo() {
  try {
    const all = await getAllBooksAsync();
    log('Task 10: All Books (async/await)', all);

    const book = await getBookByIsbnPromise('9780000000028');
    log('Task 11: Book by ISBN (Promise)', book);

    const byAuthor = await searchByAuthor('Martin');
    log('Task 12: Books by Author (async/await)', byAuthor);

    const byTitle = await searchByTitle('Clean');
    log('Task 13: Books by Title (async/await)', byTitle);

  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Client error:', err?.response?.data || err.message);
  }
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runDemo();
}

export {
  getAllBooksAsync,
  getBookByIsbnPromise,
  searchByAuthor,
  searchByTitle
};


