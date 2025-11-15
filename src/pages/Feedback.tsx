import { useState, useEffect } from 'react';
import { feedbackAPI, studentsAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    student_id: '',
    comments: '',
    rating: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchFeedbacks();
    fetchStudents();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await feedbackAPI.getAll();
      setFeedbacks(response.data.data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch feedback', variant: 'destructive' });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await feedbackAPI.create(formData);
      toast({ title: 'Success', description: 'Feedback added successfully' });
      setFormData({ student_id: '', comments: '', rating: '' });
      fetchFeedbacks();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to add feedback', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return;
    try {
      await feedbackAPI.delete(id);
      toast({ title: 'Success', description: 'Feedback deleted successfully' });
      fetchFeedbacks();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete feedback', variant: 'destructive' });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Feedback Management</h1>
      
      <div className="bg-card p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Feedback</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          
          <Textarea
            placeholder="Comments"
            value={formData.comments}
            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            required
          />
          
          <Select value={formData.rating} onValueChange={(value) => setFormData({ ...formData, rating: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Rating" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((rating) => (
                <SelectItem key={rating} value={rating.toString()}>
                  {rating} Star{rating > 1 ? 's' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button type="submit">Add Feedback</Button>
        </form>
      </div>

      <div className="bg-card p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Feedback List</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Comments</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedbacks.map((feedback: any) => (
              <TableRow key={feedback.feedback_id}>
                <TableCell>{feedback.feedback_id}</TableCell>
                <TableCell>{feedback.student_name}</TableCell>
                <TableCell>{feedback.comments}</TableCell>
                <TableCell>{'⭐'.repeat(feedback.rating)}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(feedback.feedback_id)}>
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
