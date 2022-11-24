const { v4: uuidv4 } = require('uuid');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Services', [
      {
        id: uuidv4(),
        type: 'exhaust',
        name: 'Catalytic Converter Repair/Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'exhaust',
        name: 'Exhaust Repair/Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'exhaust',
        name: 'Exhaust Manifold Repair/Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'exhaust',
        name: 'Muffler Repair/Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'exhaust',
        name: 'Tailpipe Repair/Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'hvac',
        name: 'AC Belt Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'hvac',
        name: 'Compressor Repair/Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'hvac',
        name: 'Evaporator Repair/Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'hvac',
        name: 'Heating & Cooling System Diagnostics',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'hvac',
        name: 'Cooling System Repair',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'hvac',
        name: 'Heating System Repair/Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'hvac',
        name: 'Refrigerant Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'electrical',
        name: 'Alternator Repair & Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'electrical',
        name: 'Electrical System Diagnostics & Repair',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'electrical',
        name: 'Power Antenna Repair',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'electrical',
        name: 'Check Engine Light Diagnostics & Repair',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'electrical',
        name: 'Light Repair & Bulb Replacements',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'electrical',
        name: 'Power Accessory Repair',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'electrical',
        name: 'Power Lock Repair',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'electrical',
        name: 'Power Steering Repair',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'electrical',
        name: 'Power Window Repair',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'electrical',
        name: 'Windshield Wiper Repair',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'transmission',
        name: 'Axle Repair & Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'transmission',
        name: 'Clutch Repair & Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'transmission',
        name: 'Differential Diagnosis',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'transmission',
        name: 'Differential Rebuild & Service',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'transmission',
        name: 'Driveline Repair & Maintenance',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'transmission',
        name: 'Driveshaft & U-Joint Repair',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'transmission',
        name: 'Flywheel Repair & Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'transmission',
        name: 'Transmission Fluid Service',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'transmission',
        name: 'Transmission Flush',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'transmission',
        name: 'Transmission Repair & Service',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'transmission',
        name: 'Transmission Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'tire',
        name: 'Wheel Balancing',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'tire',
        name: 'Tire Installation',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'tire',
        name: 'Tire Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'tire',
        name: 'Tire Rotation',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'tire',
        name: 'Wheel Alignment',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'tire',
        name: 'Flat Tire Repair',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'tire',
        name: 'Season Tire Change',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'tire',
        name: 'Curb rash repair',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'tire',
        name: 'Wheel refinishing/Rim Repair',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'engine',
        name: 'Timing Belt Repair/Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'engine',
        name: 'Serpentine Belt Repair/Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'engine',
        name: 'Drivability Diagnostics & Repair',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'engine',
        name: 'Engine Repair',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'engine',
        name: 'Engine Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'engine',
        name: 'Engine Performance Check',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'engine',
        name: 'Fuel Injection Repair & Service',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'engine',
        name: 'Fuel System Repair & Maintenance',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'engine',
        name: 'Hose Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'engine',
        name: 'Ignition System Repair & Maintenance',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'engine',
        name: 'Radiator Repair & Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'engine',
        name: 'Water Pump Repair & Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'brake',
        name: 'Brake Pad Replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'brake',
        name: 'Brake Calliper service',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'brake',
        name: 'Brake fluid leak',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'brake',
        name: 'Disk rotor resurface',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'maintenance',
        name: 'Shocks & Struts Repair',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'maintenance',
        name: 'Ball joint replacement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'maintenance',
        name: 'Factory Scheduled Maintenance',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'maintenance',
        name: 'Filter Replacements',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'maintenance',
        name: '12 point Inspection',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'maintenance',
        name: 'Oil Change',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        type: 'maintenance',
        name: 'Windshield Wiper Blades',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Services', null, {});
  }
};
