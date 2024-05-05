import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { Either, left, right } from '@/application/common/error-handler/either';
import { HashComparator } from '@/application/cryptography/hash-comparator';
import { Encrypter } from '@/application/cryptography/encrypter';
import { WrongCredentials } from '@/application/common/error-handler/errors/wrong-credentials';

export interface createClinicianRequest {
  email: string;
  password: string;
}

export type createConsultationResponse = Either<
  WrongCredentials,
  { accessToken: string }
>;

export class CreateClinicianUseCase {
  constructor(
    private readonly repository: ClinicianRepository,
    private readonly hashComparator: HashComparator,
    private readonly encrypter: Encrypter,
  ) {}

  async execute(req: createClinicianRequest): Promise<createConsultationResponse> {
    const { email, password } = req;

    const clinician = await this.repository.findByEmail(email);

    if (!clinician) {
      return left(new WrongCredentials());
    }

    const hashedPassword = await this.hashComparator.compare(
      password,
      clinician.password,
    );

    if (!hashedPassword) {
      return left(new WrongCredentials());
    }

    const accessToken = await this.encrypter.encrypt({ sub: clinician.id.toString() });
    return right({ accessToken });
  }
}
