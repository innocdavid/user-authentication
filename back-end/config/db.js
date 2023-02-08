// importing modules
import mongoose from "mongoose";
import colors from "colors";

const db = () => {
    // connect
    mongoose.connect(`mongodb+srv://innocdavid:4jk4TJAZB47jKL1b@cluster0.rnsyzcl.mongodb.net/user-auth-db`)
    .then(() => {
        console.log("connected to mongodb".bgMagenta);
    })
    .catch(err => {
        console.log(err);
    });

}

export { db };




//DBPASS: 4jk4TJAZB47jKL1b