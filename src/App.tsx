import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Events } from './pages/Events';
import { Newsletter } from './pages/Newsletter';
import { Subscribers } from './pages/Subscribers';
import { Calendar } from './pages/Calendar';
import { mockEvents } from './data/mockEvents';

type Page = 'dashboard' | 'events' | 'newsletter' | 'subscribers' | 'calendar';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allEvents, setAllEvents] = useState(mockEvents);

  const addEvent = (newEvent: any) => {
    setAllEvents([...allEvents, newEvent]);
  };
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard events={allEvents} />;
      case 'events':
        return <Events events={allEvents} onAddEvent={addEvent} />;
      case 'newsletter':
        return <Newsletter events={allEvents} />;
      case 'subscribers':
        return <Subscribers />;
      case 'calendar':
        return <Calendar events={allEvents} />;
      default:
        return <Dashboard events={allEvents} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        <Sidebar 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 lg:ml-64">
          <div className="p-6">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;