const { isObjectId, handleServerErrorResponse, handleNotFoundResponse, handleBadRequestResponse } = require("../helpers");
const {Ticket} = require("../models");

const index = async (req, res) => {
    const query = (req.user.role === 'admin') ? {} : { user: req.user.id };
    await Ticket.find(query).then(items => {
        res.status(200).json(items);
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const create = async (req, res) => {
    await Ticket.create({
        source: req.body.source,
        destination: req.body.destination,
        user: req.user.id
    }).then(data => {
        res.status(201).json(data);
        res.end();
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const read = async (req, res) => {
    if(!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid ID');
    const query = (req.user.role === 'admin') ? {_id: req.params.id} : { user: req.user.id, _id: req.params.id };
    await Ticket.findOne(query).then(data => {
        if(data) {
            res.status(200).json(data);
            res.end();
        }
        else handleNotFoundResponse(res);
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const update = async (req, res) => {
    if(!isObjectId(req.params.id)) handleNotFoundResponse(res, 'Invalid ID');
    const query = (req.user.role === 'admin') ? {_id: req.params.id} : { user: req.user.id, _id: req.params.id };
    await Ticket.findOne(query).then(data => {
        if(data) {
            if(data.status === 'placed') {
                if(req.body.source) data.source = req.body.source;
                if(req.body.destination) data.destination = req.body.destination;
                if(data.isModified()) {
                    const saved =  data.save().catch(error => handleServerErrorResponse(res, error));
                    if(saved) res.status(200).json(saved);
                }
                else {
                    res.status(200).json(data);
                }
            }
            else {
                handleBadRequestResponse(res, `This order cannot be updated because the Order is currently ${data.status}`);
            }
        }
        else {
            handleNotFoundResponse(res);
        }
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const destroy = (req, res) => {
    if(!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid ID');
    const query = (req.user.role === 'admin') ? {_id: req.params.id} : { user: req.user.id, _id: req.params.id };
    Ticket.findOne(query).then(data => {
        if(data) {
            data.deleteOne({ _id: req.params.id }).then(data => {
                res.status(200).json(data);
                res.end();
            }).catch(error => {
                handleServerErrorResponse(res, error);
            });
        }
        else {
            handleNotFoundResponse(res);
        }
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const setStatus = async (req, res) => {
    if(!isObjectId(req.params.id)) handleNotFoundResponse(res, 'Invalid ID');
    await Ticket.findById(req.params.id).then(data => {
        if(data) {
            if(req.body.status) {
                switch(req.body.status) {
                    case 'booked': data.actualPickupTime = new Date();
                    default: data.status = req.body.status;
                }
            }
            if(data.isModified()) {
                const saved =  data.save().catch(error => handleServerErrorResponse(res, error));
                if(saved) res.status(200).json(saved);
            }
            else {
                res.status(200).json(data);
            }
        }
        else {
            handleNotFoundResponse(res);
        }
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

module.exports = {
    index: index,
    create: create,
    read: read,
    update: update,
    destroy: destroy,
    setStatus: setStatus
}