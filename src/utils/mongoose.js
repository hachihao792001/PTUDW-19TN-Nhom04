module.exports = {
    multipleMongooseToObject: (mongooseArray) => {
        return mongooseArray.map((mongooseObject) => {
            return mongooseObject.toObject();
        });
    },

    mongooseToObject: (mongooseObject) => {
        return mongooseObject ? mongooseObject.toObject() : mongooseObject;
    },
};
