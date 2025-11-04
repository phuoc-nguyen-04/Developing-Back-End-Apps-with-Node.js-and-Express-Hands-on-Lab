// In-memory books data keyed by ISBN
// reviews: { [username]: string }

export const books = {
  "9780000000011": {
    isbn: "9780000000011",
    title: "The Pragmatic Programmer",
    author: "Andy Hunt",
    reviews: {}
  },
  "9780000000028": {
    isbn: "9780000000028",
    title: "Clean Code",
    author: "Robert C. Martin",
    reviews: {}
  },
  "9780000000035": {
    isbn: "9780000000035",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    reviews: {}
  },
  "9780000000042": {
    isbn: "9780000000042",
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    reviews: {}
  }
};

export function findBooksByAuthor(authorQuery) {
  const query = String(authorQuery).toLowerCase();
  return Object.values(books).filter(b => b.author.toLowerCase().includes(query));
}

export function findBooksByTitle(titleQuery) {
  const query = String(titleQuery).toLowerCase();
  return Object.values(books).filter(b => b.title.toLowerCase().includes(query));
}

