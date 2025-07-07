import React from 'react';
import { 
  Calendar, 
  Mail, 
  Users, 
  MapPin,
  TrendingUp,
  Activity,
  Clock
} from 'lucide-react';
interface DashboardProps {
  events: any[];
}

export const Dashboard: React.FC<DashboardProps> = ({ events }) => {
  const todayEvents = events.filter(event => {
    const today = new Date();
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === today.toDateString();
  });

  const upcomingEvents = events.filter(event => {
    const today = new Date();
    const eventDate = new Date(event.date);
    return eventDate > today;
  });

  const stats = [
    {
      name: 'Total Events',
      value: events.length,
      icon: Calendar,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      name: 'Newsletter Subscribers',
      value: '2,847',
      icon: Mail,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Active Cities',
      value: '12',
      icon: MapPin,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      name: 'Weekly Growth',
      value: '+15%',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your yoga events overview.</p>
        </div>
        <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-lg">
          <Activity className="h-5 w-5 text-emerald-600" />
          <span className="text-sm text-emerald-700 font-medium">System Active</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Today's Events */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Today's Events</h2>
            <span className="bg-emerald-100 text-emerald-800 text-sm px-2 py-1 rounded-full">
              {todayEvents.length} events
            </span>
          </div>
        </div>
        
        <div className="p-6">
          {todayEvents.length > 0 ? (
            <div className="space-y-4">
              {todayEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-emerald-500 p-2 rounded-lg">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.location} • {event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No events scheduled for today</p>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Events Preview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-3">
            {upcomingEvents.slice(0, 5).map((event, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <div>
                    <span className="font-medium text-gray-900">{event.title}</span>
                    <span className="text-gray-500 text-sm ml-2">• {event.city}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};