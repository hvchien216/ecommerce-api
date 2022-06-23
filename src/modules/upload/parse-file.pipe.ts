import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class ParseFile implements PipeTransform {
  transform(
    files: Array<Express.Multer.File>,
    _metadata: ArgumentMetadata,
  ): Array<Express.Multer.File> {
    // if (file === undefined || file === null) {
    //   throw new BadRequestException('Validate file');
    // }
    console.log(files?.length);
    return files;
  }
}
