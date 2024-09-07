import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to TravTronics E-commerce</h1>
      <Link to="/login" className="bg-blue-500 text-white px-6 py-3 rounded-md">
        Login
      </Link>
    </div>
  );
}

export default HomePage;
