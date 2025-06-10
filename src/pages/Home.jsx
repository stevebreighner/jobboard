import { Briefcase, UserSearch, Rocket } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center min-h-screen bg-gradient-to-br from-indigo-600 to-purple-500 text-white p-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to JobBoard</h1>
        <p className="text-xl md:text-2xl mb-6">Find the best talent. Post a job. Get hired.</p>
        <div className="flex gap-4">
          <a href="/post" className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition">Post a Job</a>
          <a href="/jobs" className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-indigo-600 transition">Browse Jobs</a>
        </div>
      </div>

      {/* What We Do Section */}
      <section className="bg-white text-gray-800 py-16 px-6 md:px-12">
        <h2 className="text-4xl font-bold text-center mb-12">What We Do</h2>
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-3 text-center">
          <div className="p-6 shadow-md rounded-2xl hover:shadow-xl transition">
            <Briefcase className="mx-auto h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">For Employers</h3>
            <p className="text-gray-600">Post jobs quickly, track applicants, and find the right talent without noise or clutter.</p>
          </div>
          <div className="p-6 shadow-md rounded-2xl hover:shadow-xl transition">
            <UserSearch className="mx-auto h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">For Job Seekers</h3>
            <p className="text-gray-600">Search and apply to jobs easily. No ads, no spam. Just real opportunities.</p>
          </div>
          <div className="p-6 shadow-md rounded-2xl hover:shadow-xl transition">
            <Rocket className="mx-auto h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Built for Speed</h3>
            <p className="text-gray-600">Our platform is lightning fast, optimized for simplicity, and built with modern tech.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
