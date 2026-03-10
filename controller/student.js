const Student = require("../models/Student");

exports.createStudent = async (req, res) => {
  try {
    const { name, age, email, studentClass, address, phone } = req.body;

    if (!name || !age || !email || !studentClass || !address || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Student with that email already exists" });
    }

    const newStudent = new Student({
      name,
      age,
      email,
      studentClass,
      address,
      phone,
    });

    const savedStudent = await newStudent.save();

    return res.status(201).json({
      message: "Student created successfully",
      student: savedStudent,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};
exports.getAllStudent = async (req, res) => {
  try {
    const student = await Student.find({});
    return res.status(200).json({
      message: "All student details fectched successfully",
      student: student,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res
        .status(404)
        .json({ message: `Student not found` });
    } else {
      return res
        .status(200)
        .json({ message: "Student fetched successfully", student: student });
    }
  } catch (error) {
    return res.status(400).json({ message: "Internal Server error" });
  }
};
exports.updateStudent = async (req, res) => {
  try {
    const { name, age, email, studentClass, address, phone } = req.body;

    if (!name || !age || !email || !studentClass || !address || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, age, email, studentClass, address, phone },
      { new: true },
    );
    if (!student) {
      return res
        .status(404)
        .json({ message: `Student with ${id} does not exists` });
    } else {
      return res
        .status(200)
        .json({ message: "Student updated successfully", student: student });
    }
  } catch (error) {
    return res.status(400).json({ message: "Internal Server error" });
  }
};
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if(!student){
      return res.status(404).json({message:'Student not found'})
    }
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Internal Server error" });
  }
};
