import { validate } from "uuid";

import { User } from "../../../users/model/User";

describe("User model", () => {
  it("should be able to create an user with all props", () => {

    const nome = "Atlas"
    const email = "atlas@fromspace.com"
    const user = new User(nome, email);

    Object.assign(user, {
      created_at: new Date(),
      updated_at: new Date(),
    });

    expect(user).toMatchObject({
      nome: "Atlas",
      email: "atlas@fromspace.com",
      admin: false,
    });
    
    expect(validate(user.id)).toBe(true);
    expect(user.created_at).toBeInstanceOf(Date);
    expect(user.updated_at).toBeInstanceOf(Date);
  });
});