import mongoose from 'mongoose';
import constants from './system-constant'

class ConnectDB {
    public mongoUrl: string = constants.DB_CONNECTION;

    constructor() {
    }

    public mongoSetup(): void {
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
    }
};

export default ConnectDB;