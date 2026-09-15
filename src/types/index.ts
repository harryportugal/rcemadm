export type Role = 'admin' | 'ana' | 'cob' | 'fin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  roleLabel: string;
  avatarBg?: string;
  initials?: string;
}

export type RequestStatus = 'pending' | 'approved' | 'rejected' | 'disbursed';

export interface LoanRequest {
  id: string;
  clientName: string;
  cpf: string;
  phone: string;
  email: string;
  address: string;
  amount: number;
  totalWithInterest: number;
  date: string;
  faceMatchScore: number;
  status: RequestStatus;
  analystName?: string;
  line?: string;
  notes?: string;
  income?: number;
  profession?: string;
  previousLoansCount?: number;
  paidOnTimeCount?: number;
  lateCount?: number;
  pixType?: 'cpf' | 'phone' | 'email';
  pixKey?: string;
}

export interface Client {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  address: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  createdAt: string;
  collectorName?: string;
  status: 'active' | 'blacklisted' | 'pending';
  activeLoanAmount?: number;
  totalLoans?: number;
  avatarBg?: string;
  blacklistReason?: string;
  blacklistDate?: string;
}

export type TransactionStatus = 'on_time' | 'late' | 'paid' | 'pending_disbursement';

export interface Transaction {
  id: string;
  clientName: string;
  principal: number;
  interest: number;
  penaltyFee?: number;
  totalAmount: number;
  dueDate: string;
  paidDate?: string;
  status: TransactionStatus;
  daysLate?: number;
  collectorName?: string;
  line: string;
}

export interface LineReport {
  id: string;
  name: string;
  collectorName: string;
  contractsCount: number;
  totalContracted: number;
  totalReceived: number;
  totalOverdue: number;
  performancePercent: number;
}

export interface AnalystReport {
  key: string;
  name: string;
  role: string;
  analyzedCount: number;
  approvedCount: number;
  rejectedCount: number;
  pendingCount: number;
  approvalRate: string;
  lateConversionCount: number;
  defaultRate: string;
  avgTime: string;
  todayCount: number;
  refusalRate: string;
}

export interface LoanOffer {
  id: string;
  name: string;
  principal: number;
  totalToPay: number;
  installments: number;
  interestRate: number;
  active: boolean;
  minScore: number;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  roleLabel: string;
  status: 'active' | 'inactive';
  joinedDate: string;
  phone: string;
}
