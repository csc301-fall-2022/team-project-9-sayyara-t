export interface User {
  userId: string,
  roleId: number,
  username: string,
  name: string,
  email: string,
  phone: string
}

export interface Vehicle {
  vehicleId: string,
  ownerId: string,
  plate: string,
  model: string,
  vin: string,
  mileage: string,
  type: string
}

export interface Shop {
  shopId: string,
  ownerIds: Array<string>,
  name: string,
  address: string,
  phone: string,
  email: string,
  services: Array<Service>,
  description: string,
  time: Time
}

export interface Time {
  start: string,
  end: string
}

export interface Service {
  serviceId: string,
  shopId: string,
  name: string,
  description: string,
  price: number
}

export interface RequestResult {
  success: boolean,
  data: unknown
}

export interface Quote {
  quoteId: string,
  labour: number,
  parts: Array<string>,
  fees: number,
  discount: number, 
  total: number,
  note: string
}

export interface Request {
  requestId: string,
  userId: string,
  shopId: string,
  vehicleId: string,
  quoteId: string,
  linkedRequestId: string,
  services: Array<Service>,
  state: number,
  description: string,
  new_used: number,
  oem_after: number
}