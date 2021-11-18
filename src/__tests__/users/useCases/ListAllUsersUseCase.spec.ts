import { v4 } from "uuid";

import { UserRepository } from "../../../users/repository/implementations/UserRepository";
import { ListAllUsersUseCase } from "../../../users/useCases/listAllUsers/ListAllUsersUseCase";

describe("ListAllUsersUseCase", () => {
  let userRepository: UserRepository;
  let listAllUsersUseCase: ListAllUsersUseCase;
  let userId: string;

  beforeAll(() => {
    userRepository = UserRepository.getInstance();
    listAllUsersUseCase = new ListAllUsersUseCase(userRepository);
  });

  it("should be able to list all users", () => {
    const user1 = userRepository.create("Danilo Vieira",
    "danilo@rocketseat.com",);

    const user2 = userRepository.create("Vinicius Fraga",
      "vinifraga@rocketseat.com");

    userId = user2.id;

    const user3 = userRepository.create("Joseph Oliveira",
      "dogim@rocketseat.com");

    userRepository.turnAdmin(user1.id);

    const users = listAllUsersUseCase.execute(user1.id);

    expect(users).toEqual(
      expect.arrayContaining([
        /*expect.objectContaining({
          name: "Danilo Vieira",
          email: "danilo@rocketseat.com",
        })*/user1,
        user2,
        user3,
      ])
    );
  });

  it("should not be able to a non admin user get list of all users", () => {
    expect(() => {
      listAllUsersUseCase.execute(userId);
    }).toThrow();
  });

  it("should not be able to a non existing user get list of all users", () => {
    expect(() => {
      listAllUsersUseCase.execute(v4());
    }).toThrow();
  });
});