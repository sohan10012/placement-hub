import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="bg-card border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Placement Tracker</h1>

          <div className="flex gap-4 items-center">
            <Link to="/"><Button variant="ghost">Dashboard</Button></Link>
            <Link to="/students"><Button variant="ghost">Students</Button></Link>
            <Link to="/companies"><Button variant="ghost">Companies</Button></Link>
            <Link to="/placements"><Button variant="ghost">Placements</Button></Link>
            <Link to="/trainings"><Button variant="ghost">Trainings</Button></Link>
            <Link to="/feedback"><Button variant="ghost">Feedback</Button></Link>

            {/* If user is logged in, show name + logout */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="font-medium text-blue-600">
                  Hello, {user.name}
                </span>
                <Button variant="destructive" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
