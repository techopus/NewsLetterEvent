import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Upload, 
  Download, 
  Mail,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  UserPlus
} from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  name: string;
  city: string;
  subscribed: string;
  status: 'active' | 'inactive';
}

const mockSubscribers: Subscriber[] = [
  { id: '1', email: 'anna.mueller@email.com', name: 'Anna Mueller', city: 'Berlin', subscribed: '2024-01-15', status: 'active' },
  { id: '2', email: 'max.weber@email.com', name: 'Max Weber', city: 'Munich', subscribed: '2024-01-20', status: 'active' },
  { id: '3', email: 'lisa.schmidt@email.com', name: 'Lisa Schmidt', city: 'Hamburg', subscribed: '2024-02-01', status: 'active' },
  { id: '4', email: 'tom.fischer@email.com', name: 'Tom Fischer', city: 'Cologne', subscribed: '2024-02-05', status: 'inactive' },
  { id: '5', email: 'sara.wagner@email.com', name: 'Sara Wagner', city: 'Frankfurt', subscribed: '2024-02-10', status: 'active' },
  { id: '6', email: 'paul.becker@email.com', name: 'Paul Becker', city: 'Stuttgart', subscribed: '2024-02-15', status: 'active' },
  { id: '7', email: 'nina.schulz@email.com', name: 'Nina Schulz', city: 'Dortmund', subscribed: '2024-02-20', status: 'active' },
  { id: '8', email: 'jan.meyer@email.com', name: 'Jan Meyer', city: 'Essen', subscribed: '2024-02-25', status: 'active' },
];

export const Subscribers: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(mockSubscribers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSubscriber, setNewSubscriber] = useState({ email: '', name: '', city: '' });

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscriber.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || subscriber.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddSubscriber = () => {
    if (newSubscriber.email && newSubscriber.name) {
      const subscriber: Subscriber = {
        id: Date.now().toString(),
        email: newSubscriber.email,
        name: newSubscriber.name,
        city: newSubscriber.city || 'Unknown',
        subscribed: new Date().toISOString().split('T')[0],
        status: 'active'
      };
      
      setSubscribers([...subscribers, subscriber]);
      setNewSubscriber({ email: '', name: '', city: '' });
      setShowAddModal(false);
    }
  };

  const handleBulkImport = () => {
    // Simulate CSV import
    const csvData = `email,name,city
maria.hoffman@email.com,Maria Hoffman,Düsseldorf
peter.klein@email.com,Peter Klein,Leipzig
julia.richter@email.com,Julia Richter,Dresden`;
    
    const lines = csvData.split('\n').slice(1); // Skip header
    const newSubscribers: Subscriber[] = lines.map((line, index) => {
      const [email, name, city] = line.split(',');
      return {
        id: (Date.now() + index).toString(),
        email,
        name,
        city,
        subscribed: new Date().toISOString().split('T')[0],
        status: 'active' as const
      };
    });
    
    setSubscribers([...subscribers, ...newSubscribers]);
    alert('3 new subscribers imported successfully!');
  };

  const handleExportCSV = () => {
    const csvContent = 'email,name,city,subscribed,status\n' + 
      subscribers.map(s => `${s.email},${s.name},${s.city},${s.subscribed},${s.status}`).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const activeSubscribers = subscribers.filter(s => s.status === 'active').length;
  const inactiveSubscribers = subscribers.filter(s => s.status === 'inactive').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscribers</h1>
          <p className="text-gray-600">Manage your newsletter subscribers</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Subscriber</span>
          </button>
          <button
            onClick={handleBulkImport}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Upload className="h-4 w-4" />
            <span>Import CSV</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Subscribers</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{subscribers.length}</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg">
              <Users className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Active</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{activeSubscribers}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <UserPlus className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Inactive</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{inactiveSubscribers}</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <Mail className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search subscribers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-900">Subscriber</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-900">City</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-900">Subscribed</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-900">Status</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSubscribers.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{subscriber.name}</div>
                      <div className="text-sm text-gray-500">{subscriber.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{subscriber.city}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(subscriber.subscribed).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      subscriber.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {subscriber.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Subscriber Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Subscriber</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newSubscriber.email}
                  onChange={(e) => setNewSubscriber({ ...newSubscriber, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="subscriber@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newSubscriber.name}
                  onChange={(e) => setNewSubscriber({ ...newSubscriber, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Full Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={newSubscriber.city}
                  onChange={(e) => setNewSubscriber({ ...newSubscriber, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="City"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubscriber}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Add Subscriber
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};