import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
    agencia: {
        type: Number,
        required: true
    },
    conta: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0)
                throw new Error("Valor não permite negativo");
        }
    }
});

const accountModel = mongoose.model('account', accountSchema);

export { accountModel };