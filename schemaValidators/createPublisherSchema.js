var createPublisherSchema = {
  'name': {
    notEmpty: true,
    errorMessage: 'Invalid name.'
  },
  'facebook_page': {
    notEmpty: true,
    errorMessage: 'Invalid facebook page url.'
  }
};

module.exports = createPublisherSchema;