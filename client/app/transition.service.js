var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var TransitionService = (function () {
    function TransitionService() {
        this.userId = JSON.parse(localStorage.getItem("profile")).user_id;
    }
    TransitionService.prototype.fadeToggleItem = function (item) {
        jQuery(item).transition("fade");
        window.setTimeout(function () {
            // TODO Temporary duplicate code until there's a better way to close
            if (!jQuery(item).hasClass("hidden")) {
                jQuery(item).transition("fade");
            }
        }, 4000);
    };
    TransitionService.prototype.closeItem = function (item) {
        if (!jQuery(item).hasClass("hidden")) {
            jQuery(item).transition("fade");
        }
    };
    TransitionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TransitionService);
    return TransitionService;
})();
exports.TransitionService = TransitionService;
//# sourceMappingURL=transition.service.js.map