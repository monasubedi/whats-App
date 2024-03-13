import { validateEmail, validateLength, validatePassword, validateString } from "../validationConstraints";

export const validateInputs = (id, value) => {
    if (id === "firstName" || id === "lastName") {
        return validateString(id, value);
    }
    else if (id === "email") {
        return validateEmail(id, value);
    }
    else if (id === "about") {
        return validateLength(id, value, true, 0, 150);
    }
    else {
        return validatePassword(id, value);
    }
}