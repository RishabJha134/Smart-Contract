// Enum for contract statuses
export enum ContractStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  COMPLETED = "completed",
  TERMINATED = "terminated",
  EXPIRED = "expired"
}

// Enum for milestone statuses
export enum MilestoneStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  PAID = "paid",
  OVERDUE = "overdue"
}

// User type enum
export enum UserType {
  CLIENT = "client",
  FREELANCER = "freelancer",
  BUSINESS = "business",
  ADMIN = "admin"
}

// Interface for milestone
export interface Milestone {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date | string;
  status: MilestoneStatus;
  amount?: number;
  currencyCode?: string;
}

// Interface for inserting a new milestone (without ID)
export interface InsertMilestone {
  title: string;
  description?: string;
  dueDate?: Date | string;
  status: MilestoneStatus;
  amount?: number;
  currencyCode?: string;
}

// Interface for contract
export interface Contract {
  id: string;
  title: string;
  description?: string;
  startDate: Date | string;
  endDate?: Date | string;
  status: ContractStatus;
  parties: Array<{
    id: string;
    name: string;
    role: string;
    email?: string;
  }>;
  milestones: Milestone[];
  totalAmount?: number;
  currencyCode?: string;
}