let productSchema = {}

productSchema.create = {
  'name': {
    notEmpty: true,
    errorMessage: 'Invalid name.'
  },
  'publisher': {
    notEmpty: true,
    errorMessage: 'Invalid publisher.'
  },
  'price': {
    notEmpty: true,
    errorMessage: 'Invalid price.'
  },
  'type': {
    notEmpty: true,
    errorMessage: 'Invalid type.'
  },
  'sale_date': {
    notEmpty: true,
    errorMessage: 'Invalid sale_date.'
  }
};

module.exports = productSchema;