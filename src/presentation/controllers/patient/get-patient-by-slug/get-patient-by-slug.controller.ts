import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { NestGetPatientBySlugUseCase } from '@/infrastructure/adapter/patient/nest-get-patient-by-slug';
import { ReturnPatientPresenter } from '@/presentation/utils/presenters/return-patient-presenter';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { detailedDescription, exampleResponse } from './get-patient-by-slug-schema';

@Controller('patients/by-slug/:slug')
export class GetBySlugPatientController {
  constructor(private getBySlugPatient: NestGetPatientBySlugUseCase) {}

  @Get()
  @ApiTags('Patients')
  @ApiOperation({ summary: 'Get a patient by slug', description: detailedDescription })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return patient by slug', example: exampleResponse })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  @ApiNotFoundResponse({ description: 'Patient not found' })
  async handle(@Param('slug') slug: string) {
    const result = await this.getBySlugPatient.execute({
      slug,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case ResourceNotFound:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequest(error.message);
      }
    }

    const { patient } = result.value;

    return { patients: patient.map(ReturnPatientPresenter.toHTTP) };
  }
}
