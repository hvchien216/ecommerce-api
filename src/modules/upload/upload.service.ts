import { AwsS3Service, IFile } from '@/shared/services/aws-s3.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  constructor(private awsS3Service: AwsS3Service) {}

  async uploadSingle(file: IFile): Promise<{ key: string; location: string }> {
    return await this.awsS3Service.uploadImage(file);
  }

  async uploadArrayFile(
    files: IFile[],
  ): Promise<{ key: string; location: string }[]> {
    return await Promise.all(
      files.map((file) => this.awsS3Service.uploadImage(file)),
    );
  }
}
