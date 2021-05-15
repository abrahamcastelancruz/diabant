export interface Patient {
  userId: string;
  name?: string;
  apePat?: string;
  apeMat?: string;
  email: string;
  phoneNumber?: string;
  direction?: string;
  ccp?: string;
  country?: string;
  state?: string;
  tipoSangre?: string;
  altura?: string;
  peso?: string;
  edad?: string;
  lastGloucose?: number;
  createdAt: number;
  newUser: boolean;
}
