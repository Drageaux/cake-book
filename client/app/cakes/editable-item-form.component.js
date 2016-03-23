System.register(["angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var EditableItemForm;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            EditableItemForm = (function () {
                function EditableItemForm() {
                    this.editing = [];
                    this.onAdded = new core_1.EventEmitter();
                    this.onRemoved = new core_1.EventEmitter();
                    this.onSaved = new core_1.EventEmitter();
                }
                EditableItemForm.prototype.addItem = function (value) {
                    if (!this.isEmptyString(value)) {
                        this.onAdded.emit(value);
                        this.currItem = "";
                        this.editing.push(false);
                        console.log(this.editing);
                    }
                };
                EditableItemForm.prototype.removeItem = function (index) {
                    console.log(index);
                    this.onRemoved.emit(index);
                    this.editing.splice(index, 1);
                };
                /* Editing Ingredients and Steps */
                EditableItemForm.prototype.editItem = function (index) {
                    this.editing[index] = true;
                };
                EditableItemForm.prototype.saveEdit = function (index, value) {
                    //if (itemType == "ingr") {
                    //    this.ingrList[index]["value"] = value;
                    //    this.ingrList[index]["editing"] = false;
                    //}
                    this.onSaved.emit({ "index": index, "value": value });
                    this.cancelEdit(index);
                };
                EditableItemForm.prototype.cancelEdit = function (index) {
                    this.editing[index] = false;
                };
                EditableItemForm.prototype.isEditing = function (index) {
                    return this.editing[index];
                };
                EditableItemForm.prototype.isEmptyString = function (str) {
                    return str == "" || str == null;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], EditableItemForm.prototype, "listLabel", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], EditableItemForm.prototype, "itemList", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], EditableItemForm.prototype, "onAdded", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], EditableItemForm.prototype, "onRemoved", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], EditableItemForm.prototype, "onSaved", void 0);
                EditableItemForm = __decorate([
                    core_1.Component({
                        selector: "editable-item-list",
                        template: "\n            <form class=\"form-group\">\n                <label>{{listLabel}}</label><br>\n                <!-- Add Item -->\n                <div class=\"input-group\">\n                    <input type=\"text\" class=\"form-control\" placeholder=\"(optional)\"\n                           [(ngModel)]=\"currItem\">\n                    <span class=\"input-group-btn\">\n                        <button type=\"submit\" class=\"btn btn-primary\"\n                                [class.disabled]=\"isEmptyString(currItem)\"\n                                (click)=\"addItem(currItem)\">\n                            Add\n                        </button>\n                    </span>\n                </div>\n                <!-- Item List -->\n                <ul *ngIf=\"itemList.length>0\" class=\"list-group editable-item-list\">\n                    <li *ngFor=\"#item of itemList; #idx = index\" class=\"list-group-item\">\n                        <div>\n                            <!-- Item number -->\n                            <div class=\"number-label\"><span>{{idx+1}}</span></div>\n                            <!-- Item name -->\n                            <div class=\"list-group-item-name\" [class.edit-item]=\"isEditing(idx)\">\n                                <span [class.hidden]=\"isEditing(idx)\">\n                                    {{item}}\n                                </span>\n                                <input #editValue type=\"text\" class=\"form-control\"\n                                       [class.hidden]=\"!isEditing(idx)\"\n                                       [value]=\"item\" autofocus>\n                            </div>\n                            <!-- Item buttons -->\n                            <div class=\"edit-remove\" [class.hidden]=\"isEditing(idx)\">\n                                <button type=\"button\" class=\"btn edit-button\"\n                                        [class.hidden]=\"isEditing(idx)\"\n                                        (click)=\"editItem(idx)\">\n                                    <span class=\"glyphicon glyphicon-pencil\"></span>\n                                </button>\n                                <button type=\"button\" class=\"btn remove-button\"\n                                        [class.hidden]=\"isEditing(idx)\"\n                                        (click)=\"removeItem(idx)\">\n                                    <span class=\"glyphicon glyphicon-minus\"></span>\n                                </button>\n                            </div>\n                            <div class=\"save-cancel\" [class.hidden]=\"!isEditing(idx)\">\n                                <button type=\"submit\" class=\"btn btn-success save-button\"\n                                        (click)=\"saveEdit(idx, editValue.value)\">\n                                    <span class=\"glyphicon glyphicon-check\"></span></button>\n                                <button type=\"button\" class=\"btn btn-danger cancel-button\"\n                                        (click)=\"cancelEdit(idx)\">\n                                    <span class=\"glyphicon glyphicon-remove\"></span></button>\n                            </div>\n                        </div>\n                    </li>\n                </ul>\n            </form>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], EditableItemForm);
                return EditableItemForm;
            })();
            exports_1("EditableItemForm", EditableItemForm);
        }
    }
});
//# sourceMappingURL=editable-item-form.component.js.map