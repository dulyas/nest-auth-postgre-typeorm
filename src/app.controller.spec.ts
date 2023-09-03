import { AppController } from "./app.controller";

describe("AppController", () => {
  let appController: AppController;
  console.log("test");

  beforeEach(async () => {
    appController = new AppController();
  });

  describe("root", () => {
    it('should return "{name: admin}"', () => {
      expect(appController.getUser({ user: { name: "admin" } } as any)).toEqual(
        new Promise((res) => res({ name: "admin" })),
      );
    });
  });
});
