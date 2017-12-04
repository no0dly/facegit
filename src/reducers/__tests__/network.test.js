import network from "../network";
import { clearNetworkErrors, networkError } from "../../actions/network";

describe("network reducer", () => {
  describe("error field", () => {
    it("Should clear error field if clearNetworkErrors action was dispatched", () => {
      const newState = network(
        {
          error: "SomeError"
        },
        { type: clearNetworkErrors.toString() }
      );
      expect(newState.error).toEqual(null);
    });
    // it("Should return error if networkError action was dispatched", () => {
    //   const error = {
    //     data: "some"
    //   };
    //
    //   const newState = network(
    //     {},
    //     {
    //       type: networkError.toString(),
    //       payload: error
    //     }
    //   );
    //
    //   expect(newState.error).toEqual(error.data);
    // });
  });
  describe("message field", () => {
    it("Should clear error message field if clearNetworkErrors action was dispatched", () => {
      const newState = network(
        {
          error: "SomeError"
        },
        { type: clearNetworkErrors.toString() }
      );
      expect(newState.message).toEqual(null);
    });
    it("Should clear error message field if clearNetworkErrors action was dispatched", () => {
      const message = {
        response: {
          data: {
            message: "blaBla"
          }
        }
      };
      const newState = network(
        {},
        {
          type: networkError.toString(),
          payload: message
        }
      );
      expect(newState.message).toEqual(message.response.data.message);
    });
  });
});
