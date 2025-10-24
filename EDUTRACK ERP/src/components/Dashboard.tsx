import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Users,
  CreditCard,
  Building,
  FileText,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data for charts
  const admissionData = [
    { month: 'Jan', admissions: 45 },
    { month: 'Feb', admissions: 52 },
    { month: 'Mar', admissions: 38 },
    { month: 'Apr', admissions: 61 },
    { month: 'May', admissions: 55 },
    { month: 'Jun', admissions: 67 },
  ];

  const feeCollectionData = [
    { month: 'Jan', amount: 125000 },
    { month: 'Feb', amount: 142000 },
    { month: 'Mar', amount: 138000 },
    { month: 'Apr', amount: 155000 },
    { month: 'May', amount: 148000 },
    { month: 'Jun', amount: 162000 },
  ];

  const hostelOccupancyData = [
    { name: 'Occupied', value: 245, color: '#3B82F6' },
    { name: 'Available', value: 55, color: '#E5E7EB' },
  ];

  const gradeDistribution = [
    { grade: 'A+', count: 45 },
    { grade: 'A', count: 78 },
    { grade: 'B+', count: 92 },
    { grade: 'B', count: 67 },
    { grade: 'C+', count: 34 },
    { grade: 'C', count: 18 },
  ];

  const stats = [
    {
      name: 'Total Students',
      value: '1,247',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'blue',
    },
    {
      name: 'Fees Collected',
      value: '₹8.2L',
      change: '+8%',
      changeType: 'increase',
      icon: CreditCard,
      color: 'green',
    },
    {
      name: 'Hostel Occupancy',
      value: '82%',
      change: '+5%',
      changeType: 'increase',
      icon: Building,
      color: 'purple',
    },
    {
      name: 'Exams Conducted',
      value: '156',
      change: '+23%',
      changeType: 'increase',
      icon: FileText,
      color: 'orange',
    },
  ];

  const recentActivities = [
    { id: 1, type: 'admission', message: 'New admission application from John Doe', time: '2 hours ago' },
    { id: 2, type: 'fee', message: 'Fee payment received from Sarah Wilson', time: '4 hours ago' },
    { id: 3, type: 'hostel', message: 'Room B-204 allocated to Mike Johnson', time: '6 hours ago' },
    { id: 4, type: 'exam', message: 'Mathematics exam results uploaded', time: '1 day ago' },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500';
  };

  if (user?.role === 'student') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Fee Status</p>
                <p className="text-lg font-semibold text-green-600">Paid</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Building className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Hostel Room</p>
                <p className="text-lg font-semibold text-gray-900">B-204</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Current GPA</p>
                <p className="text-lg font-semibold text-gray-900">3.8</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Attendance</p>
                <p className="text-lg font-semibold text-gray-900">92%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Exam Results</h3>
            <div className="space-y-3">
              {[
                { subject: 'Mathematics', grade: 'A', marks: '85/100' },
                { subject: 'Physics', grade: 'A+', marks: '92/100' },
                { subject: 'Chemistry', grade: 'B+', marks: '78/100' },
                { subject: 'English', grade: 'A', marks: '88/100' },
              ].map((exam, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{exam.subject}</p>
                    <p className="text-sm text-gray-600">{exam.marks}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    exam.grade.startsWith('A') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {exam.grade}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {[
                { event: 'Mid-term Exams', date: 'March 15-20, 2024', type: 'exam' },
                { event: 'Fee Payment Due', date: 'March 25, 2024', type: 'fee' },
                { event: 'Sports Day', date: 'April 2, 2024', type: 'event' },
                { event: 'Parent-Teacher Meeting', date: 'April 8, 2024', type: 'meeting' },
              ].map((item, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-lg mr-3 ${
                    item.type === 'exam' ? 'bg-red-100' :
                    item.type === 'fee' ? 'bg-yellow-100' :
                    item.type === 'event' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    <FileText className={`h-4 w-4 ${
                      item.type === 'exam' ? 'text-red-600' :
                      item.type === 'fee' ? 'text-yellow-600' :
                      item.type === 'event' ? 'text-green-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.event}</p>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Real-time overview of your institution</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm text-gray-600">{stat.name}</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className={`ml-2 flex items-center text-sm ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.changeType === 'increase' ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {stat.change}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Admissions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={admissionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="admissions" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fee Collection Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={feeCollectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
              <Line type="monotone" dataKey="amount" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hostel Occupancy</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={hostelOccupancyData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {hostelOccupancyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {hostelOccupancyData.map((entry, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: entry.color }} />
                <span className="text-sm text-gray-600">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gradeDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grade" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg mr-4">
                {activity.type === 'admission' && <Users className="h-5 w-5 text-blue-600" />}
                {activity.type === 'fee' && <CreditCard className="h-5 w-5 text-green-600" />}
                {activity.type === 'hostel' && <Building className="h-5 w-5 text-purple-600" />}
                {activity.type === 'exam' && <FileText className="h-5 w-5 text-orange-600" />}
              </div>
              <div className="flex-1">
                <p className="text-gray-900">{activity.message}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;