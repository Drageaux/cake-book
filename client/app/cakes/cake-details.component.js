System.register(["angular2/core", "angular2/router", "angular2-jwt", "./cake", "./cake.service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, angular2_jwt_1, cake_1, cake_service_1, router_2;
    var CakeDetailsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (cake_1_1) {
                cake_1 = cake_1_1;
            },
            function (cake_service_1_1) {
                cake_service_1 = cake_service_1_1;
            }],
        execute: function() {
            CakeDetailsComponent = (function () {
                function CakeDetailsComponent(_router, _routeParams, _service) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._service = _service;
                }
                CakeDetailsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = this._routeParams.get('id');
                    this._service.getCake(id)
                        .subscribe(function (cake) { return _this.cake = cake; }, function (error) { return _this._router.navigate(["Home"]); }, function () { return _this.getCakeImage(); });
                };
                CakeDetailsComponent.prototype.addDetail = function (detailType) {
                    var _this = this;
                    if (detailType == "ingr") {
                        if (!this.isEmptyString(this.currIngr)) {
                            this._service.addCakeDetail(this.cake._id, "ingr", this.currIngr)
                                .subscribe(function (cake) { return _this.cake = cake; });
                            this.currIngr = "";
                        }
                    }
                    else if (detailType == "step") {
                        if (!this.isEmptyString(this.currStep)) {
                            this._service.addCakeDetail(this.cake._id, "step", this.currStep)
                                .subscribe(function (cake) { return _this.cake = cake; });
                            this.currStep = "";
                        }
                    }
                };
                CakeDetailsComponent.prototype.getCakeImage = function () {
                    this._service.getCakeImage(this.cake._id);
                    //.subscribe(
                    //    res => this.imgData = res
                    //);
                };
                CakeDetailsComponent.prototype.uploadCakeImage = function (event) {
                    //this._service.uploadCakeImage(this.cake._id)
                    //    .subscribe(
                    //        res => console.log(res)
                    //    );
                    this.fileUpload = event.target.value;
                    console.log(event.target.value + ' | ');
                };
                CakeDetailsComponent.prototype.deleteCake = function () {
                    var _this = this;
                    this._service.deleteCake(this.cake._id)
                        .subscribe(function (res) { return _this._router.navigate(["Home"]); });
                };
                CakeDetailsComponent.prototype.isEmptyString = function (str) {
                    return str == "" || str == null;
                };
                CakeDetailsComponent.prototype.gotoCakes = function () {
                    this._router.navigate(["Home"]);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', cake_1.Cake)
                ], CakeDetailsComponent.prototype, "cake", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], CakeDetailsComponent.prototype, "imgData", void 0);
                CakeDetailsComponent = __decorate([
                    core_1.Component({
                        selector: "cake-details",
                        templateUrl: "templates/cake-details.component.html"
                    }),
                    router_2.CanActivate(function () { return angular2_jwt_1.tokenNotExpired(); }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, cake_service_1.CakeService])
                ], CakeDetailsComponent);
                return CakeDetailsComponent;
            })();
            exports_1("CakeDetailsComponent", CakeDetailsComponent);
        }
    }
});
//# sourceMappingURL=cake-details.component.js.map