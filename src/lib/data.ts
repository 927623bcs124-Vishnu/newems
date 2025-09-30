import type { User, LeaveRequest, AttendanceRecord, Payslip } from './types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    role: 'employee',
    avatar: 'https://picsum.photos/seed/user1/100/100',
    department: 'Engineering',
    position: 'Frontend Developer',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'manager',
    avatar: 'https://picsum.photos/seed/user2/100/100',
    department: 'Engineering',
    position: 'Engineering Manager',
    team: ['1', '3', '4'],
  },
  {
    id: '3',
    name: 'Peter Jones',
    email: 'peter.jones@example.com',
    role: 'employee',
    avatar: 'https://picsum.photos/seed/user3/100/100',
    department: 'Engineering',
    position: 'Backend Developer',
  },
  {
    id: '4',
    name: 'Sara Williams',
    email: 'sara.williams@example.com',
    role: 'employee',
    avatar: 'https://picsum.photos/seed/user4/100/100',
    department: 'Engineering',
    position: 'UI/UX Designer',
  },
  {
    id: '5',
    name: 'Chris Taylor',
    email: 'chris.taylor@example.com',
    role: 'admin',
    avatar: 'https://picsum.photos/seed/user5/100/100',
    department: 'Human Resources',
    position: 'HR Director',
  },
];


// Mock Leave Requests
export const leaveRequests: LeaveRequest[] = [
  { id: 'lr1', userId: '1', userName: 'Alex Doe', leaveType: 'Annual', startDate: '2024-08-10', endDate: '2024-08-12', reason: 'Family vacation.', status: 'Pending' },
  { id: 'lr2', userId: '3', userName: 'Peter Jones', leaveType: 'Sick', startDate: '2024-07-20', endDate: '2024-07-21', reason: 'Feeling unwell.', status: 'Approved' },
  { id: 'lr3', userId: '4', userName: 'Sara Williams', leaveType: 'Annual', startDate: '2024-09-01', endDate: '2024-09-05', reason: 'Trip to the mountains.', status: 'Pending' },
  { id: 'lr4', userId: '1', userName: 'Alex Doe', leaveType: 'Unpaid', startDate: '2024-06-15', endDate: '2024-06-15', reason: 'Personal appointment.', status: 'Rejected' },
];

// Mock Attendance Records for a specific day
const today = new Date().toISOString().split('T')[0];
export const attendanceRecords: AttendanceRecord[] = [
  { id: 'ar1', userId: '1', userName: 'Alex Doe', date: today, status: 'Present', clockIn: '09:05 AM', clockOut: '05:30 PM' },
  { id: 'ar2', userId: '3', userName: 'Peter Jones', date: today, status: 'Absent' },
  { id: 'ar3', userId: '4', userName: 'Sara Williams', date: today, status: 'On Leave' },
];

// Mock Payslips
export const payslips: Payslip[] = [
    { id: 'ps1', userId: '1', month: 'July', year: 2024, netPay: 4500, status: 'Paid', url: '/payslips/july-2024.pdf' },
    { id: 'ps2', userId: '1', month: 'June', year: 2024, netPay: 4450, status: 'Paid', url: '/payslips/june-2024.pdf' },
    { id: 'ps3', userId: '1', month: 'May', year: 2024, netPay: 4550, status: 'Paid', url: '/payslips/may-2024.pdf' },
    { id: 'ps4', userId: '2', month: 'July', year: 2024, netPay: 7500, status: 'Paid', url: '/payslips/july-2024.pdf' },
    { id: 'ps5', userId: '3', month: 'July', year: 2024, netPay: 4800, status: 'Paid', url: '/payslips/july-2024.pdf' },
];
