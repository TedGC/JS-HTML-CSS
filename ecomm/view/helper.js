

module.exports = {
    getError(errors, prop) {
        //prop === 'email || 'password' || 'password'
        try {
            return errors.mapped()[prop].msg
        } catch (err) {
            return ''
        }
    }
}