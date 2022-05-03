import supertest from 'supertest';

import { prisma } from '../src/database.js';
import app from '../src/app.js';

import userBodyFactory from './factories/userBodyFactory';
import userFactory from './factories/userFactory';

const agent = supertest(app)

async function truncateUsers() {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
}

async function truncateTests() {
  await prisma.$executeRaw`TRUNCATE TABLE tests;`;
}

async function disconnect() {
  await prisma.$disconnect();
}

describe('User - POST /sign-up', () => {
  beforeEach(truncateUsers);
  afterAll(disconnect);

  it('should return 201 and persist user data given a valid body', async () => {
    const body = userBodyFactory();
    const res = await agent.post('/sign-up').send(body);
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    expect(user).not.toBeNull();
    expect(res.status).toEqual(201);
  });

  it('should return 409 given a duplicate email', async () => {
    const body = userBodyFactory();
    const res = await agent.post('/sign-up').send(body);

    await agent.post('/sign-up').send(body);
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    expect(user).not.toBeNull();
    expect(res.status).toEqual(409);
  });

  it('should return 422 given an invalid body', async () => {
    const body = {};

    const res = await agent.post('/sign-up').send(body);

    expect(res.status).toEqual(422);
  });
});

describe('User - POST /sign-in', () => {
  beforeEach(truncateUsers);
  afterAll(disconnect);

  it("should return 200 and a token given valid user data", async () => {
    const body = userBodyFactory();
    await userFactory(body);

    const res = await agent.post("/sign-in").send(body);
    
    expect(typeof res.body.token).toEqual("string");
    expect(res.body.token.length).toBeGreaterThan(0);
    expect(res.status).toEqual(200);
  });

  it("should return 401 given an invalid email", async () => {
    const body = userBodyFactory();

    const res = await agent.post("/sign-in").send(body);

    expect(res.status).toEqual(401);
  });

  it("should return 401 given an invalid password", async () => {
    const body = userBodyFactory();
    await userFactory(body);

    const res = await agent
      .post("/sign-in")
      .send({
        ...body,
        password: "bananinha",
      });

    expect(res.status).toEqual(401);
  });
});

describe('Test - POST /tests/create', () => {
  it('should return 422 given an invalid body', async () => {
    const test = {}
    const res = await agent.post('/tests/create').send(test);

    expect(res.status).toEqual(422);
  })
});