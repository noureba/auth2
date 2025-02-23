import userModel from "../models/userModel.js";

export const userData = async (req, res)=>{
    const {userId} = req.body;
    if(!userId){
        return res.json({success: false, message: "User not found"});
    }
    try {
        const user = await userModel.findById(userId);
        if(!user){
            return res.json({success: false, message: "User not found"});
        }
        res.status(200).json({success: true, user: {
            name: user.name,
            email: user.email,
            isAcountVerified: user.isAcountVerified
    }});
        
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}