const request = require("supertest");
const app = require("../app");
const prisma = require("../prismaClient");

jest.mock("../prismaClient", () => ({
  charcoords: {
    findUnique: jest.fn(),
  },
}));

describe("coordinate confirmation", () => {
  beforeEach(() => {
    prisma.charcoords.findUnique.mockReset();
  });

  test("data coordinates return user object when correct coordinates passed", async () => {
    prisma.charcoords.findUnique.mockResolvedValue({
      id: 3,
      name: "Ron",
      minX: 462,
      maxX: 510,
      minY: 377,
      maxY: 441,
    });

    const data = { x: 470, y: 400 };

    const res = await request(app).post("/check-data").send(data);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      id: 3,
      name: "Ron",
      minX: 462,
      maxX: 510,
      minY: 377,
      maxY: 441,
    });
  });

  test("coords not in range return faulty value", async () => {
    prisma.charcoords.findUnique.mockResolvedValue({
      id: 3,
      name: "Ron",
      minX: 462,
      maxX: 510,
      minY: 377,
      maxY: 441,
    });

    const data = { x: 400, y: 400 };

    const res = await request(app).post("/check-data").send(data);

    expect(res.statusCode).toBe(201);

    expect(res.body).toEqual({ message: "coordinates invalid" });
  });
});
