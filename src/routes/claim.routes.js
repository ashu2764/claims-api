const express = require('express');
const { createClaim, getAllClaims, getSingleClaimById, deleteClaim, updateAClaim, exportClaims, downloadClaims } = require('../controllers/claim.controller');


const router = express.Router();

/**
 * Route to create a claim
 * @route POST /api/vi/claims/
 */

router.post('/', createClaim)

/**
 * Route to get all claims
 * @route GET /api/vi/claims/
 */
router.get('/', getAllClaims)


/**
 * Route to export all claims
 * @route GET /api/vi/claims/export
 */
router.get('/export', exportClaims)

/**
 * Route to download excel file
 * @route GET /api/vi/claims/download
 */
router.get("/download", downloadClaims);

/**
 * Route to get single claim by id
 * @route GET /api/vi/claims/:id
 */
router.get('/:id', getSingleClaimById)


/**
 * Route to delete a claim
 * @route DELETE /api/vi/claims/:id
 */
router.delete('/:id', deleteClaim)



/**
 * Route to Update a claim
 * @route PUT /api/vi/claims/:id
 */
router.put('/:id', updateAClaim)




module.exports = router;