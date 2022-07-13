import { Injectable } from '@nestjs/common';
import AWS from 'aws-sdk';
import mime from 'mime-types';

import { ApiConfigService } from './api-config.service';
import { GeneratorService } from './generator.service';

export interface IFile {
  encoding: string;
  buffer: Buffer;
  fieldname: string;
  mimetype: string;
  originalname: string;
  size: number;
}

@Injectable()
export class AwsS3Service {
  private readonly s3: AWS.S3;
  // private url: string =
  //   'https://backend-ecommerce.s3.ap-southeast-1.amazonaws.com/';
  constructor(
    public configService: ApiConfigService,
    public generatorService: GeneratorService,
  ) {
    const awsS3Config = configService.awsS3Config;

    const options: AWS.S3.Types.ClientConfiguration = {
      apiVersion: awsS3Config.bucketApiVersion,
      region: awsS3Config.bucketRegion,
    };

    this.s3 = new AWS.S3(options);
  }

  async uploadImage(file: IFile): Promise<{ key: string; location: string }> {
    const fileName = this.generatorService.fileName(
      <string>mime.extension(file.mimetype),
    );

    const key = 'file/' + fileName;
    const uploadResult = await this.s3
      .upload({
        Bucket: this.configService.awsS3Config.bucketName,
        Body: file.buffer,
        ACL: 'public-read-write',
        Key: key,
        ContentType: mime.contentType(file.originalname),
      })
      .promise();

    return {
      key: uploadResult.Key,
      location: uploadResult.Location,
    };
  }

  async deletePublicFile(fileKey: string) {
    await this.s3
      .deleteObject({
        Bucket: this.configService.awsS3Config.bucketName,
        Key: fileKey,
      })
      .promise();
  }
}
