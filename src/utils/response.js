const response = (status,data,message,res) => {

    res.status(status).json(
        [{

            payload: data,
            status: status,
            message: message,

            pagination: {
                prev: "",
                next: "",
                max: ""
            }

        }]
    );
}

export default response;