import { myDataSource } from "../db/datasource/app-data-source";
import { AllImagesEntity } from "../entity/allImages.entity";
import { EnumImageType } from "../types/RestaurentsTypes";
const fs = require("fs");
const path = require("path");
export class ImageService {
  static uploadImage = async (imageDetails: {
    file: any;
    targetPath: string;
    ownerId: string;
    parentId: number | null;
    imageType: EnumImageType;
  }) => {
    const allImagesRepo = myDataSource.getRepository(AllImagesEntity);
    const tempPath = imageDetails.file.path;
    const timeString = new Date().getTime().toString();
    const fileName = timeString + imageDetails.file.filename;
    fs.renameSync(tempPath, imageDetails.targetPath + fileName);

    const savedImgRes = await allImagesRepo.save({
      fileName,
      ownerId: imageDetails.ownerId,
      imageType: imageDetails.imageType,
      parentId: imageDetails.parentId,
    });
    if (!savedImgRes) {
      throw new Error("Error saving the file 2");
    }
  };
}
