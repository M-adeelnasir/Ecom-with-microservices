import mongoose from 'mongoose'

export interface EmailverificationDocument extends mongoose.Document{

}


const email_verificationSchema = new mongoose.Schema({

},{ timestamps: true })


const Emailverification =mongoose.model<EmailverificationDocument>('Emailverification',email_verificationSchema)


    export default Emailverification