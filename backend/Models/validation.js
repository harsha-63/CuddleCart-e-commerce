import joi from 'joi'


export const joiUserSchema = joi.object({
    name:joi.string(),
    email:joi.string().email().required(),
    password:joi.string().min(6).required(),
    isBlock:joi.boolean().default(false),
    isAdmin:joi.boolean().default(false)


})

export const joiProductSchema = joi.object({
    name:joi.string().required(),
    description:joi.string().required(),
    price:joi.number().required(),
    image:joi.string(),
    stars:joi.number().optional().min(1).max(5).default(1),
    category:joi.string().required(),
    newArrival:joi.boolean(),
    isDeleted:joi.boolean().default(false)


})
