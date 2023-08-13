import {
  ModelOptions,
  Severity,
  getModelForClass,
  index,
  post,
  prop,
} from "@typegoose/typegoose";
import mongoose from "mongoose";

@post<BoardClass>("save", function (doc: any) {
  if (doc) {
    doc.id = doc._id.toString();
    doc._id = doc.id;
  }
})
@post<BoardClass[]>(/^find/, function (docs: any) {
  // @ts-ignore
  if (this.op === "find") {
    docs.forEach((doc: any) => {
      doc.id = doc._id.toString();
      doc._id = doc.id;
    });
  }
})
@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "boards",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
// @index({ title: 1 })
class BoardClass {
  @prop({ required: true })
  title: string;
  @prop({ required: true })
  ownerId: string;
  @prop({ required: true })
  createdTime: Date;
  @prop({ required: true })
  lastModifiedTime: Date;
  @prop({ default: false })
  isShared: boolean;
  @prop()
  drawings: any[];
  @prop({ default: false })
  completed: boolean;
  _id: mongoose.Types.ObjectId | string;

  id: string;
}

const Board = getModelForClass(BoardClass);
export { Board, BoardClass };
