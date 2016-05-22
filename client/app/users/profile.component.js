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
var user_service_1 = require("./user.service");
var cake_service_1 = require("../cakes/cake.service");
var ProfileComponent = (function () {
    function ProfileComponent(userService, cakeService) {
        this.userService = userService;
        this.cakeService = cakeService;
        this.user = {};
        this.cakes = [];
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUser()
            .subscribe(function (user) {
            _this.user = user;
            _this.cakeService.getCakes()
                .subscribe(function (cakes) {
                _this.cakes = cakes;
                console.log(_this.cakes);
            });
        });
    };
    ProfileComponent.prototype.isEmptyString = function (str) {
        return str == "" || str == null;
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: "profile",
            templateUrl: "templates/profile.component.html"
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, cake_service_1.CakeService])
    ], ProfileComponent);
    return ProfileComponent;
})();
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map