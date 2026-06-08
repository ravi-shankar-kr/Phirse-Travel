import requestCallbackModel from "../models/requesCallback.model.js";

export async function createRequestCallback(req, res) {

    console.log(req.body);
    
    
    const user = req.user.id;

    if (!user) {
        return res.status(401).json({
            message: "userId not fetched",
            success: false
        })
    }

    const requesCallback = await requestCallbackModel.create({
        fullName: req.body.fullName,
        phoneNo: req.body.phoneNo,
        userId: req.user.id,
        date: req.body.date,
        enquiry: req.body.enquiry
    })

    res.status(201).json({
        message: "request callback created successfully",
        success: true,
        requesCallback
    })
}


export async function getRequestCallback(req, res) {

    const getRequest = await requestCallbackModel.find();

    res.status(200).json({
        message: "RequestCallback fetched successfully",
        success:true,
        getRequest: getRequest.map(item => ({
            fullName: item.fullName,
            phoneNo: item.phoneNo,
            date: item.date,
            enquiry: item.enquiry
        }))
    })
}