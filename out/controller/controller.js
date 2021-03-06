"use strict";
/**
 * // NOTE: Model이 관리하는 게임보드의 상태를 View가 업데이트를 제대로 해주어야 한다
 * 그러기 위해서는 두 가지 방법이 있는 것 같다.
 * - 지우는 방법
 * - 안 지우고 상태를 그대로 변경하는 방법
 * 이 두 가지 방법에는 다 장단점이 있음. 아직 해결하지 못하였다.
 *
 * 지우는 방법에는, 그 보드에 있던 이벤트 리스너가 없어진다. 그렇기 때문에 이벤트 리스너를 새롭게
 * 바인딩을 해줄 방법을 찾아야 한다
 *
 * 그리고 안 지우고 상태를 그대로 변경하는 방법에는, 그 특정보드를 다시 불러와서
 * 어떻게 게임보드의 상태를 반영해줄지를 찾아야 한다.

 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
/**
 * @class Controller
 *
 * Links the model and the view
 *
 * @param model
 * @param view
 */
var Controller = /** @class */ (function () {
    function Controller(model, view) {
        var _this = this;
        this.onGameboardChanged = function (gameboard, player) {
            _this.view.displayBoard(gameboard, player);
        };
        this.onGameboardUpdated = function () {
            _this.view.bindClickCoordinate(_this.handleClickCoordinate);
        };
        // When click on the coordinate...
        // event handler..
        this.handleClickCoordinate = function (e, player) {
            _this.model.clickCoordinate(e, player);
        };
        this.model = model;
        this.view = view;
        this.model.bindGameboardChanged(this.onGameboardChanged);
        this.view.bindGameboardUpdated(this.onGameboardUpdated);
        this.onGameboardChanged(this.model.userBoard, "user");
        this.view.bindClickCoordinate("user", this.handleClickCoordinate);
        this.onGameboardChanged(this.model.computerBoard, "computer");
        this.view.bindClickCoordinate("computer", this.handleClickCoordinate);
    }
    return Controller;
}());
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map