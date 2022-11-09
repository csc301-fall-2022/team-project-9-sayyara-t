export interface User {
  userId: string,
  roleId: number,
  username: string,
  name: string,
  email: string,
  phone: string,
  vehicles: Array<Vehicle>
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
  rating: number
}

export interface Service {
  serviceId: string,
  name: string,
  description: string,
  price: number
}