import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Plus, 
  Edit, 
  Calendar,
  MapPin,
  Clock,
  Eye,
  Save,
  X,
  Check,
  Search,
  Users,
  Upload,
  UserPlus,
  FileText
} from 'lucide-react';

interface NewsletterProps {
  events: any[];
}

// Mock subscribers data (in real app, this would come from props or API)
const mockSubscribers = [
  { id: '1', email: 'anna.mueller@email.com', name: 'Anna Mueller', city: 'Berlin', status: 'active' },
  { id: '2', email: 'max.weber@email.com', name: 'Max Weber', city: 'Munich', status: 'active' },
  { id: '3', email: 'lisa.schmidt@email.com', name: 'Lisa Schmidt', city: 'Hamburg', status: 'active' },
  { id: '4', email: 'tom.fischer@email.com', name: 'Tom Fischer', city: 'Cologne', status: 'inactive' },
  { id: '5', email: 'sara.wagner@email.com', name: 'Sara Wagner', city: 'Frankfurt', status: 'active' },
  { id: '6', email: 'paul.becker@email.com', name: 'Paul Becker', city: 'Stuttgart', status: 'active' },
  { id: '7', email: 'nina.schulz@email.com', name: 'Nina Schulz', city: 'Dortmund', status: 'active' },
  { id: '8', email: 'jan.meyer@email.com', name: 'Jan Meyer', city: 'Essen', status: 'active' },
];

export const Newsletter: React.FC<NewsletterProps> = ({ events }) => {
  const [selectedEvents, setSelectedEvents] = useState<any[]>([]);
  const [selectedSubscribers, setSelectedSubscribers] = useState<any[]>(mockSubscribers.filter(s => s.status === 'active'));
  const [newsletterTitle, setNewsletterTitle] = useState('Weekly Yoga Events - Germany');
  const [newsletterIntro, setNewsletterIntro] = useState('Discover mindful yoga experiences across Germany this week. Connect with your practice and our sustainable community.');
  const [isPreview, setIsPreview] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [showSubscriberModal, setShowSubscriberModal] = useState(false);
  const [subscriberSearchTerm, setSubscriberSearchTerm] = useState('');
  const [manualEmails, setManualEmails] = useState('');
  const [showManualEmailInput, setShowManualEmailInput] = useState(false);

  // Get all events (both upcoming and current)
  const allEvents = events || [];
  
  // Get unique cities for filter
  const cities = [...new Set(allEvents.map(event => event.city))].sort();

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !cityFilter || event.city === cityFilter;
    return matchesSearch && matchesCity;
  });

  const filteredSubscribers = mockSubscribers.filter(subscriber => {
    const matchesSearch = subscriber.email.toLowerCase().includes(subscriberSearchTerm.toLowerCase()) ||
                         subscriber.name.toLowerCase().includes(subscriberSearchTerm.toLowerCase()) ||
                         subscriber.city.toLowerCase().includes(subscriberSearchTerm.toLowerCase());
    return matchesSearch;
  });

  const toggleEventSelection = (event: any) => {
    if (selectedEvents.find(e => e.id === event.id)) {
      setSelectedEvents(selectedEvents.filter(e => e.id !== event.id));
    } else {
      setSelectedEvents([...selectedEvents, event]);
    }
  };

  const toggleSubscriberSelection = (subscriber: any) => {
    if (selectedSubscribers.find(s => s.id === subscriber.id)) {
      setSelectedSubscribers(selectedSubscribers.filter(s => s.id !== subscriber.id));
    } else {
      setSelectedSubscribers([...selectedSubscribers, subscriber]);
    }
  };

  const selectAllEvents = () => {
    setSelectedEvents([...filteredEvents]);
  };

  const clearAllEvents = () => {
    setSelectedEvents([]);
  };

  const selectAllSubscribers = () => {
    setSelectedSubscribers([...mockSubscribers.filter(s => s.status === 'active')]);
  };

  const selectAllFilteredSubscribers = () => {
    setSelectedSubscribers([...filteredSubscribers.filter(s => s.status === 'active')]);
  };

  const clearAllSubscribers = () => {
    setSelectedSubscribers([]);
  };

  const handleManualEmailAdd = () => {
    const emails = manualEmails.split('\n').filter(email => email.trim() && email.includes('@'));
    const newSubscribers = emails.map((email, index) => ({
      id: `manual-${Date.now()}-${index}`,
      email: email.trim(),
      name: email.split('@')[0],
      city: 'Manual',
      status: 'active'
    }));
    
    setSelectedSubscribers([...selectedSubscribers, ...newSubscribers]);
    setManualEmails('');
    setShowManualEmailInput(false);
  };

  const handleFileImport = () => {
    // Simulate CSV import
    const csvEmails = [
      'maria.hoffman@email.com',
      'peter.klein@email.com', 
      'julia.richter@email.com'
    ];
    
    const importedSubscribers = csvEmails.map((email, index) => ({
      id: `import-${Date.now()}-${index}`,
      email,
      name: email.split('@')[0],
      city: 'Imported',
      status: 'active'
    }));
    
    setSelectedSubscribers([...selectedSubscribers, ...importedSubscribers]);
    alert(`Imported ${csvEmails.length} email addresses successfully!`);
  };

  const generateNewsletterHTML = () => {
    return `
      <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="background: linear-gradient(135deg, #10B981, #14B8A6); color: white; padding: 40px 24px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 700;">YogaFlow Germany</h1>
          <p style="margin: 8px 0 0 0; opacity: 0.9;">Sustainable Yoga Events</p>
        </div>
        
        <div style="background: white; padding: 24px;">
          <h2 style="color: #1F2937; margin: 0 0 16px 0; font-size: 24px;">${newsletterTitle}</h2>
          <p style="color: #6B7280; margin: 0 0 32px 0; line-height: 1.6;">${newsletterIntro}</p>
          
          <div style="space-y: 24px;">
            ${selectedEvents.map(event => `
              <div style="border: 1px solid #E5E7EB; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <h3 style="color: #1F2937; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">${event.title}</h3>
                <p style="color: #6B7280; margin: 0 0 16px 0; line-height: 1.5;">${event.description}</p>
                
                <div style="margin-bottom: 16px;">
                  <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <span style="color: #6B7280; font-size: 14px;">📍 ${event.location}, ${event.city}</span>
                  </div>
                  <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <span style="color: #6B7280; font-size: 14px;">📅 ${new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div style="display: flex; align-items: center;">
                    <span style="color: #6B7280; font-size: 14px;">⏰ ${event.time}</span>
                  </div>
                </div>
                
                <div style="display: flex; gap: 12px;">
                  <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}" 
                     style="background: #10B981; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; font-size: 14px;">
                    + Add to Calendar
                  </a>
                  <a href="${event.link}" 
                     style="background: #F3F4F6; color: #374151; padding: 8px 16px; text-decoration: none; border-radius: 6px; font-size: 14px;">
                    View Details
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
          
          <div style="text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid #E5E7EB;">
            <p style="color: #6B7280; margin: 0 0 16px 0;">Thank you for supporting sustainable yoga in Germany!</p>
            <p style="color: #9CA3AF; font-size: 14px; margin: 0;">
              YogaFlow Germany • Connecting conscious yogis across the country
            </p>
          </div>
        </div>
      </div>
    `;
  };

  const handleSendNewsletter = () => {
    if (selectedEvents.length === 0) {
      alert('Please select at least one event to include in the newsletter.');
      return;
    }
    if (selectedSubscribers.length === 0) {
      alert('Please select at least one subscriber to send the newsletter to.');
      return;
    }
    alert(`Newsletter scheduled for delivery! 📧\n\nIncluding ${selectedEvents.length} events\nSending to ${selectedSubscribers.length} subscribers`);
  };

  if (isPreview) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Newsletter Preview</h1>
          <button
            onClick={() => setIsPreview(false)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Close Preview</span>
          </button>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-blue-800">
            <Mail className="h-5 w-5" />
            <span className="font-medium">
              Ready to send to {selectedSubscribers.length} subscribers with {selectedEvents.length} events
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div 
            dangerouslySetInnerHTML={{ __html: generateNewsletterHTML() }}
            className="prose prose-sm max-w-none"
          />
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={handleSendNewsletter}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
          >
            <Send className="h-5 w-5" />
            <span>Send Newsletter</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Newsletter Builder</h1>
          <p className="text-gray-600">Select events and subscribers for your newsletter</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsPreview(true)}
            disabled={selectedEvents.length === 0 || selectedSubscribers.length === 0}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              selectedEvents.length === 0 || selectedSubscribers.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </button>
          <button
            onClick={handleSendNewsletter}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
          >
            <Send className="h-4 w-4" />
            <span>Send Newsletter</span>
          </button>
        </div>
      </div>

      {/* Newsletter Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Newsletter Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Newsletter Title
            </label>
            <input
              type="text"
              value={newsletterTitle}
              onChange={(e) => setNewsletterTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Introduction Text
            </label>
            <textarea
              value={newsletterIntro}
              onChange={(e) => setNewsletterIntro(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Subscriber Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Select Recipients ({selectedSubscribers.length} selected)
          </h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowSubscriberModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>Manage Recipients</span>
            </button>
          </div>
        </div>

        {selectedSubscribers.length > 0 ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">
                  Newsletter will be sent to {selectedSubscribers.length} recipients
                </span>
              </div>
              <button
                onClick={clearAllSubscribers}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Clear All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {selectedSubscribers.slice(0, 9).map((subscriber, index) => (
                <div key={index} className="bg-white border border-blue-200 rounded px-3 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{subscriber.name}</p>
                      <p className="text-xs text-gray-500 truncate">{subscriber.email}</p>
                    </div>
                    <button
                      onClick={() => toggleSubscriberSelection(subscriber)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
              {selectedSubscribers.length > 9 && (
                <div className="bg-gray-100 border border-gray-200 rounded px-3 py-2 flex items-center justify-center">
                  <span className="text-sm text-gray-600">
                    +{selectedSubscribers.length - 9} more
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No recipients selected</p>
            <p className="text-gray-400 text-sm mt-1">Click "Manage Recipients" to select who will receive this newsletter</p>
          </div>
        )}
      </div>

      {/* Event Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Select Events to Include ({selectedEvents.length} selected)
          </h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={selectAllEvents}
              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
            >
              Select All ({filteredEvents.length})
            </button>
            <button
              onClick={clearAllEvents}
              className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">All Cities</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        
        {/* Events List */}
        {filteredEvents.length > 0 ? (
          <div className="space-y-3">
            {filteredEvents.map((event, index) => {
              const isSelected = selectedEvents.find(e => e.id === event.id);
              
              return (
                <div 
                  key={event.id || index} 
                  className={`border rounded-lg p-4 transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => toggleEventSelection(event)}
                >
                  <div className="flex items-start space-x-4">
                    {/* Checkbox */}
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        isSelected 
                          ? 'border-emerald-500 bg-emerald-500' 
                          : 'border-gray-300'
                      }`}>
                        {isSelected && <Check className="h-3 w-3 text-white" />}
                      </div>
                    </div>
                    
                    {/* Event Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{event.location}, {event.city}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{event.time}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Event Tags */}
                        <div className="flex flex-col items-end space-y-1 ml-4">
                          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                            {event.type}
                          </span>
                          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                            {event.level}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No events available</p>
            <p className="text-gray-400 text-sm mt-1">
              {allEvents.length === 0 
                ? 'Add some events first to include them in newsletters' 
                : 'Try adjusting your search or filter criteria'
              }
            </p>
          </div>
        )}
      </div>

      {/* Subscriber Management Modal */}
      {showSubscriberModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Manage Newsletter Recipients</h3>
              <button
                onClick={() => setShowSubscriberModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <button
                  onClick={selectAllSubscribers}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                >
                  <Users className="h-4 w-4" />
                  <span>Select All Active ({mockSubscribers.filter(s => s.status === 'active').length})</span>
                </button>
                
                <button
                  onClick={() => setShowManualEmailInput(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Add Emails</span>
                </button>
                
                <button
                  onClick={handleFileImport}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                >
                  <Upload className="h-4 w-4" />
                  <span>Import CSV</span>
                </button>
                
                <button
                  onClick={clearAllSubscribers}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Clear All
                </button>
              </div>

              {/* Manual Email Input */}
              {showManualEmailInput && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-blue-900 mb-3">Add Email Addresses Manually</h4>
                  <textarea
                    value={manualEmails}
                    onChange={(e) => setManualEmails(e.target.value)}
                    placeholder="Enter email addresses, one per line:&#10;user1@example.com&#10;user2@example.com&#10;user3@example.com"
                    rows={4}
                    className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="flex justify-end space-x-3 mt-3">
                    <button
                      onClick={() => setShowManualEmailInput(false)}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleManualEmailAdd}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Add Emails
                    </button>
                  </div>
                </div>
              )}

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search subscribers..."
                  value={subscriberSearchTerm}
                  onChange={(e) => setSubscriberSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Subscribers List */}
              <div className="space-y-2">
                {filteredSubscribers.map((subscriber) => {
                  const isSelected = selectedSubscribers.find(s => s.id === subscriber.id);
                  
                  return (
                    <div 
                      key={subscriber.id}
                      className={`border rounded-lg p-3 transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-emerald-500 bg-emerald-50' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => toggleSubscriberSelection(subscriber)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          isSelected 
                            ? 'border-emerald-500 bg-emerald-500' 
                            : 'border-gray-300'
                        }`}>
                          {isSelected && <Check className="h-3 w-3 text-white" />}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{subscriber.name}</p>
                              <p className="text-sm text-gray-600">{subscriber.email}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500">{subscriber.city}</span>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                subscriber.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {subscriber.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="flex justify-between items-center p-6 border-t border-gray-200">
              <span className="text-sm text-gray-600">
                {selectedSubscribers.length} recipients selected
              </span>
              <button
                onClick={() => setShowSubscriberModal(false)}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};