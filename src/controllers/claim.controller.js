const Claim = require('../models/claim.models')
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

/**
 * Creates a new claim.
 * @async
 * @function createClaim
 * @param {ExpressRequest} req - Express request object.
 * @param {ExpressResponse} res - Express response object.
 */


exports.createClaim = async (req, res) => {
    try {

        if (!req.body.companyReference || !req.body.policyNumber) {
            return res.status(400).json({ success: false, error: "Missing required fields: companyReference or policyNumber" });
        }

        const claim = new Claim(req.body);
        const savedClaim = await claim.save();

        res.status(201).json({
            success: true,
            message: "Claim created successfully",
            claim: savedClaim
        });

    } catch (error) {
        console.error("Error Saving Claim:", error);
        res.status(500).json({ success: false, error: "Internal Server Error", error: error.message });
    }
};

/**
 * Retrieves all Claims
 * @async
 * @function getAllClaims
 * @param {ExpressRequest} req - Express request object.
 * @param {ExpressResponse} res - Express response object.
 */

exports.getAllClaims = async(req, res) =>{
    try {
        const Allclaim = await Claim.find();

        if (!Allclaim){
           throw new Error("Can not fetched claims");
        }

        res.status(201).json({
            success:true,
            message:"Claims Feteched Successfully",
            Allclaim
        })
    } catch (error) {
        console.log("Error While Fetching claims", error)
        return res.status(501).json({ success: false, error: "Error while fetching All Claims" ,error: error.message 
        });
    }
} 

/**
 * Retrieves a claim by ID
 * @async
 * @function getSingleClaimById
 * @param {ExpressRequest} req - Express request object.
 * @param {ExpressResponse} res - Express response object.
 */

exports.getSingleClaimById = async(req, res)=>{
    try {
        const claim = await Claim.findById(req.params.id)

        if(!claim){
            throw new Error("Id is requird for Fetch single claim")
        }

        res.status(201).json({
            success:true,
            message : "Claim fetched successfully",
            claim
        })
    } catch (error) {
        res.status(404).json({
            success:false,
            message:"Did not fetch claim. Please ensure that you have provied correct Id.",
            error: error.message 
        })
    }
}

/**
 * Retrieves a claim by ID and Delete the claim
 * @async
 * @function deleteClaim
 * @param {ExpressRequest} req - Express request object.
 * @param {ExpressResponse} res - Express response object.
 */

exports.deleteClaim = async(req,res)=>{
    try {
        const id = req.params.id

        if (!id) {
            throw new Error("Id is required to delete the claim")
        }
        const claim = await Claim.findById(id);

        if(!claim){
            return res.status(401).json({
                success: false,
                message: "Did not find claim"
            })
        }
        
        await claim.deleteOne();

        res.status(201).json({success:true,
            message:"Claim deleted Successfully"
        })

    } catch (error) {
        res.status(501).json({
            success: false,
            message: "Internal Server Error",
            error: error.message 
        })
    }
}


/**
 * Retrieves a claim by ID and Update the claim
 * @async
 * @function updateClaim
 * @param {ExpressRequest} req - Express request object.
 * @param {ExpressResponse} res - Express response object.
 */

exports.updateAClaim = async(req,res)=>{
    try {
        const claim = await Claim.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if (!claim) {
            return res.status(404).json({ message: "Claim not found" });
        }

        res.status(201).json({
            success:true,
            message:"Claim updated successfully",
            claim

        })

    } catch (error) {
        res.status(501).json({
            success: false,
            message: "Error while Updating claim",
            error: error.message 
        })
    }
}


/**
 * Exports all claims data into an Excel file and provide a download link
 * @async
 * @function exportClaims
 * @param {ExpressRequest} req - Express request object.
 * @param {ExpressResponse} res - Express response object.
 */

exports.exportClaims = async (req, res) => {
    try {
        const claims = await Claim.find();

        if (claims.length === 0) {
            return res.status(404).json({ message: "No claims found to export" });
        }

        // Create a new Excel workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Claims Data");

        // Define columns for the worksheet based on the schema
        worksheet.columns = [
            { header: "Company Reference", key: "companyReference", width: 20 },
            { header: "Policy Number", key: "policyNumber", width: 20 },
            { header: "Partner Reference", key: "partnerRef", width: 20 },

            { header: "Incident Date", key: "incidentDate", width: 15 },
            { header: "Incident Circumstances", key: "incidentCircumstances", width: 30 },
            { header: "Damage to Vehicle", key: "damageToVehicle", width: 25 },
            { header: "Pre-Existing Damage", key: "preExistingDamage", width: 25 },

            { header: "Vehicle Registration", key: "vehicleReg", width: 15 },
            { header: "Vehicle Make", key: "vehicleMake", width: 15 },
            { header: "Vehicle Model", key: "vehicleModel", width: 15 },
            { header: "Vehicle Engine Size", key: "vehicleEngineSize", width: 15 },
            { header: "Vehicle Registration Date", key: "vehicleRegDate", width: 15 },

            { header: "Driver First Name", key: "driverFirstName", width: 15 },
            { header: "Driver Last Name", key: "driverLastName", width: 15 },
            { header: "Driver Title", key: "driverTitle", width: 10 },
            { header: "Driver Address", key: "driverAddress", width: 30 },
            { header: "Driver Contact (Mobile)", key: "driverMobile", width: 15 },
            { header: "Driver Contact (Email)", key: "driverEmail", width: 25 },

            { header: "Repairer Name", key: "repairerName", width: 20 },
            { header: "Repair Authorized Amount", key: "repairAuthorizedAmount", width: 15 },
            { header: "Repair Completion Date", key: "repairCompletionDate", width: 15 },

            { header: "Salvage Amount", key: "salvageAmount", width: 15 },
            { header: "Salvage Category", key: "salvageCategory", width: 15 },

            { header: "Claim Status", key: "status", width: 15 },
            { header: "Repair Cost (Net)", key: "repairNet", width: 15 },
            { header: "Repair Cost (VAT)", key: "repairVat", width: 15 },
            { header: "Repair Cost (Gross)", key: "repairGross", width: 15 }
        ];

        // Add data rows
        claims.forEach((claim) => {
            worksheet.addRow({
                companyReference: claim.companyReference || "",
                policyNumber: claim.policyNumber || "",
                partnerRef: claim.partnerRef || "",

                incidentDate: claim.incident?.date ? claim.incident.date.toISOString().split("T")[0] : "",
                incidentCircumstances: claim.incident?.circumstances || "",
                damageToVehicle: claim.incident?.damageToVehicle || "",
                preExistingDamage: claim.incident?.preExistingDamage || "",

                vehicleReg: claim.vehicle?.registrationNumber || "",
                vehicleMake: claim.vehicle?.make || "",
                vehicleModel: claim.vehicle?.model || "",
                vehicleEngineSize: claim.vehicle?.engineSize || "",
                vehicleRegDate: claim.vehicle?.registrationDate ? claim.vehicle.registrationDate.toISOString().split("T")[0] : "",

                driverFirstName: claim.driver?.firstName || "",
                driverLastName: claim.driver?.lastName || "",
                driverTitle: claim.driver?.title || "",
                driverAddress: claim.driver?.address?.line1 ? `${claim.driver.address.line1}, ${claim.driver.address.postcode || ""}` : "",
                driverMobile: claim.driver?.contact?.mobile || "",
                driverEmail: claim.driver?.contact?.email || "",

                repairerName: claim.repair?.repairerName || "",
                repairAuthorizedAmount: claim.repair?.authorizedAmount || 0,
                repairCompletionDate: claim.repair?.completionDate ? claim.repair.completionDate.toISOString().split("T")[0] : "",

                salvageAmount: claim.salvage?.amount || 0,
                salvageCategory: claim.salvage?.category || "",

                status: claim.status || "Pending",
                repairNet: claim.costs?.repair?.net || 0,
                repairVat: claim.costs?.repair?.vat || 0,
                repairGross: claim.costs?.repair?.gross || 0
            });
        });

        
        const exportDir = path.join(__dirname, "../exports");
        if (!fs.existsSync(exportDir)) {
            fs.mkdirSync(exportDir);
        }

        // Generate file path
        const filePath = path.join(exportDir, "claims_export.xlsx");

        // Save workbook to file
        await workbook.xlsx.writeFile(filePath);

        // Send the download link
        res.status(200).json({ message: "Export successful", downloadLink: "/api/v1/claims/download" });
    } catch (err) {
       
        res.status(500).json({ error: "Error exporting claims", details: err.message });
    }
};



/**
 * Download Excel File
 * @async
 * @function downloadClaims
 * @param {ExpressRequest} req - Express request object.
 * @param {ExpressResponse} res - Express response object.
 */

exports.downloadClaims = async(req,res)=>{
    const filePath = path.join(__dirname, "../exports/claims_export.xlsx");

    if(!fs.existsSync(filePath)){
        return res.status(404).json({message:"File is not found.Please export First"})
    }

    res.download(filePath, "claims_export.xlsx", (err)=>{
        if(err){
            console.error("File download error", err);
            res.status(500).json({error:"Error while downloading file"})
        }
    })
}