import {
  toMetaplexFile,
  toMetaplexFileFromJson
} from "@metaplex-foundation/js";
import { Umi } from "@metaplex-foundation/umi";
  
  export class Uploader {
    umi: Umi;
    constructor(umi: Umi) {
      this.umi = umi;
    }
    
    async uploadImage(imageBuffer: Buffer, name,  fileType) {
      const file = toMetaplexFile(imageBuffer, `${name}.${fileType}`, {
        displayName: name,
        uniqueName: name,
        extension: fileType
      });
      const [imageUri] = await this.umi.uploader.upload([file]);
      return imageUri;
    }
  
    async uploadJson(json: any) {
      const file = toMetaplexFileFromJson(json, "metdata.json");
      const [assetUri] = await this.umi.uploader.upload([file]);
      return assetUri;
    }
  }
  