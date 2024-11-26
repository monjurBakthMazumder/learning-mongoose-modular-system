import { Schema, model } from 'mongoose';
import { Guardian, LocalGuardian, Student, UserName } from './student.interface';

// User name schema with validation for capitalization and length
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, "First name is required and cannot be empty"],
    trim: true,
    maxlength: [20, 'First name cannot be more than 20 characters'],
    validate: {
      validator: function(value: string) {
        const firstNameStr = value[0].toUpperCase() + value.slice(1).toLowerCase();
        return value === firstNameStr;
      },
      message: '{VALUE} is not capitalized format',
    }
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required and cannot be empty"],
    trim: true,
    maxlength: [20, 'Last name can not be more than 20 characters'],
  },
});

// Guardian schema with validation for contact numbers
const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
    validate: {
      validator: function(value: string) {
        return /^[0-9]{10}$/.test(value); // Validating for a 10-digit number
      },
      message: "Father's contact number must be a 10-digit number",
    }
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
    validate: {
      validator: function(value: string) {
        return /^[0-9]{10}$/.test(value); // Validating for a 10-digit number
      },
      message: "Mother's contact number must be a 10-digit number",
    }
  },
});

// Local Guardian schema with validation for contact numbers
const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required"],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
    validate: {
      validator: function(value: string) {
        return /^[0-9]{10}$/.test(value); // Validating for a 10-digit number
      },
      message: "Local guardian's contact number must be a 10-digit number",
    }
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
  },
});

// Student schema with additional validations
const studentSchema = new Schema<Student>({
  id: { 
    type: String, 
    required: [true, "Student ID is required"], 
    unique: true 
  },
  name: {
    type: userNameSchema,
    required: [true, "Student name is required"],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not a valid gender. Valid values are: male, female, or other',
    },
    required: [true, "Gender is required"],
  },
  dateOfBirth: { 
    type: String, 
    required: [true, "Date of birth is required"],
    validate: {
      validator: function(value: string) {
        return /^\d{4}-\d{2}-\d{2}$/.test(value); // Validating for date format YYYY-MM-DD
      },
      message: 'Date of birth must be in the format YYYY-MM-DD',
    }
  },
  email: { 
    type: String, 
    required: [true, "Email address is required"], 
    trim: true,
    unique: true,
    validate: {
      validator: function(value: string) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value); // Email format validation
      },
      message: 'Please provide a valid email address',
    }
  },
  contactNo: { 
    type: String, 
    required: [true, "Contact number is required"],
    validate: {
      validator: function(value: string) {
        return /^[0-9]{10}$/.test(value); // Validating for a 10-digit number
      },
      message: "Contact number must be a 10-digit number",
    }
  },
  emergencyContactNo: { 
    type: String, 
    required: [true, "Emergency contact number is required"],
    validate: {
      validator: function(value: string) {
        return /^[0-9]{10}$/.test(value); // Validating for a 10-digit number
      },
      message: "Emergency contact number must be a 10-digit number",
    }
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    message: '{VALUE} is not a valid blood group. Valid values are: A+, A-, B+, B-, AB+, AB-, O+, O-',
  },
  presentAddress: { 
    type: String, 
    required: [true, "Present address is required"] 
  },
  permanentAddress: { 
    type: String, 
    required: [true, "Permanent address is required"] 
  },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian details are required"],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local guardian details are required"],
  },
  profileImg: { 
    type: String,
    validate: {
      validator: function(value: string) {
        return /\.(jpg|jpeg|png|gif)$/i.test(value); // Validate image file extensions
      },
      message: 'Profile image must be a valid image format (jpg, jpeg, png, gif)',
    }
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
    message: '{VALUE} is not a valid status. Valid values are: active, blocked',
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
