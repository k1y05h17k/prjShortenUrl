const { DataTypes } = require('sequelize');
const sequelize = require('../server');
const bcrypt = require('bcrypt');


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: { msg: 'Please tell us your name!' }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        lowercase: true,
        validate: {
            notNull: { msg: 'Please provide your email!' },
            isEmail: { msg: 'Please provide a valid email' }
        }
    },
    profileImage:{
       type: DataTypes.STRING,
       allowNull: true, 
    },
    createAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updateAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: null
    },    
    status: {
        type: DataTypes.ENUM('active','inactive','banned'),
        defaultValue:'active' // Add rules to the first login active the user   
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Please provide a password!' },
            len: {
                args: [8],
                msg: 'Password must be at least 8 characters long'
            }
        }
    },
    passwordConfirm: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Confirm your password' },
            isSameAsPassword(value) {
                if (value !== this.password) {
                    throw new Error('Passwords are not the same!');
                }
            }
        }
    }
}, {
    hooks: {
        beforeSave: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
                user.passwordConfirm = undefined;
            }
        }
    }
});

module.exports = User;