// JWT = [Header].[Payload].[Signature]

// Header = metadata (like which algorithm we used)
// Payload = your data (userId, email, etc.)
// Signature = created using Header + Payload + SECRET_KEY

// Client sends → JWT token (every request after login)
// Server does → verify signature with SECRET_KEY

// This does 3 important things: we are talking about register fastify jwts 

// ✔ It adds fastify.jwt.sign() to the server
// So now you can create tokens without importing jsonwebtoken manually.
// ✔ It adds request.jwtVerify()
// A built-in way to check tokens.
// ✔ It attaches the decoded user to request.user

// User logs in with email/password
//           |
//           v
// Server verifies credentials
//           |
//           v
// Server creates JWT:
//   Header + Payload → Base64Url
//   Sign with secret → Signature
//           |
//           v
// Server returns JWT to client
//           |
//           v
// Client stores JWT (localStorage, cookie, memory)
//           |
//           v
// Client sends requests with:
//   Authorization: Bearer <JWT>
//           |
//           v
// Server receives request → request.jwtVerify()
//   - Decodes header & payload
//   - Verifies signature using secret
//   - Checks expiry
//           |
//           v
// If valid → request.user contains payload
// If invalid → 401 Unauthorized
