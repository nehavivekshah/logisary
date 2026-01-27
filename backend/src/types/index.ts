export type UserRole = 'SHIPPER' | 'CARRIER' | 'ADMIN';

export interface User {
    id: string; // UUID
    email: string;
    password_hash: string;
    role: UserRole;
    full_name: string;
    phone_number?: string;
    is_verified: boolean;
    created_at: Date;
}

export interface CarrierProfile {
    user_id: string;
    company_name: string;
    fleet_size: number;
    service_types: string[]; // e.g., ["LIQUID", "DRY_BULK"]
    rating: number;
}

export type JobStatus = 'OPEN' | 'ASSIGNED' | 'IN_TRANSIT' | 'COMPLETED' | 'CANCELLED';

export interface Job {
    id: string;
    shipper_id: string;
    origin: string;
    destination: string;
    material_type: string;
    weight_volume: string;
    scheduled_date: Date;
    status: JobStatus;
    description?: string;
    created_at: Date;
}

export type BidStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface Bid {
    id: string;
    job_id: string;
    carrier_id: string;
    amount: number;
    estimated_delivery_time?: string;
    status: BidStatus;
    message?: string;
    created_at: Date;
}
