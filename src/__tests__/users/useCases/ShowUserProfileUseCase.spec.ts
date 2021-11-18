import { v4 } from "uuid";

import { UserRepository } from "../../../users/repository/implementations/UserRepository";
import { ShowUserProfileUseCase } from "../../../users/useCases/showUserProfile/ShowUserProfileUserCase";

describe("ShowUserProfileUseCase", () => {
  let userRepository: UserRepository;
  let showUserProfileUseCase: ShowUserProfileUseCase;

  beforeAll(() => {
    userRepository = UserRepository.getInstance();
    showUserProfileUseCase = new ShowUserProfileUseCase(userRepository);
  });

  it("should be able to get user profile by ID", () => {
    const user = userRepository.create("Danilo Vieira","danilo@rocketseat.com");

    const findUser = showUserProfileUseCase.execute(user.id);

    expect(findUser).toMatchObject(user);
  });

  it("should not be able to show profile of a non existing user", () => {
    expect(() => {
      showUserProfileUseCase.execute(v4());
    }).toThrow();
  });
});