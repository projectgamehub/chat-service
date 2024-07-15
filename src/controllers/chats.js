const chats = async (req, res) => {

    console.log(req.senderId);


    return res.status(200).json({
        message: "Chats retrieved successfully",
        success: true
    });
}

export default chats;