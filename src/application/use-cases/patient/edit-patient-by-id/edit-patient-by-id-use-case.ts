import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NotAllowed } from '@error/errors/not-allowed';
import { Patient } from '@entities/patient';
import { type PatientRepository } from '@application/repositories/patient-repository';
import { Gender } from '@/domain/common/types/gender-type';

interface editPatientByIdRequest {
  patientId: string;
  name: string;
  surname: string;
  gender: Gender;
  birthDate: Date;
  phoneNumber: string;
  email: string;
}

type editPatientByIdResponse = Either<
  ResourceNotFound | NotAllowed,
  { patient: Patient }
>;

export class EditPatientByIdUseCase {
  constructor(private readonly repository: PatientRepository) {}

  async execute({
    patientId,
    name,
    surname,
    gender,
    birthDate,
    phoneNumber,
    email,
  }: editPatientByIdRequest): Promise<editPatientByIdResponse> {
    const patient = await this.repository.findById(patientId);

    if (!patient) {
      return left(new ResourceNotFound());
    }

    if (patientId !== patient.id.toString()) {
      return left(new NotAllowed());
    }

    patient.name = name;
    patient.surname = surname;
    patient.gender = gender;
    patient.birthDate = birthDate;
    patient.phoneNumber = phoneNumber;
    patient.email = email;
    await this.repository.save(patient);

    return right({ patient });
  }
}
