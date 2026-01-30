import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            required:true
        },
        mobileNumber:{
            type:String,
            unique:true,
            required:true,
            match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian mobile number']
        },
        role:{
            type:String,
            enum:['BENEFICIARY','OFFICER'],
            required:true
        },
        loanAmount:{
            type:String,
            required:true,
        },
        purpose:{
            type:String,
            required:true
        },
        district:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        sanctionDate:{
            type:String,
        },
        isActive:{
            type:Boolean,
            default:true
        }
    },
    {
        timestamps:true,
    }
)

const User = mongoose.model('User', userSchema)

export default User