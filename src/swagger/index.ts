import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const title = 'Nest Framework';
const description =
  'This is a basic Nest boilerplate project built on the more powerful node.js framework. ' +
  'The main purpose of this project is to dynamically handle roles and permissions assigned to the user.';

export const SwaggerConfig = (app: INestApplication, apiVersion: string) => {
  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(apiVersion)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(`docutmentation/v${apiVersion}`, app, document);

  console.info(
    `Documentation: http://localhost:${process.env.PORT}/docutmentation/v${apiVersion}`,
  );
};
