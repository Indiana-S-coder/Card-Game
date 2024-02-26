const { Entity, Schema } = require("redis-om")

class User extends Entity {}

const userSchema = new Schema(User, {
  password: { 
    type: 'string' 
 },
  email:{ 
    type: 'string'
 },
  score: { 
    type: 'number', 
    sortable: true
 },
  deck: {
    type: 'string[]',
  },
  defuseCard: {
    type: 'number',
    default: 0
  }
});

module.exports = { User, userSchema };

