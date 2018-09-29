import { AppState } from '@app/core';

export interface SignUpPayload {
  id: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  email: string;
  city: string;
  status: SignUpStatus;
  reason?: string;
}

export interface SignUpState {
  data: SignUpMap;
  filter: SignUpFilters;
}

export interface State extends AppState {
  signup: SignUpState;
}

export interface SignUpMap {
  [id: string]: SignUpPayload;
}

export interface SignUpFilters {
  searchTerm: string;
  showPending: boolean;
  showRejected: boolean;
  showAccepted: boolean;
}

export enum SignUpStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED'
}
