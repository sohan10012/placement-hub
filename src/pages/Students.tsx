import { useState, useEffect } from 'react';
import { studentsAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    email: '',
    phone: '',
    cgpa: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await studentsAPI.getAll();
      setStudents(response.data.data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch students', variant: 'destructive' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await studentsAPI.create(formData);
      toast({ title: 'Success', description: 'Student added successfully' });
      setFormData({ name: '', branch: '', email: '', phone: '', cgpa: '' });
      fetchStudents();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to add student', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this student?')) return;
    try {
      await studentsAPI.delete(id);
      toast({ title: 'Success', description: 'Student deleted successfully' });
      fetchStudents();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete student', variant: 'destructive' });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Students Management</h1>
      
      <div className="bg-card p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            placeholder="Branch"
            value={formData.branch}
            onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
            required
          />
          <Input
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
          <Input
            placeholder="CGPA"
            type="number"
            step="0.01"
            min="0"
            max="10"
            value={formData.cgpa}
            onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
            required
          />
          <Button type="submit" className="col-span-2">Add Student</Button>
        </form>
      </div>

      <div className="bg-card p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Students List</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>CGPA</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student: any) => (
              <TableRow key={student.student_id}>
                <TableCell>{student.student_id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.branch}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>{student.cgpa}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(student.student_id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
