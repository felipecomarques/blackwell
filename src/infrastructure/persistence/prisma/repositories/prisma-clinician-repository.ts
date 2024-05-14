import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { Clinician } from '@/domain/entities/clinician';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaClinicianMapper } from '../mappers/prisma-clinician-mapper';

@Injectable()
export class PrismaClinicianRepository implements ClinicianRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Clinician | null> {
    const clinician = await this.prisma.clinician.findUnique({
      where: { id },
    });

    if (!clinician) {
      return null;
    }

    return PrismaClinicianMapper.toDomain(clinician);
  }

  async findByEmail(email: string): Promise<Clinician | null> {
    const clinician = await this.prisma.clinician.findUnique({
      where: { email },
    });

    if (!clinician) {
      return null;
    }

    return PrismaClinicianMapper.toDomain(clinician);
  }

  async findBySlug(slug: string): Promise<Clinician | null> {
    const clinician = await this.prisma.clinician.findUnique({
      where: { slug },
    });

    if (!clinician) {
      return null;
    }

    return PrismaClinicianMapper.toDomain(clinician);
  }

  async create(clinician: Clinician): Promise<void> {
    const data = PrismaClinicianMapper.toPersistence(clinician);
    await this.prisma.clinician.create({ data });
  }

  async save(clinician: Clinician): Promise<void> {
    const data = PrismaClinicianMapper.toPersistence(clinician);
    await this.prisma.clinician.update({ where: { id: data.id }, data });
  }

  async delete(clinician: Clinician): Promise<void> {
    const data = PrismaClinicianMapper.toPersistence(clinician);
    await this.prisma.clinician.delete({ where: { id: data.id } });
  }
}
