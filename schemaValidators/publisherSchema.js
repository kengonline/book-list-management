let publisherSchema = {};

publisherSchema.create = {
  'name': {
    notEmpty: true,
    errorMessage: 'Invalid name.'
  },
  'facebook_page': {
    notEmpty: true,
    errorMessage: 'Invalid facebook page url.'
  }
};

publisherSchema.update = {
  'name': {
    notEmpty: true,
    errorMessage: 'Invalid name.'
  },
  'facebook_page': {
    notEmpty: true,
    errorMessage: 'Invalid facebook page url.'
  }
};

module.exports = publisherSchema;