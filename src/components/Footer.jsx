// src/components/Footer.jsx
export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white text-center py-6 mt-auto">
        <p className="text-sm">&copy; {new Date().getFullYear()} JobBoard Inc. All rights reserved.</p>
      </footer>
    );
  }