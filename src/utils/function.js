const checkRequiredFields = (requiredFields) => {
    return (req,res,next) => {
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Field yang wajib diisi : ${missingFields.join(', ')}` });
        }
        next();
    };
};

export { checkRequiredFields }