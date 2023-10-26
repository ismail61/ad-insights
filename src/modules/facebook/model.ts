import { model, Schema } from 'mongoose';

const TokenSchema = new Schema(
  {
    accessToken: String,
    tokenType: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const TokenModel = model('token', TokenSchema);
export { TokenModel };
