import {TimeSlot} from './timeSlot';

export interface Student {
  _id?: string;
  lastName?: string;
  firstName?: string;
  email?: string;
  lastYearMajor: string;
  password?: string;
  numStu?: number;
  lastConnection?: Date;
  major?: string;
  year?: string;
  stateValidation?: string;
  appointment?: {
    timeSlot?: TimeSlot;
    bri?: string;
    status?: string;
  };
}
