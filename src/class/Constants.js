/**
 * References :
 * 
 * For body types : https://docs.coronalabs.com/guide/physics/physicsBodies/index.html#create
 */
const Vector = require('class/Vector')

const BodyType = {
  DYNAMIC: 'DYNAMIC',
  STATIC: 'STATIC',
  KINEMATIC: 'KINEMATIC',
};

const GRAVITY = new Vector(0, 0.98);

module.exports = {
  BodyType,
  GRAVITY
}