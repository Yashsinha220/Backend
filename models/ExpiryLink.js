const {model , Schema} = require("mongoose")

const ExpiryLinkSchema = new Schema ({

    token : {
        type : String , 
        required : true,
    },
    createdAt : {
        type : Date , 
        required : true,
    },
    expireAt : {
        type : Date , 
        required : true,
    } 
})

const Linkmodel = model("expiryLink" , ExpiryLinkSchema);
module.exports = Linkmodel