import { validateEmail, validatePassword, validateString } from "../validationConstraints";

export const validateInputs = (id, value) => {
    if (id === "firstName" || id === "lastName") {
        return validateString(id, value);
    }
    else if (id === "email") {
        return validateEmail(id, value);
    }
    else {
        return validatePassword(id, value);
    }
}