// JWT = [Header].[Payload].[Signature]

// Header = metadata (like which algorithm we used)
// Payload = your data (userId, email, etc.)
// Signature = created using Header + Payload + SECRET_KEY

// Client sends → JWT token (every request after login)
// Server does → verify signature with SECRET_KEY