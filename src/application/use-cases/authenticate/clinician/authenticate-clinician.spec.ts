import { FakeEncrypter } from 'test/cryptography/fake-encrypter';
import { AuthenticateClinicianUseCase } from './authenticate-clinician';
import { InMemoryClinicianRepository } from 'test/repositories/in-memory-clinician-repository';
import { FakeHasher } from 'test/cryptography/fake-hasher';
import { makeClinician } from 'test/factories/make-clinician';

let inMemoryRepository: InMemoryClinicianRepository;
let fakeEncrypter: FakeEncrypter;
let fakeHasher: FakeHasher;
let sut: AuthenticateClinicianUseCase;

describe('Authenticate Clinician', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryClinicianRepository();
    fakeEncrypter = new FakeEncrypter();
    fakeHasher = new FakeHasher();
    sut = new AuthenticateClinicianUseCase(inMemoryRepository, fakeHasher, fakeEncrypter);
  });

  it('should be able to authenticate a clinician', async () => {
    const clinician = makeClinician({
      email: 'johndoe@email.com',
      password: await fakeHasher.hash('123456'),
    });

    inMemoryRepository.items.push(clinician);

    const result = await sut.execute({
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });
});
