const author = (sequelize, DataTypes) => {
  const Author = sequelize.define('author', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: { notEmpty: true },
    },
  });

  Author.associate = models => {
    Author.hasMany(models.Tweet);
  };

  return Author;
};

export default author;
