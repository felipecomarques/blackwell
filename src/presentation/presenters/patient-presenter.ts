import { Patient } from '@/domain/entities/patient';
import { maskPassword } from './mask-password';

export class patientPresenter {
  static toHTTP(patient: Patient, password: string) {
    return {
      id: patient.id.toString(),
      name: patient.name,
      surname: patient.surname,
      slug: patient.slug.value,
      gender: patient.gender,
      birthDate: patient.birthDate,
      phoneNumber: patient.phoneNumber,
      email: patient.email,
      password: maskPassword(password),
    };
  }
}
