require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || '',
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'paradise1_hotel'
    },
    cbe: {
        accountNumber: process.env.CBE_ACCOUNT_NUMBER || '',
        accountName: process.env.CBE_ACCOUNT_NAME || 'Paradise Hotel',
        bankName: process.env.CBE_BANK_NAME || 'Commercial Bank of Ethiopia'
    },
    telebirr: {
        phoneNumber: process.env.TELEBIRR_NUMBER || '',
        accountName: process.env.TELEBIRR_NAME || 'Paradise Hotel'
    },
    currency: process.env.CURRENCY || 'ETB'
};
