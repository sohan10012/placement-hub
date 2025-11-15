import { useState, useEffect } from 'react';
import { trainingsAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

export default function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [formData, setFormData] = useState({
    topic: '',
    trainer: '',
    date: '',
    duration: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const response = await trainingsAPI.getAll();
      setTrainings(response.data.data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch trainings', variant: 'destructive' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await trainingsAPI.create(formData);
      toast({ title: 'Success', description: 'Training added successfully' });
      setFormData({ topic: '', trainer: '', date: '', duration: '' });
      fetchTrainings();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to add training', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this training?')) return;
    try {
      await trainingsAPI.delete(id);
      toast({ title: 'Success', description: 'Training deleted successfully' });
      fetchTrainings();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete training', variant: 'destructive' });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Trainings Management</h1>
      
      <div className="bg-card p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Training</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Topic"
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            required
          />
          <Input
            placeholder="Trainer"
            value={formData.trainer}
            onChange={(e) => setFormData({ ...formData, trainer: e.target.value })}
            required
          />
          <Input
            type="date"
            placeholder="Date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <Input
            placeholder="Duration (e.g., 2 hours)"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            required
          />
          <Button type="submit" className="col-span-2">Add Training</Button>
        </form>
      </div>

      <div className="bg-card p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Trainings List</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Topic</TableHead>
              <TableHead>Trainer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trainings.map((training: any) => (
              <TableRow key={training.training_id}>
                <TableCell>{training.training_id}</TableCell>
                <TableCell>{training.topic}</TableCell>
                <TableCell>{training.trainer}</TableCell>
                <TableCell>{new Date(training.date).toLocaleDateString()}</TableCell>
                <TableCell>{training.duration}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(training.training_id)}>
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
