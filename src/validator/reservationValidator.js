const reservationValidator = async (db, autoId, parkingId, type, beginTime, endTime, token) => {
    const tokenEntity = await db.Token.findOne({
        where: {
            token: token
        }
    });

    if (tokenEntity === undefined || tokenEntity === null) {
        throw new Error ("invalid reservation");
    }

    const customer = await tokenEntity.getCustomer();

    const automobile = await db.Automobile.findByPk(autoId);

    const automobileOwner = await automobile.getCustomer();

    if (customer.getDataValue('customer_id') != automobileOwner.getDataValue('customer_id')) {
        throw new Error('invalid data');
    }

    if (new Date(beginTime) <= Date.now() || new Date(endTime) <= Date.now()) {
        throw new Error('invalid date-time');
    }

    if (new Date(endTime) <= beginTime) {
        throw new Error('invalid date-time');
    }
    const nextDate = new Date(Date.now());
    nextDate.setDate(nextDate.getDate() + 7);

    if (new Date(beginTime) >= nextDate || new Date(endTime) >= nextDate) {
        throw new Error('invalid date-time');
    }

    if (new Date(beginTime).getDate() != new Date(endTime).getDate()) {
        throw new Error('invalid date-time');
    }
}

module.exports = reservationValidator;