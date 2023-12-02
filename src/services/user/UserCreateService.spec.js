const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../../repositories/user/UserRepositoryInMemory");
const AppError = require("../../utils/AppError");

describe("UserCreateService", () => {
  let userRepositoryInMemory;
  let userCreateService;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);
  });

  it("Deve cadastrar usuário", async () => {
    const user = {
      name: "test",
      email: "test@email.com",
      password: "123",
    };

    const result = await userCreateService.execute(user);

    expect(result).toEqual("Successfully");
  });

  it("must register a admin", async () => {
    const admin = {
      name: "test",
      email: `test${process.env.ADMIN_EMAIL}`,
      password: "123",
    };

    const result = await userCreateService.execute(admin);

    expect(result).toEqual("Successfully");
  });

  it("Deve retornar um erro de dados ausentes", async () => {
    const user = {
      name: "test",
      email: "",
      password: "123",
    };

    await expect(userCreateService.execute(user)).rejects.toEqual(
      new AppError(
        "Para fazer o cadastro, é necessário enviar todas as informações."
      )
    );
  });

  it("Deve retornar um erro de 'e-mail em uso", async () => {
    const user = {
      name: "test",
      email: "test@email.com",
      password: "123",
    };

    const user2 = {
      name: "test 2",
      email: "test@email.com",
      password: "456",
    };

    await userCreateService.execute(user);

    await expect(userCreateService.execute(user2)).rejects.toEqual(
      new AppError("Este e-mail já está em uso. Por favor escolha outro.")
    );
  });

  it("Deve retornar um erro de 'e-mail inválido", async () => {
    const user = {
      name: "test",
      email: "test@email",
      password: "123",
    };

    await expect(userCreateService.execute(user)).rejects.toEqual(
      new AppError("Este e-mail é inválido. Por favor escolha outro.")
    );
  });
});