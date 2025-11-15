import { useState } from 'react';
import { adminAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function AdminLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await adminAPI.login({ email: formData.email, password: formData.password });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('admin', JSON.stringify(response.data.admin));
        toast({ title: 'Success', description: 'Login successful' });
      } else {
        await adminAPI.register(formData);
        toast({ title: 'Success', description: 'Admin registered successfully' });
        setIsLogin(true);
      }
      setFormData({ name: '', email: '', password: '' });
    } catch (error: any) {
      toast({ 
        title: 'Error', 
        description: error.response?.data?.message || 'Operation failed',
        variant: 'destructive' 
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isLogin ? 'Admin Login' : 'Admin Registration'}</CardTitle>
          <CardDescription>
            {isLogin ? 'Login to access the placement tracker system' : 'Create a new admin account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Input
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            )}
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <Button type="submit" className="w-full">
              {isLogin ? 'Login' : 'Register'}
            </Button>
            <Button 
              type="button" 
              variant="link" 
              className="w-full"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
