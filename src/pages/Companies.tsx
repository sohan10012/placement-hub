import { useState, useEffect } from 'react';
import { companiesAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    domain: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await companiesAPI.getAll();
      setCompanies(response.data.data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch companies', variant: 'destructive' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await companiesAPI.create(formData);
      toast({ title: 'Success', description: 'Company added successfully' });
      setFormData({ name: '', location: '', domain: '' });
      fetchCompanies();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to add company', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this company?')) return;
    try {
      await companiesAPI.delete(id);
      toast({ title: 'Success', description: 'Company deleted successfully' });
      fetchCompanies();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete company', variant: 'destructive' });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Companies Management</h1>
      
      <div className="bg-card p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Company</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Company Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
          <Input
            placeholder="Domain"
            value={formData.domain}
            onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
            className="col-span-2"
            required
          />
          <Button type="submit" className="col-span-2">Add Company</Button>
        </form>
      </div>

      <div className="bg-card p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Companies List</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Domain</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company: any) => (
              <TableRow key={company.company_id}>
                <TableCell>{company.company_id}</TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.location}</TableCell>
                <TableCell>{company.domain}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(company.company_id)}>
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
