export const validationsAPI = {
  required(name, value) {
    if (!value) throw Error(`${name[0].toUpperCase()}${name.slice(1)} is required`);
  },
  email(email) {
    validationsAPI.required("email", email);
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(email)) throw Error("Invalid Email");
  },

  username(username) {
    validationsAPI.required("username", username);
    const reg = /^[a-zA-Z]{5,}\S*$/;
    if (!reg.test(username)) {
      if (username.length < 5) throw Error("Username too short! Minimum 5 chars");
      if (username.length > 20) throw Error("Username too long! Maximum 20 chars");
      throw Error("Invalid username");
    }
  },

  password(password) {
    validationsAPI.required("password", password);
    const reg = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/;
    if (password.length < 6) throw Error("Password length must be at least six chars");
    if (!reg.test(password)) throw Error("Password must contain numbers and letters only");
  },

  confirmPassword(confirmPassword, password = "") {
    validationsAPI.required("Confirm password", confirmPassword);

    const reg = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/;

    if (confirmPassword.length < 6) throw Error("Password length must be at least six chars");
    if (!reg.test(confirmPassword)) throw Error("Invalid password. Must contain numbers and letters");
    if (confirmPassword !== password) throw Error("Passwords do not match");
  },

  image(image) {
    if (image.type && image?.type?.substr(0, 5) !== "image")
      throw Error(`Error in ${image.name}: Invalid file- images only`);
    if (image.size > 1024 * 1024 * 5) throw Error(`Error in ${image.name}: Maximum size 5 mb`);
  },

  verificationCode(verificationCode) {
    if (!verificationCode) throw Error("Verification code is required");
  },
};

export const validateField = (key, value, password = null) => {
  if (validationsAPI[key]) {
      if (key === "confirmPassword") {
        validationsAPI[key](value, password);
      } else {
        validationsAPI[key](value);
      }
    
  }

  return true;
};
