const bcrypt = require("bcrypt-nodejs");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null
    },
    array:{
      type:DataTypes.TEXT,
      allowNull:true,
    }
  });
  User.prototype.validPassword = function(password){return bcrypt.compareSync(password, this.password)};
  User.hook("beforeCreate",user => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  User.associate = function (models) {
    User.hasMany(models.Link, {
      onDelete: "cascade"
    });
  };
  return User;
};
