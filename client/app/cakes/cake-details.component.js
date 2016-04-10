System.register(["angular2/core", "angular2/router", "angular2-jwt", "./cake.service", "./editable-item-form.component"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, angular2_jwt_1, cake_service_1, editable_item_form_component_1;
    var CakeDetailsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (cake_service_1_1) {
                cake_service_1 = cake_service_1_1;
            },
            function (editable_item_form_component_1_1) {
                editable_item_form_component_1 = editable_item_form_component_1_1;
            }],
        execute: function() {
            CakeDetailsComponent = (function () {
                function CakeDetailsComponent(_router, _routeParams, _service) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._service = _service;
                    this.currDesc = { "value": "", "editing": false };
                    this.formIngr = false;
                    this.formStep = false;
                }
                CakeDetailsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = this._routeParams.get('id');
                    this._service.getCake(id)
                        .subscribe(function (cake) { return _this.cake = cake; }, function (error) { return _this._router.navigate(["Home"]); });
                    this.uploadCallBack = this.uploadImage.bind(this);
                };
                CakeDetailsComponent.prototype.addDetail = function (detailType, value) {
                    var _this = this;
                    if (detailType == "desc") {
                        this._service.addCakeDetail(this.cake._id, detailType, this.currDesc["value"]);
                    }
                    else if (detailType == "ingr" || detailType == "step") {
                        if (!this.isEmptyString(value)) {
                            this._service.addCakeDetail(this.cake._id, detailType, value)
                                .subscribe(function (cake) { return _this.cake = cake; });
                        }
                    }
                };
                CakeDetailsComponent.prototype.removeDetail = function (detailType, index) {
                    var _this = this;
                    this._service.removeCakeDetail(this.cake._id, detailType, index)
                        .subscribe(function (cake) { return _this.cake = cake; });
                };
                CakeDetailsComponent.prototype.editDetail = function (detailType, index) {
                    if (detailType == "desc") {
                        this.currDesc["editing"] = true;
                    }
                };
                CakeDetailsComponent.prototype.saveEdit = function (detailType, obj) {
                    var _this = this;
                    if (detailType == "desc") {
                        this.currDesc["editing"] = false;
                        this._service.addCakeDetail(this.cake._id, "desc", obj.value.replace(/\s+$/, ""))
                            .subscribe(function (cake) { return _this.cake = cake; });
                    }
                    else if (detailType == "ingr" || detailType == "step") {
                        this._service.updateCakeDetail(this.cake._id, detailType, obj.index, obj.value)
                            .subscribe(function (cake) { return _this.cake = cake; });
                    }
                };
                CakeDetailsComponent.prototype.cancelEdit = function (detailType, index) {
                    if (detailType == "desc") {
                        this.currDesc["editing"] = false;
                    }
                };
                CakeDetailsComponent.prototype.uploadImage = function (input, oldImage) {
                    var _this = this;
                    var fileType;
                    // check if is an image
                    var inputMatchArray = input.match("data:image/(.*);base64");
                    if (inputMatchArray) {
                        // get and filter for correct file type
                        fileType = inputMatchArray[1];
                        if (fileType.match(/(png|jpg|jpeg)/)) {
                            var parsedInput = input.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                            this._service.uploadCakeImage(this.cake._id, parsedInput, fileType)
                                .subscribe(function (cake) { return _this.cake = cake; }, function (err) { return _this.cake.croppedImage = oldImage; }, function () { return console.log(_this.cake); });
                        }
                        else {
                            this.openModal();
                            console.log("Bad Image Extension");
                            this.cake.croppedImage = oldImage;
                        }
                    }
                    else {
                        this.openModal();
                        console.log("Not An Image");
                        this.cake.croppedImage = oldImage;
                    }
                };
                CakeDetailsComponent.prototype.deleteCake = function () {
                    var _this = this;
                    this._service.deleteCake(this.cake._id)
                        .subscribe(function (res) { return _this._router.navigate(["Home"]); });
                };
                /********************
                 * Helper Functions *
                 ********************/
                CakeDetailsComponent.prototype.isEditing = function (itemType) {
                    if (itemType == "desc") {
                        return this.currDesc["editing"];
                    }
                };
                CakeDetailsComponent.prototype.openForm = function (itemType) {
                    if (itemType == "ingr") {
                        this.formIngr = true;
                    }
                    else if (itemType == "step") {
                        this.formStep = true;
                    }
                };
                CakeDetailsComponent.prototype.closeForm = function (itemType) {
                    if (itemType == "ingr") {
                        this.formIngr == false;
                    }
                    else if (itemType == "step") {
                        this.formStep == false;
                    }
                };
                CakeDetailsComponent.prototype.isEmptyString = function (str) {
                    return str == "" || str == null;
                };
                CakeDetailsComponent.prototype.readImage = function (event, callback) {
                    if (event.target.files[0]) {
                        var oldImage = this.cake.croppedImage;
                        this.cake.croppedImage = "http://res.cloudinary.com/hns6msnxn/image/upload/v1458335198/vt0zkfxtwhajsikca7hc.gif";
                        var FR = new FileReader();
                        FR.onload = function (e) {
                            callback(e.target.result, oldImage);
                        };
                        FR.readAsDataURL(event.target.files[0]);
                    }
                };
                CakeDetailsComponent.prototype.openModal = function () {
                    document.getElementById("modal-button").click();
                };
                CakeDetailsComponent.prototype.gotoCakes = function () {
                    this._router.navigate(["Home"]);
                };
                CakeDetailsComponent = __decorate([
                    core_1.Component({
                        selector: "cake-details",
                        templateUrl: "templates/cake-details.component.html",
                        directives: [editable_item_form_component_1.EditableItemForm]
                    }),
                    router_1.CanActivate(function () { return angular2_jwt_1.tokenNotExpired(); }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, cake_service_1.CakeService])
                ], CakeDetailsComponent);
                return CakeDetailsComponent;
            })();
            exports_1("CakeDetailsComponent", CakeDetailsComponent);
        }
    }
});
//# sourceMappingURL=cake-details.component.js.map