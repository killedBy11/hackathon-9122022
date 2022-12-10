const EmailValidator = require('email-deep-validator');

const userValidator = async (email, name, password) => {
    const emailValidator = new EmailValidator();
    const { wellFormed, validDomain, validMailbox } = await emailValidator.verify(email);

    if(!(wellFormed && validDomain && validMailbox)) {
        throw new Error("invalid email");
    }
    if(!(/[A-Z][a-z]*( [A-Z][a-z]*)+/.test(name))) {
        throw new Error("invalid name");
    }
    if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/.test(password))) {
        throw new Error("invalid password");
    }
}

module.exports = userValidator;