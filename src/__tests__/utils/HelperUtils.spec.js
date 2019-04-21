import HelperUtils from "../../utils/helperUtils";


describe("Test the HelperUtils component", () => {
  it("It should test the HelperUtils", () => {
    HelperUtils.verifyToken(HelperUtils.generateToken({username: 'test101'}))
  });
});
