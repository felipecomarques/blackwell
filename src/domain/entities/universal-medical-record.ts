import { BaseEntity } from '../common/base-entity';
import { Optional } from '../common/types/optional-type';
import { UniqueEntityId } from '../value-objects/unique-entity-id/unique-entity-id';
import { ConsultationIdList } from './consultation-list';

interface UniversalMedicalRecordProps {
  patientId: UniqueEntityId;
  consultationsIds: ConsultationIdList;
  profession?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  emergencyContactEmail?: string | null;
  emergencyContactNumber?: string | null;
  cpf?: string | null;
  allergies?: string | null;
  maritalStatus?: string | null;
  height?: number | null;
  weight?: number | null;
  diagnosis?: string[] | null;
  medicationsInUse?: string[] | null;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class UniversalMedicalRecord extends BaseEntity<UniversalMedicalRecordProps> {
  static create(
    props: Optional<UniversalMedicalRecordProps, 'consultationsIds' | 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const record = new UniversalMedicalRecord(
      {
        ...props,
        consultationsIds: props.consultationsIds ?? new ConsultationIdList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return record;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  get patientId(): UniqueEntityId {
    return this.props.patientId;
  }

  set patientId(value: UniqueEntityId) {
    this.props.patientId = value;
    this.touch();
  }

  get consultationsIds(): ConsultationIdList {
    return this.props.consultationsIds;
  }

  set consultationsIds(value: ConsultationIdList) {
    this.props.consultationsIds = value;
    this.touch();
  }

  get profession(): string | undefined | null {
    return this.props.profession;
  }

  set profession(value: string | undefined | null) {
    this.props.profession = value;
    this.touch();
  }

  get address(): string | undefined | null {
    return this.props.address;
  }

  set address(value: string | undefined | null) {
    this.props.address = value;
    this.touch();
  }
  get city(): string | undefined | null {
    return this.props.city;
  }

  set city(value: string | undefined | null) {
    this.props.city = value;
    this.touch();
  }

  get state(): string | undefined | null {
    return this.props.state;
  }

  set state(value: string | undefined | null) {
    this.props.state = value;
    this.touch();
  }

  get emergencyContactEmail(): string | null | undefined {
    return this.props.emergencyContactEmail;
  }

  set emergencyContactEmail(value: string | null | undefined) {
    this.props.emergencyContactEmail = value;
    this.touch();
  }

  get emergencyContactNumber(): string | null | undefined {
    return this.props.emergencyContactNumber;
  }

  set emergencyContactNumber(value: string | null | undefined) {
    this.props.emergencyContactNumber = value;
    this.touch();
  }

  get cpf(): string | null | undefined {
    return this.props.cpf;
  }

  set cpf(value: string | null | undefined) {
    this.props.cpf = value;
    this.touch();
  }

  get allergies(): string | null | undefined {
    return this.props.allergies;
  }

  set allergies(value: string) {
    this.props.allergies = value;
    this.touch();
  }

  get maritalStatus(): string | undefined | null {
    return this.props.maritalStatus;
  }

  set maritalStatus(value: string | undefined) {
    this.props.maritalStatus = value;
    this.touch();
  }

  get height(): number | null | undefined {
    return this.props.height;
  }

  set height(value: number | null | undefined) {
    this.props.height = value;
    this.touch();
  }

  get weight(): number | null | undefined {
    return this.props.weight;
  }

  set weight(value: number | null | undefined) {
    this.props.weight = value;
    this.touch();
  }

  get diagnosis(): string[] | null | undefined {
    return this.props.diagnosis;
  }

  set diagnosis(value: string[] | null | undefined) {
    this.props.diagnosis = value;
    this.touch();
  }

  get medicationsInUse(): string[] | null | undefined {
    return this.props.medicationsInUse;
  }

  set medicationsInUse(value: string[] | null | undefined) {
    this.props.medicationsInUse = value;
    this.touch();
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }
}