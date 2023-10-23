import { model, Schema } from 'mongoose';

const FacebookSchema = new Schema(
  {
    accessToken: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const FacebookModel = model('facebook', FacebookSchema);
export { FacebookModel };
