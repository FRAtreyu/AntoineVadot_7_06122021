const Sequelize = require('sequelize');
const sequelize = new Sequelize('groupomania', 'root', 'Atreyu01400!', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


var exports = module.exports = {};
exports.sequelize = sequelize;

const User = sequelize.define('user', {
        id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        firstname: {type: Sequelize.STRING, allowNull: false},
        lastname: {type: Sequelize.STRING, allowNull: false},
        email: {type: Sequelize.STRING, allowNull: false, unique: true},
        password: {type: Sequelize.STRING, allowNull: false},
        pseudo: {type: Sequelize.STRING, allowNull: false, unique: true},
        deleted: {type: Sequelize.BOOLEAN, default: false},
        role_id: {type: Sequelize.INTEGER, allowNull: false, default: 0}
    },
    {
        tableName: 'user', timestamps: false, underscored: true
    });
exports.User = User;

const Role = sequelize.define('role', {
        id: {type: Sequelize.INTEGER, primaryKey: true},
        name: {type: Sequelize.STRING, allowNull: false},
    },
    {tableName: 'role', timestamps: false, underscored: true}
);
exports.Role = Role;


const Post = sequelize.define('post', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        user_id: {type: Sequelize.INTEGER, allowNull: false},
        likes: {type: Sequelize.INTEGER, allowNull: false, default: 0},
        dislikes: {type: Sequelize.INTEGER, allowNull: false, default: 0},
        post_message: {type: Sequelize.TEXT, allowNull: false},
        user_deleted: {type: Sequelize.BOOLEAN, allowNull:false, default: false},
        deleted: {type: Sequelize.BOOLEAN, allowNull: false, default:false}
    },
    {tableName: 'post', underscored: true});
exports.Post = Post;


const Comment = sequelize.define('comment', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    post_id: {type: Sequelize.INTEGER, allowNull: false},
    user_id: {type: Sequelize.INTEGER, allowNull: false},
    text: {type: Sequelize.TEXT, allowNull: false},
    user_deleted: {type: Sequelize.BOOLEAN, allowNull:false, default: false},
    deleted: {type: Sequelize.BOOLEAN, allowNull:false, default: false}

},
    {tableName: 'comment', underscored: true});
exports.Comment = Comment;

Role.hasMany(User);
User.belongsTo(Role);

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

sequelize.sync({logging: console.log});
