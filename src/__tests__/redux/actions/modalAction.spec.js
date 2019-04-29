import { openModalAction, closeModalAction } from "../../../redux/actionCreators/modalActions";
 
describe('modal actions', () => {
  it('should open a modal', () => {
    expect(openModalAction ()).toEqual({ type: "OPEN_MODAL" });
  })
  it('should close a modal', () => {
    expect(closeModalAction()).toEqual({ type: "CLOSE_MODAL" });
  })
});
 