const Joi = require('joi')
const createError = require('../utils/create-error')


const unitEnum = Joi.string()
  .valid('GRAM', 'EACH')
  .required()
  .messages({
    'any.only': 'หน่วยต้องเป็น "GRAM" หรือ "EACH"',
    'any.required': 'หน่วยเป็นฟิลด์ที่จำเป็นต้องกรอก',
    'string.base': 'หน่วยต้องเป็นข้อความ',
  });

// Validation Schema สำหรับ Item ในการสร้าง (Create)
const itemCreateSchema = Joi.object({
  code: Joi.string()
    .required()
    .messages({
      'string.base': 'รหัสสินค้า (code) ต้องเป็นข้อความ',
      'string.empty': 'รหัสสินค้า (code) ห้ามว่าง',
      'any.required': 'รหัสสินค้า (code) เป็นฟิลด์ที่จำเป็นต้องกรอก',
    }),
  quantity: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': 'จำนวน (quantity) ต้องเป็นตัวเลข',
      'number.integer': 'จำนวน (quantity) ต้องเป็นจำนวนเต็ม',
      'number.min': 'จำนวน (quantity) ต้องมากกว่าหรือเท่ากับ 1',
      'any.required': 'จำนวน (quantity) เป็นฟิลด์ที่จำเป็นต้องกรอก',
    }),
  weight: Joi.number()
    .positive()
    .required()
    .messages({
      'number.base': 'น้ำหนัก (weight) ต้องเป็นตัวเลข',
      'number.positive': 'น้ำหนัก (weight) ต้องเป็นค่าบวก',
      'any.required': 'น้ำหนัก (weight) เป็นฟิลด์ที่จำเป็นต้องกรอก',
    }),
  unit: unitEnum,
  pricePerUnit: Joi.number()
    .precision(2)
    .positive()
    .required()
    .messages({
      'number.base': 'ราคาต่อหน่วย (pricePerUnit) ต้องเป็นตัวเลข',
      'number.precision': 'ราคาต่อหน่วย (pricePerUnit) ต้องมีทศนิยมไม่เกินสองตำแหน่ง',
      'number.positive': 'ราคาต่อหน่วย (pricePerUnit) ต้องเป็นค่าบวก',
      'any.required': 'ราคาต่อหน่วย (pricePerUnit) เป็นฟิลด์ที่จำเป็นต้องกรอก',
    }),
  discount: Joi.number()
    .min(0)
    .precision(2)
    .required()
    .messages({
      'number.base': 'ส่วนลด (discount) ต้องเป็นตัวเลข',
      'number.min': 'ส่วนลด (discount) ต้องไม่ต่ำกว่า 0',
      'number.precision': 'ส่วนลด (discount) ต้องมีทศนิยมไม่เกินสองตำแหน่ง',
      'any.required': 'ส่วนลด (discount) เป็นฟิลด์ที่จำเป็นต้องกรอก',
    }),
  priceBeforeDiscount: Joi.number()
    .precision(2)
    .positive()
    .required()
    .messages({
      'number.base': 'ราคาก่อนส่วนลด (priceBeforeDiscount) ต้องเป็นตัวเลข',
      'number.precision': 'ราคาก่อนส่วนลด (priceBeforeDiscount) ต้องมีทศนิยมไม่เกินสองตำแหน่ง',
      'number.positive': 'ราคาก่อนส่วนลด (priceBeforeDiscount) ต้องเป็นค่าบวก',
      'any.required': 'ราคาก่อนส่วนลด (priceBeforeDiscount) เป็นฟิลด์ที่จำเป็นต้องกรอก',
    }),
  totalPrice: Joi.number()
    .precision(2)
    .positive()
    .required()
    .messages({
      'number.base': 'ราคารวม (totalPrice) ต้องเป็นตัวเลข',
      'number.precision': 'ราคารวม (totalPrice) ต้องมีทศนิยมไม่เกินสองตำแหน่ง',
      'number.positive': 'ราคารวม (totalPrice) ต้องเป็นค่าบวก',
      'any.required': 'ราคารวม (totalPrice) เป็นฟิลด์ที่จำเป็นต้องกรอก',
    }),
});

// Validation Schema สำหรับ Item ในการอัปเดต (Update)
const itemUpdateSchema = Joi.object({
  code: Joi.string()
    .messages({
      'string.base': 'รหัสสินค้า (code) ต้องเป็นข้อความ',
      'string.empty': 'รหัสสินค้า (code) ห้ามว่าง',
    }),
  quantity: Joi.number()
    .integer()
    .min(1)
    .messages({
      'number.base': 'จำนวน (quantity) ต้องเป็นตัวเลข',
      'number.integer': 'จำนวน (quantity) ต้องเป็นจำนวนเต็ม',
      'number.min': 'จำนวน (quantity) ต้องมากกว่าหรือเท่ากับ 1',
    }),
  weight: Joi.number()
    .positive()
    .messages({
      'number.base': 'น้ำหนัก (weight) ต้องเป็นตัวเลข',
      'number.positive': 'น้ำหนัก (weight) ต้องเป็นค่าบวก',
    }),
  unit: unitEnum,
  pricePerUnit: Joi.number()
    .precision(2)
    .positive()
    .messages({
      'number.base': 'ราคาต่อหน่วย (pricePerUnit) ต้องเป็นตัวเลข',
      'number.precision': 'ราคาต่อหน่วย (pricePerUnit) ต้องมีทศนิยมไม่เกินสองตำแหน่ง',
      'number.positive': 'ราคาต่อหน่วย (pricePerUnit) ต้องเป็นค่าบวก',
    }),
  discount: Joi.number()
    .min(0)
    .precision(2)
    .messages({
      'number.base': 'ส่วนลด (discount) ต้องเป็นตัวเลข',
      'number.min': 'ส่วนลด (discount) ต้องไม่ต่ำกว่า 0',
      'number.precision': 'ส่วนลด (discount) ต้องมีทศนิยมไม่เกินสองตำแหน่ง',
    }),
  priceBeforeDiscount: Joi.number()
    .precision(2)
    .positive()
    .messages({
      'number.base': 'ราคาก่อนส่วนลด (priceBeforeDiscount) ต้องเป็นตัวเลข',
      'number.precision': 'ราคาก่อนส่วนลด (priceBeforeDiscount) ต้องมีทศนิยมไม่เกินสองตำแหน่ง',
      'number.positive': 'ราคาก่อนส่วนลด (priceBeforeDiscount) ต้องเป็นค่าบวก',
    }),
  totalPrice: Joi.number()
    .precision(2)
    .positive()
    .messages({
      'number.base': 'ราคารวม (totalPrice) ต้องเป็นตัวเลข',
      'number.precision': 'ราคารวม (totalPrice) ต้องมีทศนิยมไม่เกินสองตำแหน่ง',
      'number.positive': 'ราคารวม (totalPrice) ต้องเป็นค่าบวก',
    }),
});


const invoiceCreateSchema = Joi.object({
    documentNumber: Joi.string()
      .required()
      .messages({
        'string.base': 'เลขที่เอกสาร (documentNumber) ต้องเป็นข้อความ',
        'string.empty': 'เลขที่เอกสาร (documentNumber) ห้ามว่าง',
        'any.required': 'เลขที่เอกสาร (documentNumber) เป็นฟิลด์ที่จำเป็นต้องกรอก',
      }),
    customerName: Joi.string()
      .required()
      .messages({
        'string.base': 'ชื่อลูกค้า (customerName) ต้องเป็นข้อความ',
        'string.empty': 'ชื่อลูกค้า (customerName) ห้ามว่าง',
        'any.required': 'ชื่อลูกค้า (customerName) เป็นฟิลด์ที่จำเป็นต้องกรอก',
      }),
    issueDate: Joi.date()
      .iso()
      .required()
      .messages({
        'date.base': 'วันที่ออกใบแจ้งหนี้ (issueDate) ต้องเป็นวันที่',
        'date.format': 'วันที่ออกใบแจ้งหนี้ (issueDate) ต้องอยู่ในรูปแบบ ISO',
        'any.required': 'วันที่ออกใบแจ้งหนี้ (issueDate) เป็นฟิลด์ที่จำเป็นต้องกรอก',
      }),
    dueDate: Joi.date()
      .iso()
      .greater(Joi.ref('issueDate'))
      .required()
      .messages({
        'date.base': 'วันที่ครบกำหนด (dueDate) ต้องเป็นวันที่',
        'date.format': 'วันที่ครบกำหนด (dueDate) ต้องอยู่ในรูปแบบ ISO',
        'date.greater': 'วันที่ครบกำหนด (dueDate) ต้องมากกว่าวันที่ออกใบแจ้งหนี้ (issueDate)',
        'any.required': 'วันที่ครบกำหนด (dueDate) เป็นฟิลด์ที่จำเป็นต้องกรอก',
      }),
    taxAddress: Joi.string()
      .required()
      .messages({
        'string.base': 'ที่อยู่สำหรับภาษี (taxAddress) ต้องเป็นข้อความ',
        'string.empty': 'ที่อยู่สำหรับภาษี (taxAddress) ห้ามว่าง',
        'any.required': 'ที่อยู่สำหรับภาษี (taxAddress) เป็นฟิลด์ที่จำเป็นต้องกรอก',
      }),
    shippingAddress: Joi.string()
      .required()
      .messages({
        'string.base': 'ที่อยู่สำหรับการจัดส่ง (shippingAddress) ต้องเป็นข้อความ',
        'string.empty': 'ที่อยู่สำหรับการจัดส่ง (shippingAddress) ห้ามว่าง',
        'any.required': 'ที่อยู่สำหรับการจัดส่ง (shippingAddress) เป็นฟิลด์ที่จำเป็นต้องกรอก',
      }),
    referenceDocumentNumber: Joi.string()
      .allow(null, '')
      .messages({
        'string.base': 'เลขที่เอกสารอ้างอิง (referenceDocumentNumber) ต้องเป็นข้อความ',
      }),
    currency: Joi.string()
      .allow(null, '')
      .messages({
        'string.base': 'สกุลเงิน (currency) ต้องเป็นข้อความ',
      }),
    netPrice: Joi.number()
      .precision(2)
      .min(0)
      .required()
      .messages({
        'number.base': 'ราคาสุทธิ (netPrice) ต้องเป็นตัวเลข',
        'number.min': 'ราคาสุทธิ (netPrice) ต้องไม่ต่ำกว่า 0',
        'number.precision': 'ราคาสุทธิ (netPrice) ต้องมีทศนิยมไม่เกินสองตำแหน่ง',
        'any.required': 'ราคาสุทธิ (netPrice) เป็นฟิลด์ที่จำเป็นต้องกรอก',
      }),
    discount: Joi.number()
      .precision(2)
      .min(0)
      .required()
      .messages({
        'number.base': 'ส่วนลด (discount) ต้องเป็นตัวเลข',
        'number.min': 'ส่วนลด (discount) ต้องไม่ต่ำกว่า 0',
        'number.precision': 'ส่วนลด (discount) ต้องมีทศนิยมไม่เกินสองตำแหน่ง',
        'any.required': 'ส่วนลด (discount) เป็นฟิลด์ที่จำเป็นต้องกรอก',
      }),
    priceAfterDiscount: Joi.number()
      .precision(2)
      .min(0)
      .required()
      .messages({
        'number.base': 'ราคาหลังหักส่วนลด (priceAfterDiscount) ต้องเป็นตัวเลข',
        'number.min': 'ราคาหลังหักส่วนลด (priceAfterDiscount) ต้องไม่ต่ำกว่า 0',
        'number.precision': 'ราคาหลังหักส่วนลด (priceAfterDiscount) ต้องมีทศนิยมไม่เกินสองตำแหน่ง',
        'any.required': 'ราคาหลังหักส่วนลด (priceAfterDiscount) เป็นฟิลด์ที่จำเป็นต้องกรอก',
      }),
    vat: Joi.number()
      .precision(2)
      .min(0)
      .required()
      .messages({
        'number.base': 'ภาษีมูลค่าเพิ่ม (vat) ต้องเป็นตัวเลข',
        'number.min': 'ภาษีมูลค่าเพิ่ม (vat) ต้องไม่ต่ำกว่า 0',
        'number.precision': 'ภาษีมูลค่าเพิ่ม (vat) ต้องมีทศนิยมไม่เกินสองตำแหน่ง',
        'any.required': 'ภาษีมูลค่าเพิ่ม (vat) เป็นฟิลด์ที่จำเป็นต้องกรอก',
      }),
    grandTotalPrice: Joi.number()
      .precision(2)
      .min(0)
      .required()
      .messages({
        'number.base': 'ราคารวมทั้งหมด (grandTotalPrice) ต้องเป็นตัวเลข',
        'number.min': 'ราคารวมทั้งหมด (grandTotalPrice) ต้องไม่ต่ำกว่า 0',
        'number.precision': 'ราคารวมทั้งหมด (grandTotalPrice) ต้องมีทศนิยมไม่เกินสองตำแหน่ง',
        'any.required': 'ราคารวมทั้งหมด (grandTotalPrice) เป็นฟิลด์ที่จำเป็นต้องกรอก',
      }),
    remarks: Joi.string()
      .allow(null, '')
      .messages({
        'string.base': 'หมายเหตุ (remarks) ต้องเป็นข้อความ',
      }),
    notes: Joi.string()
      .allow(null, '')
      .messages({
        'string.base': 'โน้ต (notes) ต้องเป็นข้อความ',
      }),
    items: Joi.array()
      .items(itemCreateSchema)
      .min(1)
      .unique('code') // ตรวจสอบความไม่ซ้ำกันของ 'code' ในแต่ละรายการ
      .required()
      .messages({
        'array.base': 'รายการสินค้า (items) ต้องเป็นอาร์เรย์',
        'array.min': 'ต้องมีอย่างน้อยหนึ่งรายการสินค้า (items)',
        'array.unique': 'รายการสินค้า (items) ต้องไม่มีรหัสสินค้า (code) ซ้ำกัน',
        'any.required': 'รายการสินค้า (items) เป็นฟิลด์ที่จำเป็นต้องกรอก',
      }),
  });
  




const invoiceUpdateSchema = Joi.object({
    documentNumber: Joi.string()
      .messages({
        'string.base': 'เลขที่เอกสาร (documentNumber) ต้องเป็นข้อความ',
        'string.empty': 'เลขที่เอกสาร (documentNumber) ห้ามว่าง',
      }),
    customerName: Joi.string()
      .messages({
        'string.base': 'ชื่อลูกค้า (customerName) ต้องเป็นข้อความ',
        'string.empty': 'ชื่อลูกค้า (customerName) ห้ามว่าง',
      }),
    issueDate: Joi.date()
      .iso()
      .messages({
        'date.base': 'วันที่ออกใบแจ้งหนี้ (issueDate) ต้องเป็นวันที่',
        'date.format': 'วันที่ออกใบแจ้งหนี้ (issueDate) ต้องอยู่ในรูปแบบ ISO',
      }),
    dueDate: Joi.date()
      .iso()
      .greater(Joi.ref('issueDate'))
      .messages({
        'date.base': 'วันที่ครบกำหนด (dueDate) ต้องเป็นวันที่',
        'date.format': 'วันที่ครบกำหนด (dueDate) ต้องอยู่ในรูปแบบ ISO',
        'date.greater': 'วันที่ครบกำหนด (dueDate) ต้องมากกว่าวันที่ออกใบแจ้งหนี้ (issueDate)',
      }),
    taxAddress: Joi.string()
      .messages({
        'string.base': 'ที่อยู่สำหรับภาษี (taxAddress) ต้องเป็นข้อความ',
        'string.empty': 'ที่อยู่สำหรับภาษี (taxAddress) ห้ามว่าง',
      }),
    shippingAddress: Joi.string()
      .messages({
        'string.base': 'ที่อยู่สำหรับการจัดส่ง (shippingAddress) ต้องเป็นข้อความ',
        'string.empty': 'ที่อยู่สำหรับการจัดส่ง (shippingAddress) ห้ามว่าง',
      }),
    referenceDocumentNumber: Joi.string()
      .allow(null, '')
      .messages({
        'string.base': 'เลขที่เอกสารอ้างอิง (referenceDocumentNumber) ต้องเป็นข้อความ',
      }),
    currency: Joi.string()
      .allow(null, '')
      .messages({
        'string.base': 'สกุลเงิน (currency) ต้องเป็นข้อความ',
      }),
    netPrice: Joi.number()
      .precision(2)
      .min(0)
      .messages({
        'number.base': 'ราคาสุทธิ (netPrice) ต้องเป็นตัวเลข',
        'number.min': 'ราคาสุทธิ (netPrice) ต้องไม่ต่ำกว่า 0',
        'number.precision': 'ราคาสุทธิ (netPrice) ต้องมีทศนิยมไม่เกินสองตำแหน่ง',
      }),
    discount: Joi.number()
      .precision(2)
      .min(0)
      .messages({
        'number.base': 'ส่วนลด (discount) ต้องเป็นตัวเลข',
        'number.min': 'ส่วนลด (discount) ต้องไม่ต่ำกว่า 0',
        'number.precision': 'ส่วนลด (discount) ต้องมีทศนิยมไม่เกินสองตำแหน่ง',
      }),
    priceAfterDiscount: Joi.number()
      .precision(2)
      .min(0)
      .messages({
        'number.base': 'ราคาหลังหักส่วนลด (priceAfterDiscount) ต้องเป็นตัวเลข',
        'number.min': 'ราคาหลังหักส่วนลด (priceAfterDiscount) ต้องไม่ต่ำกว่า 0',
        'number.precision': 'ราคาหลังหักส่วนลด (priceAfterDiscount) ต้องมีทศนิยมไม่เกินสองตำแหน่ง',
      }),
    vat: Joi.number()
      .precision(2)
      .min(0)
      .messages({
        'number.base': 'ภาษีมูลค่าเพิ่ม (vat) ต้องเป็นตัวเลข',
        'number.min': 'ภาษีมูลค่าเพิ่ม (vat) ต้องไม่ต่ำกว่า 0',
        'number.precision': 'ภาษีมูลค่าเพิ่ม (vat) ต้องมีทศนิยมไม่เกินสองตำแหน่ง',
      }),
    grandTotalPrice: Joi.number()
      .precision(2)
      .min(0)
      .messages({
        'number.base': 'ราคารวมทั้งหมด (grandTotalPrice) ต้องเป็นตัวเลข',
        'number.min': 'ราคารวมทั้งหมด (grandTotalPrice) ต้องไม่ต่ำกว่า 0',
        'number.precision': 'ราคารวมทั้งหมด (grandTotalPrice) ต้องมีทศนิยมไม่เกินสองตำแหน่ง',
      }),
    remarks: Joi.string()
      .allow(null, '')
      .messages({
        'string.base': 'หมายเหตุ (remarks) ต้องเป็นข้อความ',
      }),
    notes: Joi.string()
      .allow(null, '')
      .messages({
        'string.base': 'โน้ต (notes) ต้องเป็นข้อความ',
      }),
    items: Joi.array()
      .items(itemUpdateSchema)
      .min(1)
      .unique('code') // ตรวจสอบความไม่ซ้ำกันของ 'code' ในแต่ละรายการ
      .messages({
        'array.base': 'รายการสินค้า (items) ต้องเป็นอาร์เรย์',
        'array.min': 'ต้องมีอย่างน้อยหนึ่งรายการสินค้า (items)',
        'array.unique': 'รายการสินค้า (items) ต้องไม่มีรหัสสินค้า (code) ซ้ำกัน',
      }),
  })
  



//function to validate schema
const validateSchema = (schema) => (req, res, next) => {
    const { value, error } = schema.validate(req.body)
  
    if (error) {
      console.log(req.body)
      return createError(400, error.details[0].message)
    }
    req.input = value
    next()
  }

 module.exports.createInvoiceValidator = validateSchema(invoiceCreateSchema)
 module.exports.updateInvoiceValidator = validateSchema(invoiceUpdateSchema) 