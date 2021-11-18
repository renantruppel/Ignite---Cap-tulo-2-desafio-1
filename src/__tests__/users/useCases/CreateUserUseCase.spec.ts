import { UserRepository } from "../../../users/repository/implementations/UserRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";



describe("CreateUserUseCase", () => {

  
  let userRepository: UserRepository;
  let createUserUseCase: CreateUserUseCase;
  
  beforeAll(() => {
    userRepository = UserRepository.getInstance();
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it("should be able to create new users", () => {
    const nome = "Danilo Vieira"
    const email = "danilo@rocketseat.com"
    const user = createUserUseCase.execute(nome, email);
    userRepository.turnAdmin(user.id)
    expect(userRepository.list(user.id)).toStrictEqual([user]);
  });

  it("should not be able to create new users when email is already taken", () => {
    
    console.log(userRepository.getAllUsers())
    expect(() => {
      createUserUseCase.execute("Danilo Vieira","danilo@rocketseat.com");
    }).toThrow();
  });
});