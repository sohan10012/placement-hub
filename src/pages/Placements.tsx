import { useState, useEffect } from 'react';
import { placementsAPI, studentsAPI, companiesAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

export default function Placements() {
  const [placements, setPlacements] = useState([]);
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    student_id: '',
    company_id: '',
    date_placed: '',
    package: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchPlacements();
    fetchStudents();
    fetchCompanies();
  }, []);

  const fetchPlacements = async () => {
    try {
      const response = await placementsAPI.getAll();
      setPlacements(response.data.data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch placements', variant: 'destructive' });
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await studentsAPI.getAll();
      setStudents(response.data.data);
    } catch (error) {
      console.error('Failed to fetch students');
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await companiesAPI.getAll();
      setCompanies(response.data.data);
    } catch (error) {
      console.error('Failed to fetch companies');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await placementsAPI.create(formData);
      toast({ title: 'Success', description: 'Placement added successfully' });
      setFormData({ student_id: '', company_id: '', date_placed: '', package: '' });
      fetchPlacements();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to add placement', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this placement?')) return;
    try {
      await placementsAPI.delete(id);
      toast({ title: 'Success', description: 'Placement deleted successfully' });
      fetchPlacements();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete placement', variant: 'destructive' });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Placements Management</h1>
      
      <div className="bg-card p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Placement</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <Select value={formData.student_id} onValueChange={(value) => setFormData({ ...formData, student_id: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Student" />
            </SelectTrigger>
            <SelectContent>
              {students.map((student: any) => (
                <SelectItem key={student.student_id} value={student.student_id.toString()}>
                  {student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={formData.company_id} onValueChange={(value) => setFormData({ ...formData, company_id: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Company" />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company: any) => (
                <SelectItem key={company.company_id} value={company.company_id.toString()}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Input
            type="date"
            placeholder="Date Placed"
            value={formData.date_placed}
            onChange={(e) => setFormData({ ...formData, date_placed: e.target.value })}
            required
          />
          <Input
            placeholder="Package (LPA)"
            type="number"
            step="0.01"
            value={formData.package}
            onChange={(e) => setFormData({ ...formData, package: e.target.value })}
            required
          />
          <Button type="submit" className="col-span-2">Add Placement</Button>
        </form>
      </div>

      <div className="bg-card p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Placements List</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Package (LPA)</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {placements.map((placement: any) => (
              <TableRow key={placement.placement_id}>
                <TableCell>{placement.placement_id}</TableCell>
                <TableCell>{placement.student_name}</TableCell>
                <TableCell>{placement.company_name}</TableCell>
                <TableCell>{new Date(placement.date_placed).toLocaleDateString()}</TableCell>
                <TableCell>{placement.package}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(placement.placement_id)}>
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
