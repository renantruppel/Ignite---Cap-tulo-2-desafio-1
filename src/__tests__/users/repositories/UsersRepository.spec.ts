import { validate } from "uuid";

import { UserRepository } from "../../../users/repository/implementations/UserRepository";

describe("UsersRepository", () => {
  let userRepository: UserRepository;

  beforeAll(() => {
    userRepository = UserRepository.getInstance();
  });

  it("should be able to create new users", () => {
    const nome = "Vinicius Fraga"
    const email = "vinifraga@rocketseat.com"
    const user = userRepository.create(nome, email);

    expect(user).toMatchObject({
      nome: "Vinicius Fraga",
      email: "vinifraga@rocketseat.com",
      admin: false,
    });
    expect(validate(user.id)).toBe(true);
    expect(user.created_at).toBeInstanceOf(Date);
    expect(user.updated_at).toBeInstanceOf(Date);
  });

  it("should be able to list all users", () => {
    const nome = "Danilo Vieira"
    const email = "danilo@rocketseat.com"
    const user = userRepository.create(nome, email);

    userRepository.turnAdmin(user.id)
    const users = userRepository.list(user.id);

    expect(users).toStrictEqual(expect.arrayContaining([user]));
  });

  it("should be able to find user by ID", () => {
    const nome = "Vinicius Fraga"
    const email = "vinifraga2@rocketseat.com"
    const user = userRepository.create(nome, email);
    const findUser = userRepository.findById(user.id);

    expect(findUser).toMatchObject({
      nome: user.nome,
      email: user.email,
      admin: false,
    });
    expect(validate(findUser.id)).toBe(true);
    expect(findUser.created_at).toBeInstanceOf(Date);
    expect(findUser.updated_at).toBeInstanceOf(Date);
  });

  it("should be able to find user by e-mail address", () => {
    /*const nome = "Vinicius Fraga"
    const email = "vinifraga@rocketseat.com"
    const user = userService.create(nome, email);*/

    const findUser = userRepository.findByEmail("vinifraga@rocketseat.com");

    expect(findUser).toMatchObject({
      nome: findUser.nome,
      email: findUser.email,
      admin: false,
    });
    expect(validate(findUser.id)).toBe(true);
    expect(findUser.created_at).toBeInstanceOf(Date);
    expect(findUser.updated_at).toBeInstanceOf(Date);
  });

  it("should be able to turn an user as admin", () => {
    const nome = "Vinicius Fraga"
    const email = "vinifraga3@rocketseat.com"
    const user = userRepository.create(nome, email);

    const admin = userRepository.turnAdmin(user.id);

    expect(admin).toMatchObject({
      nome: user.nome,
      email: user.email,
      admin: true,
    });
    expect(validate(admin.id)).toBe(true);
    expect(admin.created_at).toBeInstanceOf(Date);
    expect(admin.updated_at).toBeInstanceOf(Date);
  });
});