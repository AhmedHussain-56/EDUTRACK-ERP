import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Building,
  Users,
  Search,
  Filter,
  Plus,
  MapPin,
  Bed,
  Wifi,
  Car,
  Coffee,
  Shield,
  CheckCircle,
  AlertCircle,
  Settings
} from 'lucide-react';

const HostelAllocation: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBuilding, setFilterBuilding] = useState('all');
  const [showAllocationModal, setShowAllocationModal] = useState(false);

  const mockHostelRooms = [
    {
      id: '1',
      roomNumber: 'A-101',
      building: 'Block A',
      capacity: 2,
      occupied: 2,
      students: ['John Doe', 'Mike Wilson'],
      status: 'full',
      rent: 15000,
      amenities: ['wifi', 'ac', 'parking']
    },
    {
      id: '2',
      roomNumber: 'A-102',
      building: 'Block A',
      capacity: 3,
      occupied: 1,
      students: ['Sarah Johnson'],
      status: 'available',
      rent: 12000,
      amenities: ['wifi', 'parking']
    },
    {
      id: '3',
      roomNumber: 'B-201',
      building: 'Block B',
      capacity: 2,
      occupied: 0,
      students: [],
      status: 'maintenance',
      rent: 14000,
      amenities: ['wifi', 'ac']
    },
    {
      id: '4',
      roomNumber: 'B-202',
      building: 'Block B',
      capacity: 4,
      occupied: 3,
      students: ['Alice Brown', 'Bob Smith', 'Carol Davis'],
      status: 'available',
      rent: 10000,
      amenities: ['wifi']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'full':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'full':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'maintenance':
        return <Settings className="h-5 w-5 text-yellow-500" />;
      default:
        return <Building className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'ac':
        return <Coffee className="h-4 w-4" />;
      case 'parking':
        return <Car className="h-4 w-4" />;
      case 'security':
        return <Shield className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const filteredRooms = mockHostelRooms.filter(room => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.students.some(student => student.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterBuilding === 'all' || room.building === filterBuilding;
    return matchesSearch && matchesFilter;
  });

  const totalRooms = mockHostelRooms.length;
  const availableRooms = mockHostelRooms.filter(room => room.status === 'available').length;
  const occupiedRooms = mockHostelRooms.filter(room => room.status === 'full').length;
  const maintenanceRooms = mockHostelRooms.filter(room => room.status === 'maintenance').length;
  const totalCapacity = mockHostelRooms.reduce((sum, room) => sum + room.capacity, 0);
  const totalOccupied = mockHostelRooms.reduce((sum, room) => sum + room.occupied, 0);
  const occupancyRate = Math.round((totalOccupied / totalCapacity) * 100);

  if (user?.role === 'student') {
    const studentRoom = mockHostelRooms.find(room => room.students.includes(user.name || 'John Doe'));
    
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Hostel</h1>
          <p className="text-gray-600">View your hostel room details and amenities</p>
        </div>

        {studentRoom ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Room Details</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(studentRoom.status)}`}>
                  {studentRoom.status.charAt(0).toUpperCase() + studentRoom.status.slice(1)}
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">{studentRoom.roomNumber}</p>
                    <p className="text-sm text-gray-600">{studentRoom.building}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Bed className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Capacity: {studentRoom.capacity} students</p>
                    <p className="text-sm text-gray-600">Currently occupied: {studentRoom.occupied}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Monthly Rent</p>
                    <p className="text-sm text-gray-600">₹{studentRoom.rent.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Roommates</h2>
              <div className="space-y-3">
                {studentRoom.students.map((student, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{student}</p>
                      <p className="text-sm text-gray-600">
                        {student === user.name ? 'You' : 'Roommate'}
                      </p>
                    </div>
                  </div>
                ))}
                {Array.from({ length: studentRoom.capacity - studentRoom.occupied }).map((_, index) => (
                  <div key={`empty-${index}`} className="flex items-center p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <Plus className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-500">Available Bed</p>
                      <p className="text-sm text-gray-400">Waiting for allocation</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border lg:col-span-2">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {studentRoom.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                    {getAmenityIcon(amenity)}
                    <span className="ml-2 text-sm font-medium text-blue-900 capitalize">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-sm border text-center">
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">No Room Allocated</h2>
            <p className="text-gray-600 mb-4">You haven't been allocated a hostel room yet.</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
              Apply for Hostel
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hostel Management</h1>
          <p className="text-gray-600">Manage room allocations and track occupancy</p>
        </div>
        <button
          onClick={() => setShowAllocationModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Allocate Room
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Rooms</p>
              <p className="text-2xl font-bold text-gray-900">{totalRooms}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Available</p>
              <p className="text-2xl font-bold text-green-600">{availableRooms}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Occupied</p>
              <p className="text-2xl font-bold text-red-600">{occupiedRooms}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Occupancy Rate</p>
              <p className="text-2xl font-bold text-purple-600">{occupancyRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search rooms, buildings, or students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterBuilding}
          onChange={(e) => setFilterBuilding(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Buildings</option>
          <option value="Block A">Block A</option>
          <option value="Block B">Block B</option>
          <option value="Block C">Block C</option>
        </select>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{room.roomNumber}</h3>
                  <p className="text-sm text-gray-600">{room.building}</p>
                </div>
              </div>
              <div className="flex items-center">
                {getStatusIcon(room.status)}
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(room.status)}`}>
                  {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Capacity:</span>
                <span className="font-medium">{room.capacity} students</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Occupied:</span>
                <span className="font-medium">{room.occupied} students</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Monthly Rent:</span>
                <span className="font-medium">₹{room.rent.toLocaleString()}</span>
              </div>
            </div>

            {room.students.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Current Students:</p>
                <div className="space-y-1">
                  {room.students.map((student, index) => (
                    <div key={index} className="text-sm text-gray-600 flex items-center">
                      <Users className="h-3 w-3 mr-2" />
                      {student}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Amenities:</p>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs">
                    {getAmenityIcon(amenity)}
                    <span className="ml-1 capitalize">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              {room.status === 'available' && (
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors">
                  Allocate
                </button>
              )}
              <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded text-sm transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Allocation Modal */}
      {showAllocationModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <Building className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-900">Allocate Room</h2>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Student
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>John Doe</option>
                    <option>Sarah Wilson</option>
                    <option>Mike Johnson</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Room
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    {mockHostelRooms.filter(room => room.status === 'available').map(room => (
                      <option key={room.id} value={room.id}>
                        {room.roomNumber} - {room.building} (₹{room.rent.toLocaleString()}/month)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAllocationModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Allocate Room
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelAllocation;