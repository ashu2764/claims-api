const mongoose = require("mongoose");

// /**
//  * Mongoose schema for an insurance claim.
//  * @typedef {Object} Claim
//  * @property {string} companyReference - Unique reference for the company.
//  * @property {string} policyNumber - Policy number associated with the claim.
//  * @property {string} [partnerRef] - Reference for the partner (optional).
//  * @property {Object} incident - Incident details.
//  * @property {Date} incident.date - Date of the incident.
//  * @property {string} incident.circumstances - Description of the incident.
//  * @property {string} [incident.damageToVehicle] - Damage to the vehicle (optional).
//  * @property {string} [incident.preExistingDamage] - Pre-existing damage to the vehicle (optional).
//  * @property {Object} vehicle - Vehicle details.
//  * @property {string} vehicle.registrationNumber - Registration number of the vehicle.
//  * @property {string} vehicle.make - Make of the vehicle.
//  * @property {string} vehicle.model - Model of the vehicle.
//  * @property {string} [vehicle.engineSize] - Engine size of the vehicle (optional).
//  * @property {Date} [vehicle.registrationDate] - Registration date of the vehicle (optional).
//  * @property {Object} [thirdParty] - Third-party details (optional).
//  * @property {string} [thirdParty.insurer] - Third-party insurer name (optional).
//  * @property {string} [thirdParty.reference] - Third-party reference number (optional).
//  * @property {string} [thirdParty.client] - Third-party client name (optional).
//  * @property {string} [thirdParty.registrationNumber] - Third-party vehicle registration number (optional).
//  * @property {Object} driver - Driver details.
//  * @property {string} driver.firstName - Driver's first name.
//  * @property {string} driver.lastName - Driver's last name.
//  * @property {string} [driver.title] - Driver's title (optional).
//  * @property {Object} [driver.address] - Driver's address (optional).
//  * @property {string} [driver.address.line1] - Address line 1 (optional).
//  * @property {string} [driver.address.postcode] - Postal code (optional).
//  * @property {Object} [driver.contact] - Driver's contact details (optional).
//  * @property {string} [driver.contact.home] - Home phone number (optional).
//  * @property {string} [driver.contact.work] - Work phone number (optional).
//  * @property {string} [driver.contact.mobile] - Mobile phone number (optional).
//  * @property {string} [driver.contact.email] - Email address (optional).
//  * @property {Object} [repair] - Repair details (optional).
//  * @property {string} [repair.repairerName] - Name of the repairer (optional).
//  * @property {Date} [repair.bookingDate] - Date of repair booking (optional).
//  * @property {Date} [repair.estimateReceivedDate] - Date when estimate was received (optional).
//  * @property {Date} [repair.authorizedDate] - Date when repair was authorized (optional).
//  * @property {number} [repair.authorizedAmount] - Authorized repair amount (optional).
//  * @property {Date} [repair.completionDate] - Date when the repair was completed (optional).
//  * @property {Object} [repair.invoice] - Invoice details (optional).
//  * @property {Date} [repair.invoice.receivedDate] - Date invoice was received (optional).
//  * @property {Date} [repair.invoice.approvedDate] - Date invoice was approved (optional).
//  * @property {Object} [salvage] - Salvage details (optional).
//  * @property {number} [salvage.amount] - Salvage amount (optional).
//  * @property {string} [salvage.category] - Salvage category (optional).
//  * @property {string} status - Claim status (Pending, In Progress, Completed).
//  * @property {Object} costs - Claim costs.
//  * @property {Object} costs.repair - Repair cost details.
//  * @property {number} costs.repair.net - Net repair cost.
//  * @property {number} costs.repair.vat - VAT on repair cost.
//  * @property {number} costs.repair.gross - Gross repair cost.
//  */

const claimSchema = new mongoose.Schema(
    {
        companyReference: { type: String, required: true, trim: true, unique: true, index: true },
        policyNumber: { type: String, required: true, trim: true, unique: true },
        partnerRef: { type: String, trim: true, unique: true },

        incident: {
            date: { type: Date, required: true, default: Date.now },
            circumstances: { type: String, required: true, trim: true },
            damageToVehicle: { type: String, trim: true },
            preExistingDamage: { type: String, trim: true },
        },

        vehicle: {
            registrationNumber: { type: String, required: true, trim: true, unique: true, index: true },
            make: { type: String, required: true, trim: true },
            model: { type: String, required: true, trim: true },
            engineSize: { type: String, trim: true },
            registrationDate: { type: Date, default: null },
        },

        thirdParty: {
            insurer: { type: String, trim: true },
            reference: { type: String, trim: true },
            client: { type: String, trim: true },
            registrationNumber: { type: String, trim: true },
        },

        driver: {
            firstName: { type: String, required: true, trim: true },
            lastName: { type: String, required: true, trim: true },
            title: { type: String, trim: true },
            address: {
                line1: { type: String, trim: true },
                postcode: { type: String, trim: true },
            },
            contact: {
                home: { type: String, trim: true },
                work: { type: String, trim: true },
                mobile: { type: String, trim: true },
                email: { type: String, trim: true, lowercase: true },
            },
        },

        repair: {
            repairerName: { type: String, trim: true },
            bookingDate: { type: Date, default: null },
            estimateReceivedDate: { type: Date, default: null },
            authorizedDate: { type: Date, default: null },
            authorizedAmount: { type: Number, min: 0 },
            completionDate: { type: Date, default: null },
            invoice: {
                receivedDate: { type: Date, default: null },
                approvedDate: { type: Date, default: null },
            },
        },

        salvage: {
            amount: { type: Number, min: 0 },
            category: { type: String, trim: true },
        },

        status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed"],
            required: true,
            default: "Pending"
        },

        costs: {
            repair: {
                net: { type: Number, required: true, min: 0 },
                vat: { type: Number, required: true, min: 0 },
                gross: { type: Number, required: true, min: 0 },
            },
        },
    },
    { timestamps: true }
);



module.exports = mongoose.model("Claim", claimSchema);
