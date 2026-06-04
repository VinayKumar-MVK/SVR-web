import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Mail, 
  Phone, 
  User, 
  Calendar, 
  MessageSquare, 
  LogOut, 
  Trash2,
  CheckCircle,
  Circle,
  Eye
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface ContactMessage {
  created_at: string;
  email: string;
  id: string;
  message: string;
  name: string;
  phone: string | null;
  product_category: string | null;
  product_name: string | null;
  read_status: boolean;
}

const AdminDashboard = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    today: 0
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check admin authentication
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    fetchMessages();
  }, [navigate]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMessages(data || []);
      setFilteredMessages(data || []);
      
      // Calculate stats
      const today = new Date().toDateString();
      const todayMessages = data?.filter(msg => 
        new Date(msg.created_at).toDateString() === today
      ).length || 0;
      
      const unreadMessages = data?.filter(msg => !msg.read_status).length || 0;

      setStats({
        total: data?.length || 0,
        unread: unreadMessages,
        today: todayMessages
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .update({ read_status: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, read_status: !currentStatus } : msg
      ));

      // Update stats
      setStats(prev => ({
        ...prev,
        unread: currentStatus ? prev.unread + 1 : prev.unread - 1
      }));

      toast({
        title: "Status updated",
        description: `Message marked as ${!currentStatus ? 'read' : 'unread'}`,
      });
    } catch (error) {
      console.error('Error updating message:', error);
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive",
      });
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Update local state
      const messageToDelete = messages.find(msg => msg.id === id);
      setMessages(messages.filter(msg => msg.id !== id));
      
      // Update stats
      setStats(prev => ({
        total: prev.total - 1,
        unread: messageToDelete && !messageToDelete.read_status ? prev.unread - 1 : prev.unread,
        today: new Date(messageToDelete?.created_at || '').toDateString() === new Date().toDateString() 
          ? prev.today - 1 : prev.today
      }));

      toast({
        title: "Message deleted",
        description: "The message has been permanently removed",
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/svr-admin');
  };

  const filterMessages = (category: string) => {
    setFilterCategory(category);
    if (category === 'all') {
      setFilteredMessages(messages);
    } else if (category === 'general') {
      setFilteredMessages(messages.filter(msg => !msg.product_category || msg.product_category === 'General Inquiry'));
    } else {
      setFilteredMessages(messages.filter(msg => msg.product_category === category));
    }
  };

  const getUniqueCategories = () => {
    const categories = messages
      .map(msg => msg.product_category)
      .filter((category, index, arr) => category && arr.indexOf(category) === index)
      .sort();
    return ['all', 'general', ...categories];
  };

  const viewMessageDetails = (message: ContactMessage) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
    
    // Mark as read if it's unread
    if (!message.read_status) {
      toggleReadStatus(message.id, message.read_status);
    }
  };

  const MessageModal = ({ message, onClose }: { message: ContactMessage; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Message Details</h2>
            <Button variant="ghost" onClick={onClose} className="p-2">
              ×
            </Button>
          </div>
          
                      <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                <p className="text-gray-900 font-medium">{message.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <p className="text-gray-900">{message.email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                <p className="text-gray-900">{message.phone || 'Not provided'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
                <p className="text-gray-900">{format(new Date(message.created_at), 'PPP')}</p>
              </div>
            </div>

            {/* Product Information Section */}
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Product Category</label>
                  <div className="bg-blue-50 px-3 py-2 rounded-lg border">
                    <p className="text-gray-900 font-medium">
                      {message.product_category || 'General Inquiry'}
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Product Name</label>
                  <div className="bg-green-50 px-3 py-2 rounded-lg border">
                    <p className="text-gray-900 font-medium">
                      {message.product_name || 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Show inquiry type if it's a general inquiry */}
              {(!message.product_category || message.product_category === 'General Inquiry') && (
                <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> This is a general inquiry not related to a specific product.
                  </p>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Customer Message</label>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{message.message}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant={message.read_status ? "secondary" : "destructive"}>
                {message.read_status ? "Read" : "Unread"}
              </Badge>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => {
                if (confirm('Are you sure you want to delete this message?')) {
                  deleteMessage(message.id);
                  onClose();
                }
              }}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Messages</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.unread}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Today's Messages</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Messages Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Contact Messages
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-600">Filter by Category:</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => filterMessages(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                  >
                    {getUniqueCategories().map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Messages' : 
                         category === 'general' ? 'General Inquiries' : 
                         category}
                      </option>
                    ))}
                  </select>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredMessages.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {filterCategory === 'all' ? 'No messages found' : `No messages found for ${filterCategory}`}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMessages.map((message) => (
                        <TableRow key={message.id} className={!message.read_status ? 'bg-blue-50' : ''}>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleReadStatus(message.id, message.read_status)}
                              className="p-1"
                            >
                              {message.read_status ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <Circle className="h-4 w-4 text-gray-400" />
                              )}
                            </Button>
                          </TableCell>
                          <TableCell className="font-medium">{message.name}</TableCell>
                          <TableCell>{message.email}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            <span 
                              title={message.product_category || 'General Inquiry'}
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                message.product_category 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {message.product_category || 'General Inquiry'}
                            </span>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            <span title={message.product_name || 'Not specified'}>
                              {message.product_name || 'Not specified'}
                            </span>
                          </TableCell>
                          <TableCell>{format(new Date(message.created_at), 'MMM dd, yyyy')}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => viewMessageDetails(message)}
                                className="flex items-center gap-1"
                              >
                                <Eye className="h-4 w-4" />
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  if (confirm('Are you sure you want to delete this message?')) {
                                    deleteMessage(message.id);
                                  }
                                }}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Message Details Modal */}
      {showMessageModal && selectedMessage && (
        <MessageModal 
          message={selectedMessage} 
          onClose={() => {
            setShowMessageModal(false);
            setSelectedMessage(null);
          }} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;