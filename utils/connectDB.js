// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const url = `mongodb+srv://Umer:${process.env.MONGODB_PASSWORD}@cluster0.nd4srdl.mongodb.net/`;

 async function connectToDatabase() {

  try {
    await mongoose.connect(url);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}


 module.exports={connectToDatabase}
