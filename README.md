# E-Commerce App

A beginner-friendly React + Vite teaching project for JWT-based authentication, role-based navigation, protected routes, and basic product management.

## Project description

This application demonstrates the following ReactJS teaching concepts:

- React Router v6+ routes and navigation
- Context API for session management
- Axios request and response interceptors
- JWT-based authorization headers
- Protected routes and admin-only routes
- Role-based navigation
- Client-side sorting and pagination
- Toast notifications
- Loading and error states
- Basic API and UI separation

## Technologies used

- React
- Vite
- React Router DOM
- Axios
- Bootstrap
- React Toastify

## Installation steps

1. Open the project folder.
2. Install dependencies:

```bash
npm install
```

3. Configure the environment file:

```bash
cp .env.example .env
```

## npm commands

```bash
npm run dev
npm run build
npm run preview
```

## Folder structure

```text
src/
├── components/
│   ├── AdminRoute.jsx
│   ├── ErrorMessage.jsx
│   ├── Loading.jsx
│   ├── Navbar.jsx
│   ├── Pagination.jsx
│   ├── ProductForm.jsx
│   ├── ProductTable.jsx
│   ├── ProtectedRoute.jsx
│   └── SortControl.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── AddProduct.jsx
│   ├── AdminDashboard.jsx
│   ├── EditProduct.jsx
│   ├── Login.jsx
│   ├── NotFound.jsx
│   ├── ProductDetails.jsx
│   ├── Products.jsx
│   ├── ServerError.jsx
│   ├── Unauthorized.jsx
│   └── UserDashboard.jsx
├── services/
│   ├── api.js
│   ├── authService.js
│   └── productService.js
├── App.jsx
├── index.css
├── main.jsx
└──
```

## Backend API assumptions

This frontend expects a Spring Boot API running at:

```text
http://localhost:8080/api/v1
```

### Login

```http
POST /user/login
```

Request:

```json
{
  "username": "john",
  "password": "secret"
}
```

Success response:

```json
{
  "token": "jwt-token",
  "username": "john",
  "roles": ["USER"]
}
```

### Product endpoints

```http
GET /products
GET /products/{id}
POST /products
PUT /products/{id}
DELETE /products/{id}
```

## Authentication flow

1. User enters username and password.
2. The app submits the request to `/user/login` via `authService`.
3. The JWT and user info are stored in localStorage under `user`.
4. The app updates the AuthContext.
5. Protected routes check authentication before rendering the page.
6. The Axios request interceptor automatically adds the Authorization header.

## Session management explanation

The app restores the user from localStorage on startup using the AuthContext. This demonstrates a simple session-management flow used in demos and classrooms.

> For production applications, storing tokens in localStorage has security trade-offs. HttpOnly Secure cookies may be preferable depending on the authentication architecture.

## Role-based access rules

| Operation | USER | ADMIN |
| --- | --- | --- |
| Get all products | YES | YES |
| Find product | YES | YES |
| Add product | NO | YES |
| Update product | NO | YES |
| Delete product | NO | YES |

## Route list

- `/login`
- `/user`
- `/admin`
- `/products`
- `/products/:id`
- `/add-product`
- `/edit-product/:id`
- `/unauthorized`
- catch-all `*` route for 404 pages

## Pagination and sorting explanation

The product list is loaded once, then sorted client-side and paginated client-side. This keeps the app simple and demonstrates how data can be processed before it is shown in the UI.

## Axios interceptor explanation

The reusable Axios instance in `src/services/api.js` adds the `Authorization` header automatically using the current user from `localStorage`.

```text
Component
  ↓
Service
  ↓
Axios Instance
  ↓
Request Interceptor
  ↓
Authorization: Bearer JWT
  ↓
Spring Boot API
```

The response interceptor also handles `401`, `403`, `404`, and server errors in a simple, student-friendly way.

## How to configure .env

Create a `.env` file with:

```bash
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

The sample file `.env.example` contains the same setting.

## CORS requirement

The frontend runs on Vite at:

```text
http://localhost:5173
```

The backend runs on:

```text
http://localhost:8080
```

The backend must allow requests from `http://localhost:5173`.

If the browser reports a CORS error, the Spring Boot backend must be configured correctly for CORS. Do not add unsafe browser workarounds.

## How to run the application

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

## Notes for teaching

- The app uses `useContext(AuthContext)` directly instead of a custom `useAuth()` hook.
- React Router uses the `element` prop.
- Services are separated from UI pages.
- Reusable components demonstrate better React structure.
- Loading, error, and toast states are added to teach real-world app behavior.

