let userSchema = {};

userSchema.create = {
  'username': {
    notEmpty: true,
    isLength: {
      options: [{ min: 8, max: 16 }],
      errorMessage: 'Must be between 8 and 16 chars long' // Error message for the validator, takes precedent over parameter message
    }
  },
  'password': {
    notEmpty: true,
    isLength: {
      options: [{ min: 4, max: 16 }],
      errorMessage: 'Must be between 8 and 16 chars long' // Error message for the validator, takes precedent over parameter message
    },
    errorMessage: 'Invalid Password' // Error message for the parameter
  },
  'name': {
    notEmpty: true,
    errorMessage: 'Invalid name' // Error message for the parameter
  },
  'email': {
    notEmpty: true,
    isEmail: {
      errorMessage: 'Invalid email format'
    }
  }
};

module.exports = userSchema;