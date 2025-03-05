const { validationResult } = require('express-validator')

module.exports = {
    handleErrors(templateFunc, dataCb) {
        return async (req, res, next) => {
            const errors = validationResult(req);
            // need to undderstnad the logic here. 
            //I don't quite get it at first seeing it
            if (!errors.isEmpty()) {
                let data = {};
                if (dataCb) {
                    data = await dataCb(req)
                }

                return res.send(templateFunc({ errors, ...data }))
            }

            next();
        }
    },

    requireAuth(req, res, next) {
        if (!req.session.userId) {
            return res.redirect('/signin')
            // return res.send('submitted')
        }
        next();
    }
}