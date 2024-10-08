import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NotAllowed } from '@error/errors/not-allowed';
import { Consultation } from '@entities/consultation';
import { type ConsultationRepository } from '@application/repositories/consultation-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';

interface editConsultationByIdRequest {
  consultationId: string;
  appointmentDate: Date;
  room: number;
}

type editConsultationByIdResponse = Either<
  ResourceNotFound | NotAllowed,
  { consultation: Consultation }
>;

export class EditConsultationByIdUseCase {
  constructor(
    private readonly consultationRepository: ConsultationRepository,
    private readonly patientRecordRepository: PatientRepository,
  ) {}

  async execute({
    consultationId,
    appointmentDate,
    room,
  }: editConsultationByIdRequest): Promise<editConsultationByIdResponse> {
    const consultation = await this.consultationRepository.findById(consultationId);

    if (!consultation) {
      return left(new ResourceNotFound());
    }

    const patient = await this.patientRecordRepository.findById(
      consultation.patientId.toString(),
    );

    if (!patient) {
      return left(new ResourceNotFound());
    }

    consultation.appointmentDate = appointmentDate;
    consultation.room = room;
    patient.universalMedicalRecord.consultationsIds.update([consultation.id]);

    await this.patientRecordRepository.save(patient);
    await this.consultationRepository.save(consultation);
    return right({ consultation });
  }
}
