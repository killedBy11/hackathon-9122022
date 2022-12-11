const builder = async (db, parkId, ammount, token) => {
    const tokenEntity = await db.Token.findOne({
        where: {
            token: token
        }
    });

    const customer = await db.Customer.findOne({
        where: {
            customer_id: tokenEntity.getDataValue('customer_id')
        }
    });

    if (customer.getDataValue('balance') < ammount) {
        throw new Error('insuficient points');
    }

    const trans = db.Transaction.build({
        customer_id: customer.getDataValue('customer_id'),
        park_id: parkId,
        value: ammount,
        type: 'PUBLIC',
        time: Date.now()
    });

    return trans;
}

module.exports = builder;