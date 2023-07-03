const Joi=require('joi')

const createUser=(data)=>{
    const schema = Joi.object({
        email: Joi.address().required(),
        fullName: Joi.string().required()
    })
    return schema.validate(data)
}
const product =(data)=>{
    const schema = Joi.object({
     name:Joi.string().required(),
     price : Joi.number().min(6).max(6),
    })
}
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { username, password } = req.body;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  };

module.exports.createUser=createUser;