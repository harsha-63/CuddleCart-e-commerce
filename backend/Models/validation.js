import joi from 'joi'


export const joiUserSchema = joi.object({
    name:joi.string(),
    email:joi.string().email().required(),
    password:joi.string().min(6).required(),
    isBlock:joi.boolean().default(false).required(),
    isAdmin:joi.boolean().default(false).required()


})

export const joiProductSchema = joi.object({
    name:joi.string().required(),
    description:joi.string().required(),
    price:joi.number().required(),
    image:joi.string(),
    category:joi.string().required(),
    newArrival:joi.boolean(),
    isDeleted:joi.boolean().default(false)


})
