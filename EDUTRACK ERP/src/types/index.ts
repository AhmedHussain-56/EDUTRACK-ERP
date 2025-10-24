export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'student';
  avatar?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  year: number;
  admissionDate: string;
  status: 'active' | 'inactive' | 'graduated';
  hostelRoom?: string;
  feeStatus: 'paid' | 'pending' | 'overdue';
  totalFees: number;
  paidFees: number;
}

export interface AdmissionApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  previousEducation: string;
  documents: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  type: 'tuition' | 'hostel' | 'exam' | 'library' | 'other';
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate?: string;
  receiptNumber?: string;
}

export interface HostelRoom {
  id: string;
  roomNumber: string;
  building: string;
  capacity: number;
  occupied: number;
  students: string[];
  status: 'available' | 'full' | 'maintenance';
  rent: number;
}

export interface ExamRecord {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  examType: 'midterm' | 'final' | 'quiz' | 'assignment';
  maxMarks: number;
  obtainedMarks: number;
  grade: string;
  examDate: string;
  semester: string;
}

export interface DashboardStats {
  totalStudents: number;
  newAdmissions: number;
  totalFeesCollected: number;
  pendingFees: number;
  hostelOccupancy: number;
  totalHostelRooms: number;
  examsConducted: number;
  averageGrade: string;
}