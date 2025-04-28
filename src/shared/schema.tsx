// Enum for milestone statuses
export enum MilestoneStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  PAID = "paid",
  OVERDUE = "overdue",
  NOT_STARTED = "not_started",
  IN_PROGRESS = "in_progress", 
  PENDING_REVIEW = "pending_review",
  READY_FOR_PAYMENT = "ready_for_payment"
}

// Enum for contract statuses
export enum ContractStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  COMPLETED = "completed",
  TERMINATED = "terminated",
  EXPIRED = "expired",
  PENDING = "pending",
  CANCELLED = "cancelled"
}

// User type enum
export enum UserType {
  CLIENT = "client",
  FREELANCER = "freelancer",
  BUSINESS = "business",
  ADMIN = "admin"
}

// Add the Template interface
export interface Template {
  id: string;
  title: string;
  description?: string;
  content: string;
  category: string;
}

// Interface for milestone (update with missing properties)
export interface Milestone {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date | string;
  status: MilestoneStatus;
  amount?: number;
  currencyCode?: string;
  completedDate?: Date | string;
}

// Interface for inserting a milestone (without ID)
export interface InsertMilestone {
  title: string;
  description?: string;
  dueDate?: Date | string;
  status: MilestoneStatus;
  amount?: number;
  currencyCode?: string;
  completedDate?: Date | string;
}

// Update the Contract interface with missing properties
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
  clientId?: string;
  freelancerId?: string;
  contractType?: string;
}

// Add InsertContract interface
export interface InsertContract {
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
  milestones: InsertMilestone[];
  totalAmount?: number;
  currencyCode?: string;
  clientId?: string;
  freelancerId?: string;
  contractType?: string;
}