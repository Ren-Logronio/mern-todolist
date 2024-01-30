import mongoose from 'mongoose';

const database = mongoose.connect("mongodb://localhost:27017/mern-todolist-db");

export { database };