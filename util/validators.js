module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
  ) => {
    const errors = {};
    if (username.trim() === "") {
      errors.username = "Username must not be empty";
    }
  
    if (email.trim() === "") {
      errors.email = "email must not be empty";
    } else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(email)) {
        errors.email = "Email must be valid email adddress";
      }
    }
  
    if (password.trim() === "") {
      errors.password = "Password must not be empty";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Password must match";
    }
  
    return {
      errors,
      valid: Object.keys(errors).length < 1,
    };
  };
  
  module.exports.validateLoginInput = (
    email,
    password
  ) => {
    const errors = {};
  
    if (email.trim() === "") {
      errors.email = "email must not be empty";
    } else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(email)) {
        errors.email = "Email must be valid email adddress";
      }
    }
  
    if (password.trim() === "") {
      errors.password = "Password must not be empty";
    }
  
    return {
      errors,
      valid: Object.keys(errors).length < 1,
    };
  };