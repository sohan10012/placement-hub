import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  return (
    <nav className="bg-card border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Placement Tracker</h1>
          <div className="flex gap-4">
            <Link to="/"><Button variant="ghost">Dashboard</Button></Link>
            <Link to="/students"><Button variant="ghost">Students</Button></Link>
            <Link to="/companies"><Button variant="ghost">Companies</Button></Link>
            <Link to="/placements"><Button variant="ghost">Placements</Button></Link>
            <Link to="/trainings"><Button variant="ghost">Trainings</Button></Link>
            <Link to="/feedback"><Button variant="ghost">Feedback</Button></Link>
            <Link to="/admin"><Button variant="outline">Admin</Button></Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
