import { PatientRepository } from '@/application/repositories/patient-repository';
import { Consultation } from '@/domain/entities/consultation';
import { MedicalRecord } from '@/domain/entities/medical-record';
import { Patient } from '@/domain/entities/patient';

export class InMemoryPatientRepository implements PatientRepository {
  public items: Patient[] = [];

  async findByEmail(email: string) {
    const patient = this.items.find((item) => item.email === email);

    if (!patient) {
      return null;
    }

    return patient;
  }

  async findById(id: string) {
    const patient = this.items.find((item) => item.id.toString() === id);

    if (!patient) {
      return null;
    }

    return patient;
  }

  async findBySlug(slug: string) {
    const patient = this.items.find((item) => item.slug.value === slug);

    if (!patient) {
      return null;
    }

    return patient;
  }

  async findRecordById(id: string) {
    const patient = this.items.find((item) => item.medicalRecord.id.toString() === id);

    if (!patient) {
      return null;
    }

    return patient.medicalRecord;
  }

  async findRecordByPatientId(id: string) {
    const patient = this.items.find(
      (item) => item.medicalRecord.patientId.toString() === id,
    );

    if (!patient) {
      return null;
    }

    return patient.medicalRecord;
  }

  async create(patient: Patient) {
    this.items.push(patient);
  }

  async save(patient: Patient) {
    const index = this.items.findIndex((item) => item.id === patient.id);
    this.items[index] = patient;
  }

  async createRecord(patientId: string, medicalRecord: MedicalRecord) {
    const patient = this.items.find((item) => item.id.toString() === patientId);

    if (!patient) {
      return null;
    }

    patient.medicalRecord = medicalRecord;
  }

  async saveRecord(medicalRecord: MedicalRecord) {
    const index = this.items.findIndex(
      (item) => item.medicalRecord.id === medicalRecord.id,
    );
    this.items[index].medicalRecord = medicalRecord;
  }

  async saveConsultationOnRecord(consultation: Consultation) {
    const patient = this.items.find((item) => item.id === consultation.patientId);

    if (!patient) {
      return null;
    }

    patient.medicalRecord.consultationsIds.add(consultation.id);
  }

  async removeConsultationOnRecord(consultation: Consultation) {
    const patient = this.items.find((item) => item.id === consultation.patientId);

    if (!patient) {
      return null;
    }

    patient.medicalRecord.consultationsIds.remove(consultation.id);
  }

  async delete(patient: Patient) {
    const index = this.items.findIndex((item) => item.id === patient.id);
    this.items.splice(index, 1);
  }
}
