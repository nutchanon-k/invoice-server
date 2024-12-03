const prisma = require("../configs/prisma");
const createError = require("../utils/create-error");

exports.createInvoice = async (req, res, next) => {
  try {
    const {
      documentNumber,
      customerName,
      issueDate,
      dueDate,
      taxAddress,
      shippingAddress,
      referenceDocumentNumber,
      currency,
      netPrice,
      discount,
      priceAfterDiscount,
      vat,
      grandTotalPrice,
      remarks,
      notes,
      items } = req.body;

    const isInvoiceExists = await prisma.invoice.findUnique({
      where: {
        documentNumber: documentNumber,
      },
    })
    if (isInvoiceExists) {
      return createError(400, "เลขที่เอกสาร (documentNumber) ซ้ํา")
    }
    const invoice = await prisma.invoice.create({
      data: {
        documentNumber,
        customerName,
        issueDate: new Date(issueDate),
        dueDate: new Date(dueDate),
        items: { create: items },
        taxAddress,
        shippingAddress,
        referenceDocumentNumber,
        currency,
        netPrice: +netPrice,
        discount: +discount,
        priceAfterDiscount: +priceAfterDiscount,
        vat: +vat,
        grandTotalPrice: +grandTotalPrice,
        remarks,
        notes
      },
      include: { items: true },
    });
    res.status(201).json(invoice);
  } catch (error) {
    next(error)
  }
};

exports.getInvoices = async (req, res, next) => {
  try {
    const invoices = await prisma.invoice.findMany({ include: { items: true } });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getInvoiceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const invoice = await prisma.invoice.findUnique({
      where: { id: Number(id) },
      include: { items: true },
    });
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });
    res.json(invoice);
  } catch (error) {
    next(error)
  }
};

exports.updateInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      documentNumber,
      customerName,
      issueDate,
      dueDate,
      taxAddress,
      shippingAddress,
      referenceDocumentNumber,
      currency,
      netPrice,
      discount,
      priceAfterDiscount,
      vat,
      grandTotalPrice,
      remarks,
      notes,
      items } = req.body;
    const isInvoiceExists = await prisma.invoice.findUnique({
      where: {
        documentNumber: documentNumber,
      },
    })
    if (isInvoiceExists && isInvoiceExists.id !== Number(id)) {
      return createError(400, "เลขที่เอกสาร (documentNumber) ซ้ํา")
    }
    const invoice = await prisma.invoice.update({
      where: { id: Number(id) },
      data: {
        documentNumber,
        customerName,
        issueDate: new Date(issueDate),
        dueDate: new Date(dueDate),
        taxAddress,
        shippingAddress,
        referenceDocumentNumber,
        currency,
        netPrice: +netPrice,
        discount: +discount,
        priceAfterDiscount: +priceAfterDiscount,
        vat: +vat,
        grandTotalPrice: +grandTotalPrice,
        remarks,
        notes,
        items: {
          deleteMany: {}, // ลบ Items เก่า
          create: items, // เพิ่ม Items ใหม่
        },
      },
      include: { items: true },
    });
    res.json(invoice);
  } catch (error) {
    next(error)
  }
};

exports.deleteInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.invoice.delete({ where: { id: Number(id) } });
    res.json({ message: "Invoice deleted" });
  } catch (error) {
    next(error)
  }
};
