const buildTransaction = (customerId, parkingId, payedCustomerId, type, time, Transaction) => {
    if (type === "PERSONAL" && payedCustomerId === undefined || type === "PUBLIC" && parkingId === undefined) {
        throw new Error('invalid type');
    }

    return Transaction.build({
        customer_id: customerId,
        park_id: type === "PUBLIC" ? parkingId : null,
        receiving_customer_id: type === "PERSONAL" ? payedCustomerId : null,
        type: type,
        time: time
    });
}

const getTransactionType = transaction => {
    const type = Transaction.getDataValue('type');
    return type;
}

const getPayee = (transaction, Customer, Parking) => {
    const type = getTransactionType(transaction);

    if (type === "PERSONAL") {
        return Customer.findByPk(transaction.getDataValue('receiving_customer_id'));
    } else if (type === "PUBLIC") {
        return Parking.findByPk(transaction.getDataValue('park_id'));
    }
    throw new Error('invalid type');
}

module.exports.buildTransaction = buildTransaction;
module.exports.getTransactionType = getTransactionType;