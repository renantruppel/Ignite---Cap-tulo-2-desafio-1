import { v4 } from "uuid";

import { UserRepository } from "../../../users/repository/implementations/UserRepository";
import { TurnUserAdminUseCase } from "../../../users/useCases/turnUserAdmin/TurnUserAdminUseCase";

describe("TurnUserAdminUseCase", () => {
  let userRepository: UserRepository;
  let turnUserAdminUseCase: TurnUserAdminUseCase;

  beforeAll(() => {
    userRepository = UserRepository.getInstance();
    turnUserAdminUseCase = new TurnUserAdminUseCase(userRepository);
  });

  it("should be able to turn an user as admin", () => {
    const name = "Joseph Oliveira"
    const email = "dogim@rocketseat.com"
    const user = userRepository.create(name, email);

    const updatedUser = turnUserAdminUseCase.execute(user.id);

    expect(updatedUser.admin).toBe(true);
    expect(userRepository.list(user.id)).toStrictEqual(
      expect.arrayContaining([updatedUser])
    );
  });

  it("should not be able to turn a non existing user as admin", () => {
    expect(() => {
      turnUserAdminUseCase.execute(v4());
    }).toThrow();
  });
});