import { useState } from "react";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();

    // Clean name: remove extra spaces, block numbers/symbols
    const cleaned = name
      .trim()
      .replace(/[^a-zA-Z ]/g, "")      // allow only letters + spaces
      .split(" ")[0];                  // take FIRST NAME ONLY

    // Auto-capitalize first letter
    const firstName =
      cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify({ name: firstName, email }));

    // Redirect
    window.location.href = "/";
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="w-full p-2 border rounded"
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full p-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
