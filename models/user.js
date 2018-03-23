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
    }
  });
  User.prototype.validPassword = password => bcrypt.compareSync(password, this.password);
  User.hook("beforeCreate", (user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  User.associate = models => {
    // Associating user with link
    // When an user is deleted, also delete any associated link
    User.hasMany(models.Link, {
      onDelete: "cascade"
    });
  };
  return User;
};

// need to make birthday column