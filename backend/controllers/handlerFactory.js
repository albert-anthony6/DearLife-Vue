const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndRemove(req.params.id);

    if(!doc){
        return next(new AppError('No document found with that ID!', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // new updated doc is returned to database
        runValidators: true // So schema validators will run again
    });

    if(!doc){
        return next(new AppError('No document found with that ID!', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

exports.createOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body); // new document
    res.status(201).json({
        status: 'Success',
        data: {
            data: doc
        }
    });
});

exports.getOne = (Model, popOptions) => catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if(popOptions) query = query.populate(popOptions);
    
    const doc = await query;

    if(!doc){
        return next(new AppError('No document found with that ID!', 404));
    }

    res.status(200).json({
        status: 'Success',
        data: {
            data: doc
        }
    });
});

exports.getAll = Model => catchAsync(async (req, res, next) => {
    // To allow for nested GET comments on post (hack)
    let filter = {};
    if(req.params.postId) filter = { post: req.params.postId }

    // EXECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

    const doc = await features.query;
    
    // SEND RESPONSE
    res.status(200).json({
        status: 'Success',
        results: doc.length,
        data: {
            data: doc
        }
    });
});