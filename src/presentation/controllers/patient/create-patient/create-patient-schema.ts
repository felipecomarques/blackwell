import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { createZodSchemaTools } from '@/presentation/utils/create-zod-schema-tools';

extendZodWithOpenApi(z);
const createPatientSchema = z
  .object({
    name: z.string().openapi({ example: 'Jane' }),
    surname: z.string().openapi({ example: 'Doe' }),
    gender: z
      .enum(['male', 'female', 'non-binary', 'other'])
      .openapi({ example: 'female' }),
    birthDate: z
      .string()
      .datetime()
      .refine(
        (value) => {
          const birthDate = new Date(value);
          const currentDate = new Date();
          return birthDate < currentDate;
        },
        { message: 'Birth date must be in the past' },
      )
      .openapi({ example: '2000-01-01T00:00:00.000Z' }),
    phoneNumber: z.string().openapi({ example: '9999999999' }),
    email: z.string().email().openapi({ example: 'janedoe@email.com' }),
    password: z.string().openapi({ example: '12345' }),
  })
  .openapi('Patient');

export const {
  swaggerBody,
  validationBody,
  schemaType: BodyType,
} = createZodSchemaTools(createPatientSchema);