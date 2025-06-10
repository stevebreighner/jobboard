#!/bin/bash

mkdir -p jobboard/src/components
mkdir -p jobboard/src/pages
mkdir -p jobboard/src/assets

cat > jobboard/vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
})
EOF

cat > jobboard/src/main.jsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
EOF

cat > jobboard/src/App.jsx << 'EOF'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
EOF

cat > jobboard/src/pages/Home.jsx << 'EOF'
import React from 'react'

export default function Home() {
  return (
    <div>
      <h1>Welcome to Job Board</h1>
      <p>Home page content here.</p>
    </div>
  )
}
EOF

cat > jobboard/src/pages/Dashboard.jsx << 'EOF'
import React from 'react'

export default function Dashboard() {
  return (
    <div>
      <h1>Your Dashboard</h1>
      <p>This will show your jobs or applications.</p>
    </div>
  )
}
EOF

cat > jobboard/src/components/LoginForm.jsx << 'EOF'
import React from 'react'

export default function LoginForm() {
  return (
    <form>
      <h2>Login</h2>
      <label>Username or Email</label>
      <input type="text" name="username" />
      <label>Password</label>
      <input type="password" name="password" />
      <button type="submit">Log In</button>
    </form>
  )
}
EOF

cat > jobboard/src/components/RegisterForm.jsx << 'EOF'
import React from 'react'

export default function RegisterForm() {
  return (
    <form>
      <h2>Register</h2>
      <label>Username</label>
      <input type="text" name="username" />
      <label>Email</label>
      <input type="email" name="email" />
      <label>Password</label>
      <input type="password" name="password" />
      <label>Confirm Password</label>
      <input type="password" name="passwordConfirm" />
      <button type="submit">Register</button>
    </form>
  )
}
EOF

cat > jobboard/src/index.css << 'EOF'
body {
  font-family: Arial, sans-serif;
  margin: 2rem;
}
EOF



