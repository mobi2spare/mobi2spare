export const  sanitizeReqParams = (req, res, next) => {

    for (const paramName in req.body) {
        if (req.body.hasOwnProperty(paramName)) { // Check for own properties (avoid prototype pollution)
            const value = req.body[paramName];
            if (typeof value === 'string' && value.trim() === '') {
                req.body[paramName] = null;
                continue; // Move on to the next parameter
            }

            const numberValue = parseInt(value);
            if (numberValue === -1) {
                req.body[paramName] = null;
            }
        }
    }
    next(); // Call next() if all validations pass


}