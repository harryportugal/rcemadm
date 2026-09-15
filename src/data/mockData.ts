import {
  LoanRequest,
  Client,
  Transaction,
  LineReport,
  AnalystReport,
  LoanOffer,
  TeamMember,
} from '@/types';

const FIRST_NAMES = [
  'Henrique', 'Bianca', 'Huadson', 'Maria', 'João', 'Ana', 'Carlos', 'Juliana',
  'Pedro', 'Larissa', 'Rafael', 'Camila', 'Lucas', 'Fernanda', 'Bruno', 'Patrícia',
  'Diego', 'Gabriela', 'Thiago', 'Aline', 'Marcos', 'Vanessa', 'Felipe', 'Beatriz',
  'Rodrigo', 'Letícia', 'Gustavo', 'Amanda', 'Vinícius', 'Priscila', 'André', 'Carla',
  'Daniel', 'Renata', 'Eduardo', 'Sabrina', 'Igor', 'Tatiane', 'Murilo', 'Débora',
];

const LAST_NAMES = [
  'Santos', 'Silva', 'Oliveira', 'Souza', 'Lima', 'Pereira', 'Costa', 'Almeida',
  'Ribeiro', 'Carvalho', 'Gomes', 'Martins', 'Rocha', 'Barbosa', 'Araújo', 'Nascimento',
];

const STREETS = [
  'Rua Alberto Marceli, 160, Várzea Paulista - SP',
  'Av. Brasil, 1024, Guarulhos - SP',
  'Rua das Flores, 87, São Paulo - SP',
  'Rua Teófilo Otoni, 107, Guarulhos - SP',
  'Av. Paulista, 900, São Paulo - SP',
  'Rua XV de Novembro, 412, Campinas - SP',
];

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg,#159A6A,#0E5A3F)',
  'linear-gradient(135deg,#1D1D1F,#3A3A3C)',
  'linear-gradient(135deg,#48484A,#636366)',
  'linear-gradient(135deg,#2C2C2E,#1C1C1E)',
  'linear-gradient(135deg,#159A6A,#107852)',
];

export const MOCK_CLIENTS: Client[] = Array.from({ length: 44 }, (_, i) => {
  const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
  const lastName = LAST_NAMES[(i * 7 + 3) % LAST_NAMES.length];
  const name = `${firstName} ${lastName}`;
  const pad3 = String(100 + i * 37).padStart(3, '0');
  const pad3b = String(200 + i * 53).padStart(3, '0');
  const pad4a = String(3100 + i * 131).padStart(4, '0');
  const pad4b = String(2100 + i * 577).padStart(4, '0');

  return {
    id: `cli-${i + 1}`,
    name,
    cpf: `***.${pad3}.${pad3b}-**`,
    phone: `(11) 9${pad4a}-${pad4b}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@gmail.com`,
    address: STREETS[i % STREETS.length],
    createdAt: `${String(1 + ((i * 3) % 28)).padStart(2, '0')}/0${5 + (i % 2)}/2026`,
    collectorName: i % 3 === 0 ? (i % 2 === 0 ? 'Gabriel' : 'Juninho') : undefined,
    status: i === 7 || i === 19 ? 'blacklisted' : 'active',
    activeLoanAmount: (200 + (i % 5) * 50) * 1.6,
    totalLoans: 1 + (i % 4),
    avatarBg: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length],
    blacklistReason: i === 7 ? 'Inadimplência reincidente > 60 dias' : i === 19 ? 'Fraude documental de comprovante de residência' : undefined,
    blacklistDate: i === 7 ? '14/06/2026' : i === 19 ? '02/07/2026' : undefined,
  };
});

export const MOCK_REQUESTS: LoanRequest[] = Array.from({ length: 30 }, (_, i) => {
  const client = MOCK_CLIENTS[i % MOCK_CLIENTS.length];
  const principal = [200, 250, 300, 400, 500, 350][i % 6];
  const score = 86 + (i % 13);
  const statusList: ('pending' | 'approved' | 'rejected' | 'disbursed')[] = [
    'pending', 'pending', 'approved', 'disbursed', 'rejected', 'pending'
  ];

  return {
    id: `req-${1000 + i}`,
    clientName: client.name,
    cpf: client.cpf,
    phone: client.phone,
    email: client.email,
    address: client.address,
    amount: principal,
    totalWithInterest: principal * 1.6,
    date: `${String(1 + ((i * 2) % 28)).padStart(2, '0')}/07/2026`,
    faceMatchScore: score,
    status: statusList[i % statusList.length],
    analystName: i % 2 === 0 ? 'Gabriela' : 'Analista Teste',
    line: `São Paulo 00${(i % 5) + 1}`,
    income: 2800 + (i % 4) * 450,
    profession: ['Autônomo', 'Comerciante', 'CLT / Logística', 'Prestador de Serviços'][i % 4],
    previousLoansCount: i % 5,
    paidOnTimeCount: Math.max(0, (i % 5) - (i % 2)),
    lateCount: i % 2,
    pixType: 'cpf',
    pixKey: client.cpf,
    notes: 'Documentação validada pelo motor antifraude. Sem restrições cadastrais anteriores.',
  };
});

export const MOCK_TRANSACTIONS: Transaction[] = Array.from({ length: 40 }, (_, i) => {
  const client = MOCK_CLIENTS[i % MOCK_CLIENTS.length];
  const principal = [200, 250, 300, 400, 500][i % 5];
  const interest = principal * 0.6;
  const isLate = i % 4 === 1;
  const isPaid = i % 4 === 2;
  const isDisbursed = i % 4 === 3;

  return {
    id: `tx-${5000 + i}`,
    clientName: client.name,
    principal,
    interest,
    penaltyFee: isLate ? 40 : 0,
    totalAmount: principal + interest + (isLate ? 40 : 0),
    dueDate: `${String(1 + ((i * 3) % 28)).padStart(2, '0')}/07/2026`,
    paidDate: isPaid ? `${String(1 + ((i * 3) % 28)).padStart(2, '0')}/07/2026` : undefined,
    status: isPaid ? 'paid' : isLate ? 'late' : isDisbursed ? 'pending_disbursement' : 'on_time',
    daysLate: isLate ? (i % 12) + 2 : 0,
    collectorName: i % 2 === 0 ? 'Juninho' : 'Gabriel',
    line: `São Paulo 00${(i % 4) + 1}`,
  };
});

export const MOCK_LINES: LineReport[] = [
  {
    id: 'line-1',
    name: 'São Paulo 001',
    collectorName: 'Gabriel',
    contractsCount: 184,
    totalContracted: 235520,
    totalReceived: 165600,
    totalOverdue: 22080,
    performancePercent: 88.5,
  },
  {
    id: 'line-2',
    name: 'São Paulo 002',
    collectorName: 'Juninho',
    contractsCount: 231,
    totalContracted: 295680,
    totalReceived: 207900,
    totalOverdue: 27720,
    performancePercent: 85.2,
  },
  {
    id: 'line-3',
    name: 'São Paulo 003',
    collectorName: 'Pedro Silva',
    contractsCount: 142,
    totalContracted: 181760,
    totalReceived: 127800,
    totalOverdue: 17040,
    performancePercent: 91.4,
  },
  {
    id: 'line-4',
    name: 'São Paulo 004',
    collectorName: 'Lucas Rocha',
    contractsCount: 198,
    totalContracted: 253440,
    totalReceived: 178200,
    totalOverdue: 23760,
    performancePercent: 82.0,
  },
];

export const MOCK_ANALYSTS: Record<string, AnalystReport> = {
  todos: {
    key: 'todos',
    name: 'Todos os analistas',
    role: 'Equipe KYC',
    analyzedCount: 96,
    approvedCount: 68,
    rejectedCount: 24,
    pendingCount: 4,
    approvalRate: '73,9%',
    lateConversionCount: 5,
    defaultRate: '7,4%',
    avgTime: '3,2 h',
    todayCount: 7,
    refusalRate: '26,1%',
  },
  gabriela: {
    key: 'gabriela',
    name: 'Gabriela',
    role: 'Analista KYC Pleno',
    analyzedCount: 60,
    approvedCount: 44,
    rejectedCount: 13,
    pendingCount: 3,
    approvalRate: '77,2%',
    lateConversionCount: 2,
    defaultRate: '4,5%',
    avgTime: '3,0 h',
    todayCount: 4,
    refusalRate: '22,8%',
  },
  teste: {
    key: 'teste',
    name: 'Analista Teste',
    role: 'Analista KYC',
    analyzedCount: 36,
    approvedCount: 24,
    rejectedCount: 11,
    pendingCount: 1,
    approvalRate: '68,6%',
    lateConversionCount: 3,
    defaultRate: '12,5%',
    avgTime: '3,6 h',
    todayCount: 3,
    refusalRate: '31,4%',
  },
};

export const MOCK_OFFERS: LoanOffer[] = [
  {
    id: 'off-1',
    name: 'Oferta Padrão (Entrada)',
    principal: 200,
    totalToPay: 320,
    installments: 1,
    interestRate: 60,
    active: true,
    minScore: 65,
    description: 'Oferta padrão para novos clientes cadastrados via KYC inicial.',
  },
  {
    id: 'off-2',
    name: 'Oferta Prata (Recorrente)',
    principal: 350,
    totalToPay: 560,
    installments: 1,
    interestRate: 60,
    active: true,
    minScore: 78,
    description: 'Para clientes com histórico de no mínimo 2 empréstimos quitados em dia.',
  },
  {
    id: 'off-3',
    name: 'Oferta Ouro (Fidelidade)',
    principal: 500,
    totalToPay: 800,
    installments: 1,
    interestRate: 60,
    active: true,
    minScore: 88,
    description: 'Crédito premium de liberação imediata sem burocracia.',
  },
];

export const MOCK_TEAM: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Henrique Administrador',
    email: 'henrique.admin@rcem.com',
    role: 'admin',
    roleLabel: 'Administrador',
    status: 'active',
    joinedDate: '10/01/2025',
    phone: '(11) 98765-4321',
  },
  {
    id: 'team-2',
    name: 'Gabriela Analista',
    email: 'gabriela.kyc@rcem.com',
    role: 'ana',
    roleLabel: 'Analista KYC',
    status: 'active',
    joinedDate: '15/03/2025',
    phone: '(11) 97654-3210',
  },
  {
    id: 'team-3',
    name: 'Gabriel Cobrador',
    email: 'gabriel.cobranca@rcem.com',
    role: 'cob',
    roleLabel: 'Cobrador',
    status: 'active',
    joinedDate: '01/04/2025',
    phone: '(11) 96543-2109',
  },
  {
    id: 'team-4',
    name: 'Juninho Cobrador',
    email: 'juninho.cobranca@rcem.com',
    role: 'cob',
    roleLabel: 'Cobrador',
    status: 'active',
    joinedDate: '12/04/2025',
    phone: '(11) 95432-1098',
  },
  {
    id: 'team-5',
    name: 'Fernanda Financeiro',
    email: 'fernanda.fin@rcem.com',
    role: 'fin',
    roleLabel: 'Financeiro',
    status: 'active',
    joinedDate: '20/02/2025',
    phone: '(11) 94321-0987',
  },
];
