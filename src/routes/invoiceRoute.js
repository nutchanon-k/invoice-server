const express = require("express");
const {
  createInvoice,
  getInvoices,
  updateInvoice,
  deleteInvoice,
  getInvoiceById,
} = require("../controllers/invoiceController");
const { createInvoiceValidator, updateInvoiceValidator } = require("../middlewares/validate");

const router = express.Router();

router.post("/invoices", createInvoiceValidator, createInvoice);
router.get("/invoices", updateInvoiceValidator, getInvoices);
router.get("/invoices/:id", getInvoiceById);
router.put("/invoices/:id", updateInvoice);
router.delete("/invoices/:id", deleteInvoice);

module.exports = router;
