export type UserRole = 'employee' | 'manager' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
  position: string;
  team?: string[]; 
};

export type LeaveRequest = {
  id: string;
  userId: string;
  userName: string;
  leaveType: 'Annual' | 'Sick' | 'Unpaid' | 'Maternity';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};

export type AttendanceRecord = {
  id: string;
  userId: string;
  userName: string;
  date: string;
  status: 'Present' | 'Absent' | 'On Leave';
  clockIn?: string;
  clockOut?: string;
};

export type Payslip = {
  id: string;
  userId: string;
  month: string;
  year: number;
  netPay: number;
  status: 'Paid' | 'Pending';
  url: string;
};
