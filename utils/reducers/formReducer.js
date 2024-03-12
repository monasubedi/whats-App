export const reducer = (state, action) => {
    const { id, validationResult, value } = action;
    const updatedValues = {
        ...state.inputValues,
        [id]: value
    }
    const updatedValidities = {
        ...state.inputValidities,
        [id]: validationResult
    }
    let updatedFormIsValid = true;
    for (let key in updatedValidities) {
        if (updatedValidities[key] !== undefined) {
            updatedFormIsValid = false;
            break;
        }
    }
    return {
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid: updatedFormIsValid
    }
}