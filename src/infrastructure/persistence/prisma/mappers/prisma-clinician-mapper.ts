import { Clinician } from '@/domain/entities/clinician';
import { Slug } from '@/domain/value-objects/slug/slug';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import { Clinician as PrismaClinician, Prisma } from '@prisma/client';

export class PrismaClinicianMapper {
  static toDomain(raw: PrismaClinician): Clinician {
    return Clinician.create(
      {
        name: raw.name,
        surname: raw.surname,
        slug: Slug.createFromText(raw.slug),
        gender: raw.gender,
        phoneNumber: raw.phoneNumber,
        email: raw.email,
        password: raw.password,
        occupation: raw.occupation,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPersistence(clinician: Clinician): Prisma.ClinicianUncheckedCreateInput {
    return {
      id: clinician.id.toString(),
      name: clinician.name,
      surname: clinician.surname,
      slug: clinician.slug.value,
      gender: clinician.gender,
      occupation: clinician.occupation,
      phoneNumber: clinician.phoneNumber,
      email: clinician.email,
      password: clinician.password,
    };
  }
}
