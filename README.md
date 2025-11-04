## Bookstore API Lab (Coursera Mooc-2)

### Run

```bash
npm install
npm run start
# Server: http://localhost:5000
```

Optional: Run the client demo (Tasks 10–13 using Axios):

```bash
npm run client
```

Auto-generate outputs for Tasks 5–13 (saved under `outputs/`):

```bash
npm run lab:run
```

### API Endpoints (for screenshots)

- Task 1: GET `http://localhost:5000/books`
- Task 2: GET `http://localhost:5000/books/isbn/9780000000028`
- Task 3: GET `http://localhost:5000/books/author/Martin`
- Task 4: GET `http://localhost:5000/books/title/Clean`
- Task 5: GET `http://localhost:5000/reviews/9780000000028`
- Task 6: POST `http://localhost:5000/register` with JSON `{ "username": "alice", "password": "secret" }`
- Task 7: POST `http://localhost:5000/login` with same credentials → copy `token` from response
- Task 8: PUT `http://localhost:5000/auth/review/9780000000028` with header `Authorization: Bearer <token>` and JSON `{ "review": "Great book!" }`
- Task 9: DELETE `http://localhost:5000/auth/review/9780000000028` with header `Authorization: Bearer <token>`

### Sample cURL (copy/paste)

```bash
# Task 6 - Register
curl -s -X POST http://localhost:5000/register \
  -H 'Content-Type: application/json' \
  -d '{"username":"alice","password":"secret"}' | jq

# Task 7 - Login (capture token)
TOKEN=$(curl -s -X POST http://localhost:5000/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"alice","password":"secret"}' | jq -r .token)
echo $TOKEN

# Task 8 - Add/Modify review
curl -s -X PUT http://localhost:5000/auth/review/9780000000028 \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"review":"Great book!"}' | jq

# Task 9 - Delete review
curl -s -X DELETE http://localhost:5000/auth/review/9780000000028 \
  -H "Authorization: Bearer $TOKEN" | jq

# Tasks 10–13 via client
npm run client
```

### Screenshot Checklist

- Task 1–5: Responses from the GET endpoints.
- Task 6: Successful registration response.
- Task 7: Successful login response showing a token.
- Task 8: Successful add/modify review response showing updated `reviews`.
- Task 9: Successful delete review response.
- Tasks 10–13: Terminal output from `npm run client` showing results for all four methods.
  - Hoặc dùng `npm run lab:run` và lấy file `outputs/task10_13_client.txt`.

### Notes

- Data and users are in-memory for the lab. Restarting the server resets state.
- JWT secret can be set with `JWT_SECRET` env variable.


# Developing-Back-End-Apps-with-Node.js-and-Express-Hands-on-Lab
