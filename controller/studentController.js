const Student = require("../models/Student");
const bcrypt = require("bcryptjs");


exports.signupStudent = async (req, res) => {
    try {

        const { name, phoneNumber, password , confirmPassword } = req.body;

        if (!name || !phoneNumber || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the required fields"
            });
        }

        const data = await Student.findOne({
            phoneNumber:phoneNumber
        })

        if(data){
            return res.status(401).json({
                success:false,
                message:"number is already exist"
            })
        }


        if(password  !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        const hashpass  = await bcrypt.hash(password, 10);
        
        const student  =  await Student.create({
            name,
            phoneNumber,
            password:hashpass
        })

        return res.status(200).json({
            success:true,
            message:"student add successfully"
        })

       
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};



exports.loginstudent = async (req,res) => {
    try {
        const {phoneNumber , password , fcm_token} = req.body

        if(!phoneNumber || !password || !fcm_token){
            return res.status(400).json({
                success:false,
                message:"please fill all details"
            })
        }

        const user = await Student.findOne({
            phoneNumber:phoneNumber
        })

        if(!user){
            return res.status(401).json({
                success:false,
                message:'Please sign up first'
            })
        }

           const isPasswordValid = await bcrypt.compare(password, user.password);
        
                if(!isPasswordValid){
                    return res.status(400).json({
                        success: false,
                        message: "Invalid credentials"
                    });
                }


                   const token =  jwt.sign(
                             {
                                 phoneNumber: user.phoneNumber,
                                 id: user._id,
                                 accountType: user.accountType
                             },
                             process.env.JWT_SECRET,
                            
                         );


                         user.token = token
                         user.fcm_token = fcm_token
                         await user.save()


                          res.status(200).json({
            success: true,
            message: "Login successfully",
            data: user,
            token: token
        });
                 

    } catch (error) {
          res.status(500).json({ success: false, error: error });
    }
}