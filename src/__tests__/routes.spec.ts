import request from "supertest";
import { v4 } from "uuid";

import { app } from "../index";
import { User } from "../users/model/User";
import { UserRepository } from "../users/repository/implementations/UserRepository";

describe("[POST] /users", () => {
  it("should be able to create new users", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        nome: "John Doe",
        email: "john.doe@example.com",
      })
      .expect(201);

    expect(response.body).toMatchObject({
      nome: "John Doe",
      email: "john.doe@example.com",
      admin: false,
    });
  });

  it("should not be able to create new users when email is already taken", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        nome: "John Doe",
        email: "john.doe@example.com",
      })
      .expect(400);

    expect(response.body.error).toBeTruthy();
  });
});

describe("[PATCH] /users/:user_id/admin", () => {
  it("should be able to turn an user as admin", async () => {
    const usersRepository = UserRepository.getInstance();

    const nome = String(Math.random())
    const email = String(Math.random())
    const user = usersRepository.create(nome, email);

    const response = await request(app).patch(`/users/${user.id}/admin`);

    expect(response.body).toMatchObject({
      nome: user.nome,
      email: user.email,
    });
    expect(response.body.admin).toBe(true);
  });

  it("should not be able to turn a non existing user as admin", async () => {
    const response = await request(app)
      .patch(`/users/${v4()}/admin`)
      .expect(404);

    expect(response.body.error).toBeTruthy();
  });
});

describe("[GET] /users/:user_id", () => {
  it("should be able to get user profile by ID", async () => {
    const usersRepository = UserRepository.getInstance();

    const nome = String(Math.random())
    const email = String(Math.random())
    const user = usersRepository.create(nome, email);

    const response = await request(app).get(`/users/${user.id}`);

    const parsedResponse = {
      ...response.body,
      created_at: new Date(response.body.created_at),
      updated_at: new Date(response.body.updated_at),
    };

    expect(parsedResponse).toMatchObject({
      ...user,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
  });

  it("should not be able to show profile of a non existing user", async () => {
    const response = await request(app).get(`/users/${v4()}`).expect(404);

    expect(response.body.error).toBeTruthy();
  });
});

describe("[GET] /users", () => {
  it("should be able to list all users", async () => {
    const usersRepository = UserRepository.getInstance();

    const nome = String(Math.random())
    const email = String(Math.random())
    const user1 = usersRepository.create(nome, email);

    usersRepository.turnAdmin(user1.id);

    const nome2 = String(Math.random())
    const email2 = String(Math.random())
    const user2 = usersRepository.create(nome2, email2);


    const nome3 = String(Math.random())
    const email3 = String(Math.random())
    const user3 = usersRepository.create(nome3, email3);

    const response = await request(app).get("/users").set("user_id", user1.id);

    expect(
      response.body.map((res) => ({
        ...res,
        created_at: new Date(res.created_at),
        updated_at: new Date(res.updated_at),
      }))
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ ...user1, admin: true }),
        user2,
        user3,
      ])
    );
  });

  it("should not be able to a non admin user get list of all users", async () => {
    const usersRepository = UserRepository.getInstance();

    const nome = String(Math.random())
    const email = String(Math.random())
    const user = usersRepository.create(nome, email);

    const response = await request(app)
      .get("/users")
      .set("user_id", user.id)
      .expect(400);

    expect(response.body.error).toBeTruthy();
  });

  it("should not be able to a non admin user get list of all users", async () => {
    const usersRepository = UserRepository.getInstance();

    const nome = String(Math.random())
    const email = String(Math.random())
    const user = usersRepository.create(nome, email);

    const response = await request(app)
      .get("/users")
      .set("user_id", user.id)
      .expect(400);

    expect(response.body.error).toBeTruthy();
  });

  it("should not be able to a non existing user get list of all users", async () => {
    const response = await request(app)
      .get("/users")
      .set("user_id", v4())
      .expect(400);

    expect(response.body.error).toBeTruthy();
  });
});