import { Schema, mongoose } from 'mongoose';
const stepSchema = new Schema({
  title: {
    type: String,
    required: [true],
  },

  description: {
    type: String,
    required: [true],
  },
});

const Step = mongoose.model('Step', stepSchema);
export default Step;
