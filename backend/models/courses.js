import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    courseName : {
        type :String,
        required : true,   
    },
    platform : {
        type : String,
        required : true
    },
    skills : {
        type : Array,
        required : true,
    },
    price : {
        type :  Number,
        required : true,
    },
    link : {
        type : String,
        required : true
    }
})

export default mongoose.model("Courses",courseSchema,"course-collections")