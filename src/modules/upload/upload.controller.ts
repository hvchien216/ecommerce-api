import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { ParseFile } from './parse-file.pipe';
import { UploadService } from './upload.service';
import { IFile } from '@/shared/services/aws-s3.service';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}
  @UseInterceptors(FileInterceptor('file'))
  @Post('/file')
  uploadFile(
    @UploadedFile() file: IFile,
  ): Promise<{ key: string; location: string }> {
    return this.uploadService.uploadSingle(file);
  }

  @UseInterceptors(FilesInterceptor('files'))
  @Post('/files')
  uploadFiles(
    @UploadedFiles(ParseFile) files: IFile[],
  ): Promise<{ key: string; location: string }[]> {
    return this.uploadService.uploadArrayFile(files);
  }
}
