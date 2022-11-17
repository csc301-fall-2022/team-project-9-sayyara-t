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
  quoteId: string
  userId: string
  total: number
  note: string
}