import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    email:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    password:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    profImage:{
        type:mongoose.Schema.Types.String,
    },
  
},
{
timestamps: true,
}
)

export const User = mongoose.model("User",userSchema);