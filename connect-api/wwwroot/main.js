"use strict";
(self["webpackChunkconnect_extension_app"] = self["webpackChunkconnect_extension_app"] || []).push([["main"],{

/***/ 329:
/*!*******************************************************************!*\
  !*** ./src/app/components/user/profile/user-profile.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserProfileComponent: () => (/* binding */ UserProfileComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6884);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 6944);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3956);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../services/auth.service */ 5822);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 7400);







function UserProfileComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 3)(1, "div", 4)(2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "svg", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "path", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "h3", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Connectez-vous pour acc\u00E9der \u00E0 votre profil");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Vous devez \u00EAtre connect\u00E9 pour voir votre profil.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 10)(10, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, " Connexion ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
}
function UserProfileComponent_div_2_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "svg", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "circle", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, " Mis \u00E0 jour ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function UserProfileComponent_div_2_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UserProfileComponent_div_2_button_7_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.enableEditMode());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "svg", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "path", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, " Modifier ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function UserProfileComponent_div_2_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 48)(1, "div", 49)(2, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "svg", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "path", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 53)(6, "p", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.successMessage);
  }
}
function UserProfileComponent_div_2_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 55)(1, "div", 49)(2, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "svg", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "path", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 53)(6, "p", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.errorMessage);
  }
}
function UserProfileComponent_div_2_input_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "input", 59);
  }
}
function UserProfileComponent_div_2_span_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.currentUser.firstName || "Non renseign\u00E9");
  }
}
function UserProfileComponent_div_2_div_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Le pr\u00E9nom est requis ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function UserProfileComponent_div_2_input_37_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "input", 61);
  }
}
function UserProfileComponent_div_2_span_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.currentUser.lastName || "Non renseign\u00E9");
  }
}
function UserProfileComponent_div_2_div_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Le nom est requis ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function UserProfileComponent_div_2_input_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "input", 62);
  }
}
function UserProfileComponent_div_2_span_46_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.currentUser.email);
  }
}
function UserProfileComponent_div_2_div_47_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "L'email est requis");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function UserProfileComponent_div_2_div_47_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Format d'email invalide");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function UserProfileComponent_div_2_div_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, UserProfileComponent_div_2_div_47_span_1_Template, 2, 0, "span", 33)(2, UserProfileComponent_div_2_div_47_span_2_Template, 2, 0, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (tmp_2_0 = ctx_r2.profileForm.get("email")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["required"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (tmp_3_0 = ctx_r2.profileForm.get("email")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["email"]);
  }
}
function UserProfileComponent_div_2_span_57_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Actif");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function UserProfileComponent_div_2_span_58_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Inactif");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function UserProfileComponent_div_2_div_65_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "svg", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "circle", 70)(3, "path", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function UserProfileComponent_div_2_div_65_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 65)(1, "button", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UserProfileComponent_div_2_div_65_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.cancelEdit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Annuler ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, UserProfileComponent_div_2_div_65_span_4_Template, 4, 0, "span", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, " Enregistrer ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx_r2.profileForm.invalid || ctx_r2.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.isLoading);
  }
}
function UserProfileComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 12)(1, "div", 13)(2, "h3", 14)(3, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Mon Profil");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, UserProfileComponent_div_2_span_5_Template, 4, 0, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, UserProfileComponent_div_2_button_7_Template, 4, 0, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, UserProfileComponent_div_2_div_8_Template, 8, 1, "div", 19)(9, UserProfileComponent_div_2_div_9_Template, 8, 1, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 21)(11, "div", 22)(12, "h3", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Informations personnelles");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "p", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Vos informations de profil utilisateur.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 25)(17, "form", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function UserProfileComponent_div_2_Template_form_ngSubmit_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.onSubmit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "dl")(19, "div", 27)(20, "dt", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "Nom d'utilisateur");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "dd", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "div", 30)(25, "dt", 28)(26, "label", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, "Pr\u00E9nom");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "dd", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](29, UserProfileComponent_div_2_input_29_Template, 1, 0, "input", 32)(30, UserProfileComponent_div_2_span_30_Template, 2, 1, "span", 33)(31, UserProfileComponent_div_2_div_31_Template, 2, 0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "div", 27)(33, "dt", 28)(34, "label", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](35, "Nom");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](36, "dd", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](37, UserProfileComponent_div_2_input_37_Template, 1, 0, "input", 36)(38, UserProfileComponent_div_2_span_38_Template, 2, 1, "span", 33)(39, UserProfileComponent_div_2_div_39_Template, 2, 0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](40, "div", 30)(41, "dt", 28)(42, "label", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](43, "Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "dd", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](45, UserProfileComponent_div_2_input_45_Template, 1, 0, "input", 38)(46, UserProfileComponent_div_2_span_46_Template, 2, 1, "span", 33)(47, UserProfileComponent_div_2_div_47_Template, 3, 2, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](48, "div", 27)(49, "dt", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](50, "R\u00F4le");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](51, "dd", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](52);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](53, "div", 30)(54, "dt", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](55, "\u00C9tat du compte");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](56, "dd", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](57, UserProfileComponent_div_2_span_57_Template, 2, 0, "span", 39)(58, UserProfileComponent_div_2_span_58_Template, 2, 0, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](59, "div", 27)(60, "dt", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](61, "Derni\u00E8re connexion");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](62, "dd", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](63);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](64, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](65, UserProfileComponent_div_2_div_65_Template, 6, 2, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    let tmp_9_0;
    let tmp_12_0;
    let tmp_15_0;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.successMessage);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r2.isEditing);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.successMessage);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.errorMessage);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx_r2.profileForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.currentUser.username);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.isEditing);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r2.isEditing);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.isEditing && ((tmp_9_0 = ctx_r2.profileForm.get("firstName")) == null ? null : tmp_9_0.invalid) && ((tmp_9_0 = ctx_r2.profileForm.get("firstName")) == null ? null : tmp_9_0.touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.isEditing);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r2.isEditing);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.isEditing && ((tmp_12_0 = ctx_r2.profileForm.get("lastName")) == null ? null : tmp_12_0.invalid) && ((tmp_12_0 = ctx_r2.profileForm.get("lastName")) == null ? null : tmp_12_0.touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.isEditing);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r2.isEditing);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.isEditing && ((tmp_15_0 = ctx_r2.profileForm.get("email")) == null ? null : tmp_15_0.invalid) && ((tmp_15_0 = ctx_r2.profileForm.get("email")) == null ? null : tmp_15_0.touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r2.currentUser.role === "admin" ? "Administrateur" : ctx_r2.currentUser.role === "consultant" ? "Consultant" : ctx_r2.currentUser.role === "recruiter" ? "Recruteur" : ctx_r2.currentUser.role, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.currentUser.isActive);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r2.currentUser.isActive);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r2.currentUser.lastLogin ? _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](64, 20, ctx_r2.currentUser.lastLogin, "dd/MM/yyyy HH:mm") : "Jamais", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.isEditing);
  }
}
class UserProfileComponent {
  constructor(authService, router, fb) {
    this.authService = authService;
    this.router = router;
    this.fb = fb;
    this.currentUser = null;
    this.isEditing = false;
    this.isLoading = false;
    this.errorMessage = null;
    this.successMessage = null;
  }
  ngOnInit() {
    // Vérifier si l'utilisateur est connecté
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/login']);
      return;
    }
    // Récupérer l'utilisateur actuel
    this.currentUser = this.authService.currentUser;
    // Initialiser le formulaire avec les données actuelles
    this.initializeForm();
  }
  initializeForm() {
    if (!this.currentUser) return;
    this.profileForm = this.fb.group({
      firstName: [this.currentUser.firstName || '', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required]],
      lastName: [this.currentUser.lastName || '', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required]],
      email: [this.currentUser.email, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.email]]
      // D'autres champs pourront être ajoutés par la suite
    });
    // Désactiver le formulaire par défaut (mode lecture seule)
    this.profileForm.disable();
  }
  // Activer le mode édition
  enableEditMode() {
    this.isEditing = true;
    this.profileForm.enable();
  }
  // Annuler les modifications
  cancelEdit() {
    this.isEditing = false;
    this.initializeForm(); // Réinitialiser le formulaire avec les valeurs d'origine
    this.profileForm.disable();
    this.errorMessage = null;
    this.successMessage = null;
  }
  // Soumettre les modifications
  onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;
    // En environnement de développement, simuler un appel API
    setTimeout(() => {
      // Simuler une mise à jour réussie
      if (this.currentUser) {
        this.currentUser = {
          ...this.currentUser,
          firstName: this.profileForm.value.firstName,
          lastName: this.profileForm.value.lastName,
          email: this.profileForm.value.email
        };
      }
      this.isLoading = false;
      this.isEditing = false;
      this.profileForm.disable();
      this.successMessage = 'Profil mis à jour avec succès!';
    }, 1000);
    // Dans un environnement réel, nous enverrions les données à l'API
    /*
    this.userService.updateProfile(this.profileForm.value).subscribe({
      next: (updatedUser) => {
        this.currentUser = updatedUser;
        this.isLoading = false;
        this.isEditing = false;
        this.profileForm.disable();
        this.successMessage = 'Profil mis à jour avec succès!';
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Une erreur est survenue lors de la mise à jour du profil.';
        console.error('Erreur lors de la mise à jour du profil:', error);
      }
    });
    */
  }
  static {
    this.ɵfac = function UserProfileComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || UserProfileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: UserProfileComponent,
      selectors: [["app-user-profile"]],
      decls: 3,
      vars: 2,
      consts: [[1, "flex", "flex-col", "h-full", "w-full", "overflow-y-auto", "p-6"], ["class", "flex justify-center items-center h-full", 4, "ngIf"], ["class", "max-w-3xl mx-auto w-full", 4, "ngIf"], [1, "flex", "justify-center", "items-center", "h-full"], [1, "text-center"], [1, "text-gray-500", "mb-4"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", "xmlns", "http://www.w3.org/2000/svg", 1, "w-16", "h-16", "mx-auto"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"], [1, "text-lg", "font-medium", "text-gray-900"], [1, "mt-1", "text-sm", "text-gray-500"], [1, "mt-6"], ["routerLink", "/login", 1, "inline-flex", "items-center", "px-4", "py-2", "border", "border-transparent", "shadow-sm", "text-sm", "font-medium", "rounded-md", "text-white", "bg-indigo-600", "hover:bg-indigo-700", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-indigo-500"], [1, "max-w-3xl", "mx-auto", "w-full"], [1, "pb-5", "border-b", "border-gray-200", "sm:flex", "sm:items-center", "sm:justify-between"], [1, "text-lg", "leading-6", "font-medium", "text-gray-900", "flex", "items-center"], [1, "mr-2"], ["class", "ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800", 4, "ngIf"], [1, "mt-3", "sm:mt-0", "sm:ml-4"], ["type", "button", "class", "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", 3, "click", 4, "ngIf"], ["class", "mt-4 p-4 rounded-md bg-green-50", 4, "ngIf"], ["class", "mt-4 p-4 rounded-md bg-red-50", 4, "ngIf"], [1, "bg-white", "shadow", "overflow-hidden", "sm:rounded-lg", "mt-5"], [1, "px-4", "py-5", "sm:px-6", "bg-gray-50"], [1, "text-base", "font-semibold", "text-gray-900"], [1, "mt-1", "max-w-2xl", "text-sm", "text-gray-500"], [1, "border-t", "border-gray-200"], [3, "ngSubmit", "formGroup"], [1, "bg-gray-50", "px-4", "py-5", "sm:grid", "sm:grid-cols-3", "sm:gap-4", "sm:px-6"], [1, "text-sm", "font-medium", "text-gray-500"], [1, "mt-1", "text-sm", "text-gray-900", "sm:mt-0", "sm:col-span-2"], [1, "bg-white", "px-4", "py-5", "sm:grid", "sm:grid-cols-3", "sm:gap-4", "sm:px-6"], ["for", "firstName"], ["id", "firstName", "type", "text", "formControlName", "firstName", "class", "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md", 4, "ngIf"], [4, "ngIf"], ["class", "mt-1 text-sm text-red-600", 4, "ngIf"], ["for", "lastName"], ["id", "lastName", "type", "text", "formControlName", "lastName", "class", "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md", 4, "ngIf"], ["for", "email"], ["id", "email", "type", "email", "formControlName", "email", "class", "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md", 4, "ngIf"], ["class", "px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800", 4, "ngIf"], ["class", "px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800", 4, "ngIf"], ["class", "px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-200", 4, "ngIf"], [1, "ml-3", "inline-flex", "items-center", "px-2.5", "py-0.5", "rounded-full", "text-xs", "font-medium", "bg-green-100", "text-green-800"], ["fill", "currentColor", "viewBox", "0 0 8 8", 1, "-ml-0.5", "mr-1.5", "h-2", "w-2", "text-green-400"], ["cx", "4", "cy", "4", "r", "3"], ["type", "button", 1, "inline-flex", "items-center", "px-4", "py-2", "border", "border-gray-300", "rounded-md", "shadow-sm", "text-sm", "font-medium", "text-gray-700", "bg-white", "hover:bg-gray-50", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-indigo-500", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", "xmlns", "http://www.w3.org/2000/svg", 1, "-ml-1", "mr-2", "h-5", "w-5", "text-gray-500"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"], [1, "mt-4", "p-4", "rounded-md", "bg-green-50"], [1, "flex"], [1, "flex-shrink-0"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "h-5", "w-5", "text-green-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "ml-3"], [1, "text-sm", "font-medium", "text-green-800"], [1, "mt-4", "p-4", "rounded-md", "bg-red-50"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "h-5", "w-5", "text-red-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "text-sm", "font-medium", "text-red-800"], ["id", "firstName", "type", "text", "formControlName", "firstName", 1, "shadow-sm", "focus:ring-indigo-500", "focus:border-indigo-500", "block", "w-full", "sm:text-sm", "border-gray-300", "rounded-md"], [1, "mt-1", "text-sm", "text-red-600"], ["id", "lastName", "type", "text", "formControlName", "lastName", 1, "shadow-sm", "focus:ring-indigo-500", "focus:border-indigo-500", "block", "w-full", "sm:text-sm", "border-gray-300", "rounded-md"], ["id", "email", "type", "email", "formControlName", "email", 1, "shadow-sm", "focus:ring-indigo-500", "focus:border-indigo-500", "block", "w-full", "sm:text-sm", "border-gray-300", "rounded-md"], [1, "px-2", "py-1", "text-xs", "font-medium", "rounded-full", "bg-green-100", "text-green-800"], [1, "px-2", "py-1", "text-xs", "font-medium", "rounded-full", "bg-red-100", "text-red-800"], [1, "px-4", "py-3", "bg-gray-50", "text-right", "sm:px-6", "border-t", "border-gray-200"], ["type", "button", 1, "inline-flex", "justify-center", "py-2", "px-4", "border", "border-gray-300", "shadow-sm", "text-sm", "font-medium", "rounded-md", "text-gray-700", "bg-white", "hover:bg-gray-50", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-indigo-500", "mr-3", 3, "click"], ["type", "submit", 1, "inline-flex", "justify-center", "py-2", "px-4", "border", "border-transparent", "shadow-sm", "text-sm", "font-medium", "rounded-md", "text-white", "bg-indigo-600", "hover:bg-indigo-700", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-indigo-500", 3, "disabled"], ["class", "mr-2", 4, "ngIf"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "-ml-1", "mr-2", "h-4", "w-4", "text-white"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"]],
      template: function UserProfileComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, UserProfileComponent_div_1_Template, 12, 0, "div", 1)(2, UserProfileComponent_div_2_Template, 66, 23, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.currentUser);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.currentUser);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.DatePipe, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName],
      styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXItcHJvZmlsZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtEQUErRCIsImZpbGUiOiJ1c2VyLXByb2ZpbGUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFN0eWxlcyBzcMOpY2lmaXF1ZXMgcG91ciBsZSBjb21wb3NhbnQgZGUgcHJvZmlsIHV0aWxpc2F0ZXVyICovIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy91c2VyL3Byb2ZpbGUvdXNlci1wcm9maWxlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0RBQStEO0FBQy9ELGdWQUFnViIsInNvdXJjZXNDb250ZW50IjpbIi8qIFN0eWxlcyBzcMODwqljaWZpcXVlcyBwb3VyIGxlIGNvbXBvc2FudCBkZSBwcm9maWwgdXRpbGlzYXRldXIgKi8iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 831:
/*!*************************************************************************!*\
  !*** ./src/app/components/consultant-list/consultant-list.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConsultantListComponent: () => (/* binding */ ConsultantListComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6884);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 6944);
/* harmony import */ var _consultant_card_consultant_card_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../consultant-card/consultant-card.component */ 9215);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3956);
/* harmony import */ var _services_consultant_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/consultant.service */ 5937);






const _c0 = ["consultantsList"];
const _c1 = ["consultantsListMobile"];
function ConsultantListComponent_div_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ConsultantListComponent_div_7_div_1_Template_div_click_0_listener() {
      const option_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.changeSortOrder(option_r3.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r3 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("text-blue-500", ctx_r3.selectedSortOrder === option_r3.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", option_r3.label, " ");
  }
}
function ConsultantListComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ConsultantListComponent_div_7_div_1_Template, 2, 3, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.sortOptions);
  }
}
function ConsultantListComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function ConsultantListComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 25)(1, "p", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ConsultantListComponent_div_11_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.loadInitialConsultants());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "R\u00E9essayer");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.errorMessage);
  }
}
function ConsultantListComponent_div_12_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 30)(1, "app-consultant-card", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("toggleExpansion", function ConsultantListComponent_div_12_div_1_Template_app_consultant_card_toggleExpansion_1_listener($event) {
      const consultant_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.handleToggleExpansion($event, consultant_r7.id));
    })("toggleMessageExpansion", function ConsultantListComponent_div_12_div_1_Template_app_consultant_card_toggleMessageExpansion_1_listener($event) {
      const consultant_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.handleToggleMessageExpansion($event, consultant_r7.id));
    })("toggleDetailsExpansion", function ConsultantListComponent_div_12_div_1_Template_app_consultant_card_toggleDetailsExpansion_1_listener($event) {
      const consultant_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.handleToggleDetailsExpansion($event, consultant_r7.id));
    })("toggleDropdown", function ConsultantListComponent_div_12_div_1_Template_app_consultant_card_toggleDropdown_1_listener($event) {
      const consultant_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.handleToggleDropdown($event, consultant_r7.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const consultant_r7 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("consultant", consultant_r7)("expanded", ctx_r3.isExpanded(consultant_r7.id, ""))("messageExpanded", ctx_r3.isExpanded(consultant_r7.id, "-message"))("detailsExpanded", ctx_r3.isDetailsExpanded(consultant_r7.id))("dropdownOpen", ctx_r3.isDropdownOpen(consultant_r7.id));
  }
}
function ConsultantListComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ConsultantListComponent_div_12_div_1_Template, 2, 5, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.filteredConsultants);
  }
}
function ConsultantListComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 32)(1, "p", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Aucun consultant trouv\u00E9");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function ConsultantListComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function ConsultantListComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function ConsultantListComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 37)(1, "p", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ConsultantListComponent_div_18_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r8);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.loadInitialConsultants());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "R\u00E9essayer");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.errorMessage);
  }
}
function ConsultantListComponent_div_19_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 42)(1, "app-consultant-card", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("toggleExpansion", function ConsultantListComponent_div_19_div_1_Template_app_consultant_card_toggleExpansion_1_listener($event) {
      const consultant_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r9).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.handleToggleExpansion($event, consultant_r10.id));
    })("toggleMessageExpansion", function ConsultantListComponent_div_19_div_1_Template_app_consultant_card_toggleMessageExpansion_1_listener($event) {
      const consultant_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r9).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.handleToggleMessageExpansion($event, consultant_r10.id));
    })("toggleDetailsExpansion", function ConsultantListComponent_div_19_div_1_Template_app_consultant_card_toggleDetailsExpansion_1_listener($event) {
      const consultant_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r9).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.handleToggleDetailsExpansion($event, consultant_r10.id));
    })("toggleDropdown", function ConsultantListComponent_div_19_div_1_Template_app_consultant_card_toggleDropdown_1_listener($event) {
      const consultant_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r9).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.handleToggleDropdown($event, consultant_r10.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const consultant_r10 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("consultant", consultant_r10)("expanded", ctx_r3.isExpanded(consultant_r10.id, ""))("messageExpanded", ctx_r3.isExpanded(consultant_r10.id, "-message"))("detailsExpanded", ctx_r3.isDetailsExpanded(consultant_r10.id))("dropdownOpen", ctx_r3.isDropdownOpen(consultant_r10.id));
  }
}
function ConsultantListComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ConsultantListComponent_div_19_div_1_Template, 2, 5, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.filteredConsultants);
  }
}
function ConsultantListComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 43)(1, "p", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Aucun consultant trouv\u00E9");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function ConsultantListComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
class ConsultantListComponent {
  // Événements de sortie - nous n'en avons plus besoin car le composant est autonome
  constructor(consultantService) {
    this.consultantService = consultantService;
    // Données principales
    this.allConsultants = [];
    this.consultants = [];
    this.filteredConsultants = [];
    // Paramètre global pour contrôler l'affichage des détails
    this.showDetailsDefault = true; // Contrôle si les détails sont affichés par défaut
    // Paramètres de pagination
    this.currentPage = 1;
    this.pageSize = 10;
    this.isLoadingMore = false;
    this.hasMoreData = true;
    this.isLoading = true;
    this.errorMessage = null;
    // Filtres
    this.searchText = '';
    this.selectedSkills = [];
    this.selectedAvailability = 'all';
    this.selectedExperience = 'all';
    this.selectedLocation = 'all';
    this.selectedSortOrder = 'relevance'; // Tri par défaut
    // Options disponibles pour les filtres
    this.availableSkills = [];
    this.availableLocations = [];
    // Options de tri
    this.sortOptions = [{
      value: 'relevance',
      label: 'Pertinence'
    }, {
      value: 'last_updated',
      label: 'Dernière mise à jour'
    }, {
      value: 'availability',
      label: 'Disponibilité'
    }];
    // État du dropdown de tri
    this.sortDropdownOpen = false;
    this.experienceOptions = [{
      value: 'less_than_3',
      label: 'Moins de 3 ans'
    }, {
      value: 'between_3_and_10',
      label: 'Entre 3 et 10 ans'
    }, {
      value: 'more_than_10',
      label: 'Plus de 10 ans'
    }];
    this.availabilityOptions = [{
      value: '0',
      label: 'Disponible maintenant'
    }, {
      value: '1',
      label: 'Disponible prochainement'
    }, {
      value: '2',
      label: 'Non disponible'
    }];
    // État des UI
    this.moreFiltersOpen = false;
    this.skillsDropdownOpen = false;
    this.dropdownOpen = {};
    this.expandedMessages = {};
    this.expandedDetails = {}; // Pour contrôler l'affichage des détails
    this.configDropdownOpen = false;
  }
  ngOnInit() {
    // Charger les données initiales
    this.loadInitialConsultants();
    // Charger tous les consultants pour extraire les filtres (en parallèle)
    this.loadAllConsultantsForFiltering();
    // Ajouter un écouteur de clic global pour fermer les dropdowns
    this.documentClickListener = () => {
      Object.keys(this.dropdownOpen).forEach(key => {
        this.dropdownOpen[key] = false;
      });
      this.skillsDropdownOpen = false;
      this.configDropdownOpen = false;
      this.sortDropdownOpen = false;
    };
    document.addEventListener('click', this.documentClickListener);
    // Appliquer la valeur du paramètre global showDetailsDefault
    setTimeout(() => {
      this.consultantService.getConsultants().subscribe(consultants => {
        consultants.forEach(consultant => {
          this.expandedMessages[consultant.id] = this.showDetailsDefault;
        });
      });
    }, 500);
    // Écouter les événements de recherche et filtrage provenant de l'UI LinkedIn-style
    window.addEventListener('fastconnect-search-updated', this.handleSearchUpdate.bind(this));
    window.addEventListener('fastconnect-filters-updated', this.handleFiltersUpdate.bind(this));
  }
  /**
   * Gère les mises à jour de recherche provenant de la barre de recherche principale
   */
  handleSearchUpdate() {
    try {
      const searchParamsStr = localStorage.getItem('fastconnect-search-params');
      if (searchParamsStr) {
        const searchParams = JSON.parse(searchParamsStr);
        this.searchText = searchParams.searchText || '';
        // Appliquer les filtres avec la nouvelle valeur de recherche
        this.applyFilters();
      }
    } catch (error) {
      console.error('Erreur lors de la gestion des paramètres de recherche:', error);
    }
  }
  /**
   * Gère les mises à jour des filtres avancés
   */
  handleFiltersUpdate() {
    try {
      const filterParamsStr = localStorage.getItem('fastconnect-filter-params');
      if (filterParamsStr) {
        const filterParams = JSON.parse(filterParamsStr);
        this.searchText = filterParams.searchText || '';
        this.selectedExperience = filterParams.selectedExperience || 'all';
        this.selectedAvailability = filterParams.selectedAvailability || 'all';
        this.selectedLocation = filterParams.selectedLocation || 'all';
        this.selectedSkills = filterParams.selectedSkills || []; // Récupérer les compétences sélectionnées
        // Appliquer les filtres avec les nouvelles valeurs
        this.applyFilters();
      }
    } catch (error) {
      console.error('Erreur lors de la gestion des paramètres de filtrage:', error);
    }
  }
  ngOnDestroy() {
    // Nettoyage des écouteurs d'événements
    if (this.documentClickListener) {
      document.removeEventListener('click', this.documentClickListener);
    }
    // Supprimer les écouteurs d'événements personnalisés
    window.removeEventListener('fastconnect-search-updated', this.handleSearchUpdate.bind(this));
    window.removeEventListener('fastconnect-filters-updated', this.handleFiltersUpdate.bind(this));
  }
  /**
   * Écouteur d'événement de défilement pour l'infinite scroll
   * Cette méthode est appelée via (scroll) sur le conteneur défilant
   */
  onScroll(event) {
    let element = null;
    // Déterminer quel conteneur est actif selon la taille d'écran
    if (this.consultantsList && window.innerWidth >= 768) {
      element = this.consultantsList.nativeElement;
    } else if (this.consultantsListMobile && window.innerWidth < 768) {
      element = this.consultantsListMobile.nativeElement;
    }
    if (!element) return;
    const scrollPosition = element.scrollTop + element.clientHeight;
    // Si nous avons atteint le bas du conteneur (avec une marge de 100px)
    // et que nous ne sommes pas déjà en train de charger plus de données
    // et qu'il y a potentiellement plus de données à charger
    if (scrollPosition >= element.scrollHeight - 100 && !this.isLoadingMore && this.hasMoreData) {
      this.loadMoreConsultants();
    }
  }
  /**
   * Charge les premières données des consultants
   */
  loadInitialConsultants() {
    console.log('[ConsultantListComponent] Démarrage du chargement des consultants initiaux');
    this.isLoading = true;
    this.errorMessage = null;
    this.currentPage = 1;
    this.consultantService.getPagedConsultants(this.currentPage, this.pageSize).subscribe({
      next: data => {
        console.log(`[ConsultantListComponent] Consultants initiaux reçus: ${data.length} consultants`);
        this.consultants = data;
        // Initialiser les messages comme étant affichés par défaut
        this.consultants.forEach(consultant => {
          // Initialiser le message principal
          this.expandedMessages[consultant.id] = this.showDetailsDefault;
          // Initialiser le message détaillé
          this.expandedMessages[consultant.id + '-message'] = this.showDetailsDefault;
        });
        console.log('[ConsultantListComponent] Application des filtres');
        this.applyFilters();
        console.log(`[ConsultantListComponent] Après filtrage: ${this.filteredConsultants.length} consultants affichés`);
        this.isLoading = false;
      },
      error: error => {
        console.error('[ConsultantListComponent] Erreur lors du chargement des consultants:', error);
        this.errorMessage = 'erreur_chargement';
        this.isLoading = false;
      }
    });
  }
  /**
   * Charge plus de consultants lorsque l'utilisateur fait défiler la page
   */
  loadMoreConsultants() {
    if (this.isLoadingMore || !this.hasMoreData) return;
    this.isLoadingMore = true;
    console.log("Démarrage du chargement de la page suivante");
    this.currentPage++;
    console.log(`Chargement de la page ${this.currentPage} avec ${this.pageSize} éléments par page`);
    this.consultantService.getPagedConsultants(this.currentPage, this.pageSize).subscribe(newData => {
      console.log(`Reçu ${newData.length} consultants de plus`);
      if (newData.length === 0) {
        this.hasMoreData = false;
        this.isLoadingMore = false;
        console.log("hasMoreData défini à false");
        return;
      }
      // Initialiser les messages comme étant affichés par défaut pour les nouveaux consultants
      newData.forEach(consultant => {
        // Initialiser le message principal
        this.expandedMessages[consultant.id] = this.showDetailsDefault;
        // Initialiser le message détaillé
        this.expandedMessages[consultant.id + '-message'] = this.showDetailsDefault;
      });
      // Ajouter les nouvelles données aux consultants existants
      this.consultants = [...this.consultants, ...newData];
      // Filtrer les nouvelles données en fonction des filtres actuels
      this.applyFilters();
      this.isLoadingMore = false;
      // Vérifier s'il y a plus de données à charger
      this.hasMoreData = newData.length >= this.pageSize;
      console.log(`hasMoreData défini à ${this.hasMoreData}`);
    }, error => {
      console.error('Error fetching more consultants:', error);
      this.isLoadingMore = false;
      this.errorMessage = 'erreur_chargement';
    });
  }
  /**
   * Charge tous les consultants pour pouvoir extraire toutes les compétences disponibles pour le filtrage
   */
  loadAllConsultantsForFiltering() {
    this.consultantService.getConsultants().subscribe(data => {
      this.allConsultants = data;
      this.extractAvailableSkills();
      this.extractAvailableLocations();
    }, error => {
      console.error('Error fetching all consultants for filtering:', error);
    });
  }
  /**
   * Extract unique skills from all consultants for filtering
   */
  extractAvailableSkills() {
    const skillsSet = new Set();
    this.allConsultants.forEach(consultant => {
      consultant.skills.forEach(skill => {
        skillsSet.add(skill);
      });
    });
    this.availableSkills = Array.from(skillsSet).sort();
  }
  /**
   * Extract unique locations from all consultants for filtering
   */
  extractAvailableLocations() {
    const locationsSet = new Set();
    this.allConsultants.forEach(consultant => {
      if (consultant.location) {
        // Split locations if they are comma-separated
        const locations = consultant.location.split(',').map(loc => loc.trim());
        locations.forEach(location => {
          locationsSet.add(location);
        });
      }
    });
    this.availableLocations = Array.from(locationsSet).sort();
  }
  /**
   * Filter consultants based on current search/filter parameters
   */
  applyFilters() {
    if (!this.consultants.length) {
      this.filteredConsultants = [];
      return;
    }
    this.filteredConsultants = this.consultantService.filterConsultants(this.consultants, this.searchText, this.selectedSkills, this.selectedAvailability, this.selectedExperience, this.selectedLocation);
    console.log(`Après filtrage, taille totale de la liste: ${this.filteredConsultants.length}`);
    // Appliquer le tri si nécessaire (sauf pour 'relevance' qui est l'ordre par défaut)
    if (this.selectedSortOrder !== 'relevance') {
      this.applySorting();
    }
  }
  // Méthodes pour les filtres
  onSearchChange() {
    this.applyFilters();
  }
  onExperienceChange() {
    this.applyFilters();
  }
  onAvailabilityChange() {
    this.applyFilters();
  }
  onLocationChange() {
    this.applyFilters();
  }
  toggleSkillFilter(skill) {
    const index = this.selectedSkills.indexOf(skill);
    if (index === -1) {
      // Si la compétence n'est pas dans la liste, l'ajouter
      this.selectedSkills.push(skill);
    } else {
      // Si la compétence est déjà dans la liste, la retirer
      this.selectedSkills.splice(index, 1);
    }
    this.applyFilters();
  }
  onToggleMoreFilters(event) {
    event.stopPropagation();
    this.moreFiltersOpen = !this.moreFiltersOpen;
  }
  onToggleSkillsDropdown(event) {
    event.stopPropagation();
    this.skillsDropdownOpen = !this.skillsDropdownOpen;
  }
  // Méthodes d'action sur les consultants
  openLinkedIn(url) {
    // Si nous sommes dans une extension Chrome, utiliser l'API chrome.tabs
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({
        url
      });
    } else {
      // Sinon, ouvrir dans un nouvel onglet
      window.open(url, '_blank');
    }
  }
  showPhone(phone) {
    if (phone) {
      // Pour un numéro de téléphone, nous pourrions ouvrir un lien tel: ou afficher une alerte
      alert(`Téléphone: ${phone}`);
    } else {
      alert('Numéro de téléphone non disponible');
    }
  }
  sendEmail(email) {
    if (email) {
      // Ouvrir le client de messagerie par défaut
      window.location.href = `mailto:${email}`;
    } else {
      alert('Adresse email non disponible');
    }
  }
  // Méthodes pour les dropdowns et expansions
  toggleDropdown(id, event) {
    if (event.event && event.event.stopPropagation) {
      // Si c'est un objet avec un event de notre composant
      event.event.stopPropagation();
    } else if (event && event.stopPropagation) {
      // Si c'est un MouseEvent
      event.stopPropagation();
    }
    // Fermer tous les autres dropdowns
    Object.keys(this.dropdownOpen).forEach(key => {
      if (key !== id) {
        this.dropdownOpen[key] = false;
      }
    });
    // Basculer l'état du dropdown actuel
    this.dropdownOpen[id] = !this.dropdownOpen[id];
  }
  toggleMessageExpansion(id, event) {
    if (event.event && event.event.stopPropagation) {
      // Si c'est un objet avec un event de notre composant
      event.event.stopPropagation();
    } else if (event && event.stopPropagation) {
      // Si c'est un MouseEvent
      event.stopPropagation();
    }
    this.expandedMessages[id] = !this.expandedMessages[id];
    console.log("Message expansion toggled for ID:", id, "New state:", this.expandedMessages[id]);
  }
  toggleExpandMessage(id, event) {
    if (event.expanded !== undefined) {
      // Si c'est un objet avec expanded, c'est un événement de notre composant
      this.expandedMessages[id + '-message'] = event.expanded;
    } else if (event && event.stopPropagation) {
      // Si c'est un MouseEvent
      event.stopPropagation();
      this.expandedMessages[id + '-message'] = !this.expandedMessages[id + '-message'];
    }
  }
  toggleDetailsExpansion(id, event) {
    if (event.event && event.event.stopPropagation) {
      // Si c'est un objet avec un event de notre composant
      event.event.stopPropagation();
    } else if (event && event.stopPropagation) {
      // Si c'est un MouseEvent
      event.stopPropagation();
    }
    this.expandedDetails[id] = !this.expandedDetails[id];
    console.log("Details expansion toggled for ID:", id, "New state:", this.expandedDetails[id]);
  }
  // Méthodes utilitaires
  formatMessage(message) {
    return message.replace(/#(\w+)/g, '<span class="text-blue-600 text-xs font-medium hover:text-blue-800 transition-colors duration-300">#$1</span>');
  }
  isMessageLong(message) {
    return message.length > 150;
  }
  getSeniorityBars(experience) {
    if (experience === 'less_than_3') return 1;
    if (experience === 'between_3_and_10') return 2;
    return 3;
  }
  /**
   * Ouvre ou ferme le dropdown de tri
   * @param event Événement de souris
   */
  toggleSortDropdown(event) {
    event.stopPropagation();
    this.sortDropdownOpen = !this.sortDropdownOpen;
  }
  /**
   * Change l'ordre de tri des consultants
   * @param sortOrder Nouvel ordre de tri
   */
  changeSortOrder(sortOrder) {
    if (this.selectedSortOrder === sortOrder) return;
    this.selectedSortOrder = sortOrder;
    this.applySorting();
    this.sortDropdownOpen = false;
  }
  /**
   * Applique le tri aux consultants filtrés
   */
  applySorting() {
    if (!this.filteredConsultants.length) return;
    switch (this.selectedSortOrder) {
      case 'relevance':
        // Le tri par pertinence est l'ordre par défaut (aucun tri particulier)
        // On réapplique simplement les filtres pour réinitialiser l'ordre
        this.applyFilters();
        break;
      case 'last_updated':
        // Comme nous n'avons pas de champ updatedAt, nous utilisons l'identifiant
        // qui est généralement incrémental et peut servir de proxy pour la date de création/mise à jour
        this.filteredConsultants.sort((a, b) => {
          // Comparer par ID (supposant que les ID plus élevés sont plus récents)
          // Filtrage des caractères non numériques si l'ID contient des lettres
          const idA = parseInt(a.id.replace(/\D/g, ''), 10) || 0;
          const idB = parseInt(b.id.replace(/\D/g, ''), 10) || 0;
          return idB - idA; // Ordre décroissant
        });
        break;
      case 'availability':
        // Trier par disponibilité (d'abord les consultants disponibles immédiatement)
        this.filteredConsultants.sort((a, b) => {
          // availability est déjà un nombre selon le modèle
          return a.availability - b.availability;
        });
        break;
    }
  }
  closeDropdowns() {
    Object.keys(this.dropdownOpen).forEach(id => {
      this.dropdownOpen[id] = false;
    });
    this.sortDropdownOpen = false;
  }
  /**
   * Retourne le libellé de l'option de tri actuellement sélectionnée
   * @returns Le libellé de l'option de tri
   */
  getSortLabel() {
    const option = this.sortOptions.find(opt => opt.value === this.selectedSortOrder);
    return option ? option.label : 'Pertinence';
  }
  /**
   * Vérifie si un consultant a sa carte de message étendue
   * @param id Identifiant du consultant
   * @param suffix Suffixe à ajouter à l'identifiant ('-message' ou '')
   * @returns true si le message est étendu
   */
  isExpanded(id, suffix) {
    return !!this.expandedMessages[id + suffix];
  }
  /**
   * Vérifie si les détails d'un consultant sont étendus
   * @param id Identifiant du consultant
   * @returns true si les détails sont étendus
   */
  isDetailsExpanded(id) {
    return !!this.expandedDetails[id];
  }
  /**
   * Vérifie si le dropdown d'un consultant est ouvert
   * @param id Identifiant du consultant
   * @returns true si le dropdown est ouvert
   */
  isDropdownOpen(id) {
    return !!this.dropdownOpen[id];
  }
  /**
   * Gère l'expansion du message d'un consultant
   * @param event Événement émis par le composant
   * @param id Identifiant du consultant
   */
  handleToggleExpansion(event, id) {
    if (event.expanded !== undefined) {
      this.expandedMessages[id + '-message'] = event.expanded;
    } else if (event && event.stopPropagation) {
      event.stopPropagation();
      this.expandedMessages[id + '-message'] = !this.expandedMessages[id + '-message'];
    }
  }
  /**
   * Gère l'expansion du message principal d'un consultant
   * @param event Événement émis par le composant
   * @param id Identifiant du consultant
   */
  handleToggleMessageExpansion(event, id) {
    if (event.event && event.event.stopPropagation) {
      event.event.stopPropagation();
    } else if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    this.expandedMessages[id] = !this.expandedMessages[id];
  }
  /**
   * Gère l'expansion des détails d'un consultant
   * @param event Événement émis par le composant
   * @param id Identifiant du consultant
   */
  handleToggleDetailsExpansion(event, id) {
    if (event.event && event.event.stopPropagation) {
      event.event.stopPropagation();
    } else if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    this.expandedDetails[id] = !this.expandedDetails[id];
  }
  /**
   * Gère l'ouverture/fermeture du dropdown d'un consultant
   * @param event Événement émis par le composant
   * @param id Identifiant du consultant
   */
  handleToggleDropdown(event, id) {
    if (event.event && event.event.stopPropagation) {
      event.event.stopPropagation();
    } else if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    // Fermer tous les autres dropdowns
    Object.keys(this.dropdownOpen).forEach(key => {
      if (key !== id) {
        this.dropdownOpen[key] = false;
      }
    });
    // Basculer l'état du dropdown actuel
    this.dropdownOpen[id] = !this.dropdownOpen[id];
  }
  static {
    this.ɵfac = function ConsultantListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ConsultantListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_consultant_service__WEBPACK_IMPORTED_MODULE_1__.ConsultantService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: ConsultantListComponent,
      selectors: [["app-consultant-list"]],
      viewQuery: function ConsultantListComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c1, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.consultantsList = _t.first);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.consultantsListMobile = _t.first);
        }
      },
      hostBindings: function ConsultantListComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ConsultantListComponent_click_HostBindingHandler() {
            return ctx.closeDropdowns();
          }, false, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresolveDocument"]);
        }
      },
      decls: 22,
      vars: 12,
      consts: [["consultantsList", ""], ["consultantsListMobile", ""], [1, "flex", "justify-between", "items-center", "mx-4", "my-3"], [1, "relative"], [1, "flex", "items-center", "text-sm", "text-gray-600", "hover:text-blue-500", "focus:outline-none", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", "xmlns", "http://www.w3.org/2000/svg", 1, "w-4", "h-4", "ml-1"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 9l-7 7-7-7"], ["class", "absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg p-2", 4, "ngIf"], [1, "flex-1", "overflow-y-auto", "p-4", "h-full", "hidden", "md:block", 2, "min-height", "70vh", "max-height", "calc(100vh - 150px)", 3, "scroll"], ["class", "flex justify-center items-center p-10", 4, "ngIf"], ["class", "text-center p-6 bg-red-50 rounded-lg", 4, "ngIf"], ["class", "space-y-4", 4, "ngIf"], ["class", "text-center p-6 bg-gray-50 rounded-lg", 4, "ngIf"], ["class", "flex justify-center items-center py-4", 4, "ngIf"], [1, "flex-1", "overflow-y-auto", "p-2", "h-full", "block", "md:hidden", 2, "min-height", "70vh", "max-height", "calc(100vh - 120px)", "-webkit-overflow-scrolling", "touch", 3, "scroll"], ["class", "flex justify-center items-center p-6", 4, "ngIf"], ["class", "text-center p-4 bg-red-50 rounded-lg", 4, "ngIf"], ["class", "space-y-3", 4, "ngIf"], ["class", "text-center p-4 bg-gray-50 rounded-lg", 4, "ngIf"], ["class", "flex justify-center items-center py-3", 4, "ngIf"], [1, "absolute", "z-10", "mt-2", "w-48", "bg-white", "rounded-md", "shadow-lg", "p-2"], ["class", "px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-gray-100", 3, "text-blue-500", "click", 4, "ngFor", "ngForOf"], [1, "px-3", "py-2", "text-sm", "rounded-md", "cursor-pointer", "hover:bg-gray-100", 3, "click"], [1, "flex", "justify-center", "items-center", "p-10"], [1, "animate-spin", "h-10", "w-10", "border-4", "border-blue-500", "border-t-transparent", "rounded-full"], [1, "text-center", "p-6", "bg-red-50", "rounded-lg"], [1, "text-red-500"], [1, "mt-2", "px-4", "py-2", "bg-blue-500", "text-white", "rounded", 3, "click"], [1, "space-y-4"], ["class", "mb-4", 4, "ngFor", "ngForOf"], [1, "mb-4"], [3, "toggleExpansion", "toggleMessageExpansion", "toggleDetailsExpansion", "toggleDropdown", "consultant", "expanded", "messageExpanded", "detailsExpanded", "dropdownOpen"], [1, "text-center", "p-6", "bg-gray-50", "rounded-lg"], [1, "text-gray-500"], [1, "flex", "justify-center", "items-center", "py-4"], [1, "animate-spin", "h-8", "w-8", "border-4", "border-blue-500", "border-t-transparent", "rounded-full"], [1, "flex", "justify-center", "items-center", "p-6"], [1, "text-center", "p-4", "bg-red-50", "rounded-lg"], [1, "text-red-500", "text-sm"], [1, "mt-2", "px-3", "py-1", "bg-blue-500", "text-white", "text-sm", "rounded", 3, "click"], [1, "space-y-3"], ["class", "mb-3", 4, "ngFor", "ngForOf"], [1, "mb-3"], [1, "text-center", "p-4", "bg-gray-50", "rounded-lg"], [1, "text-gray-500", "text-sm"], [1, "flex", "justify-center", "items-center", "py-3"], [1, "animate-spin", "h-6", "w-6", "border-2", "border-blue-500", "border-t-transparent", "rounded-full"]],
      template: function ConsultantListComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 2)(1, "div", 3)(2, "button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ConsultantListComponent_Template_button_click_2_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.toggleSortDropdown($event));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "svg", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "path", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, ConsultantListComponent_div_7_Template, 2, 1, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 8, 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("scroll", function ConsultantListComponent_Template_div_scroll_8_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.onScroll($event));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, ConsultantListComponent_div_10_Template, 2, 0, "div", 9)(11, ConsultantListComponent_div_11_Template, 5, 1, "div", 10)(12, ConsultantListComponent_div_12_Template, 2, 1, "div", 11)(13, ConsultantListComponent_div_13_Template, 3, 0, "div", 12)(14, ConsultantListComponent_div_14_Template, 2, 0, "div", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 14, 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("scroll", function ConsultantListComponent_Template_div_scroll_15_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.onScroll($event));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](17, ConsultantListComponent_div_17_Template, 2, 0, "div", 15)(18, ConsultantListComponent_div_18_Template, 5, 1, "div", 16)(19, ConsultantListComponent_div_19_Template, 2, 1, "div", 17)(20, ConsultantListComponent_div_20_Template, 3, 0, "div", 18)(21, ConsultantListComponent_div_21_Template, 2, 0, "div", 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Trier par : ", ctx.getSortLabel(), "");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.sortDropdownOpen);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.errorMessage);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isLoading && !ctx.errorMessage);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isLoading && !ctx.errorMessage && ctx.filteredConsultants.length === 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isLoadingMore);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.errorMessage);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isLoading && !ctx.errorMessage);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isLoading && !ctx.errorMessage && ctx.filteredConsultants.length === 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isLoadingMore);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _consultant_card_consultant_card_component__WEBPACK_IMPORTED_MODULE_0__.ConsultantCardComponent],
      styles: [".action-button[_ngcontent-%COMP%] {\n  display: flex;\n  height: 2rem;\n  width: 2rem;\n  align-items: center;\n  justify-content: center;\n  border-radius: 9999px;\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 300ms;\n}\n\n.linkedin-button[_ngcontent-%COMP%] {\n  --tw-bg-opacity: 1;\n  background-color: rgb(219 234 254 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(37 99 235 / var(--tw-text-opacity));\n}\n\n.linkedin-button[_ngcontent-%COMP%]:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(191 219 254 / var(--tw-bg-opacity));\n}\n\n.phone-button[_ngcontent-%COMP%] {\n  --tw-bg-opacity: 1;\n  background-color: rgb(220 252 231 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(22 163 74 / var(--tw-text-opacity));\n}\n\n.phone-button[_ngcontent-%COMP%]:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(187 247 208 / var(--tw-bg-opacity));\n}\n\n.email-button[_ngcontent-%COMP%] {\n  --tw-bg-opacity: 1;\n  background-color: rgb(254 226 226 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(220 38 38 / var(--tw-text-opacity));\n}\n\n.email-button[_ngcontent-%COMP%]:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(254 202 202 / var(--tw-bg-opacity));\n}\n\n.skill-badge[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n  --tw-bg-opacity: 1;\n  background-color: rgb(219 234 254 / var(--tw-bg-opacity));\n  font-size: 0.75rem;\n  line-height: 1rem;\n  font-weight: 500;\n  --tw-text-opacity: 1;\n  color: rgb(29 78 216 / var(--tw-text-opacity));\n}\n\n.location-badge[_ngcontent-%COMP%] {\n  --tw-text-opacity: 1;\n  color: rgb(75 85 99 / var(--tw-text-opacity));\n}\n\n.expertise-badge[_ngcontent-%COMP%] {\n  margin: 0.25rem;\n  border-radius: 9999px;\n  --tw-bg-opacity: 1;\n  background-color: rgb(243 232 255 / var(--tw-bg-opacity));\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  --tw-text-opacity: 1;\n  color: rgb(107 33 168 / var(--tw-text-opacity));\n}\n\n.sector-badge[_ngcontent-%COMP%] {\n  margin: 0.25rem;\n  border-radius: 9999px;\n  --tw-bg-opacity: 1;\n  background-color: rgb(220 252 231 / var(--tw-bg-opacity));\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  --tw-text-opacity: 1;\n  color: rgb(22 101 52 / var(--tw-text-opacity));\n}\n\n.filter-pill[_ngcontent-%COMP%] {\n  margin: 0.25rem;\n  display: flex;\n  align-items: center;\n  border-radius: 9999px;\n  --tw-bg-opacity: 1;\n  background-color: rgb(219 234 254 / var(--tw-bg-opacity));\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  --tw-text-opacity: 1;\n  color: rgb(29 78 216 / var(--tw-text-opacity));\n}\n\n.close-icon[_ngcontent-%COMP%] {\n  --tw-text-opacity: 1;\n  color: rgb(37 99 235 / var(--tw-text-opacity));\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 300ms;\n}\n\n.close-icon[_ngcontent-%COMP%]:hover {\n  --tw-text-opacity: 1;\n  color: rgb(30 64 175 / var(--tw-text-opacity));\n}\n\n\n\n.animate-fadeIn[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-in-out;\n}\n\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f1f1f1;\n  border-radius: 8px;\n}\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #c5c5c5;\n  border-radius: 8px;\n}\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #a8a8a8;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnN1bHRhbnQtbGlzdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNFO0VBQUEsYUFBd0Y7RUFBeEYsWUFBd0Y7RUFBeEYsV0FBd0Y7RUFBeEYsbUJBQXdGO0VBQXhGLHVCQUF3RjtFQUF4RixxQkFBd0Y7RUFBeEYsd0JBQXdGO0VBQXhGLHdEQUF3RjtFQUF4RjtBQUF3Rjs7QUFJeEY7RUFBQSxrQkFBa0Q7RUFBbEQseURBQWtEO0VBQWxELG9CQUFrRDtFQUFsRDtBQUFrRDs7QUFBbEQ7RUFBQSxrQkFBa0Q7RUFBbEQ7QUFBa0Q7O0FBSWxEO0VBQUEsa0JBQXFEO0VBQXJELHlEQUFxRDtFQUFyRCxvQkFBcUQ7RUFBckQ7QUFBcUQ7O0FBQXJEO0VBQUEsa0JBQXFEO0VBQXJEO0FBQXFEOztBQUlyRDtFQUFBLGtCQUErQztFQUEvQyx5REFBK0M7RUFBL0Msb0JBQStDO0VBQS9DO0FBQStDOztBQUEvQztFQUFBLGtCQUErQztFQUEvQztBQUErQzs7QUFJL0M7RUFBQSx1QkFBK0Q7RUFBL0Qsa0JBQStEO0VBQS9ELHlEQUErRDtFQUEvRCxrQkFBK0Q7RUFBL0QsaUJBQStEO0VBQS9ELGdCQUErRDtFQUEvRCxvQkFBK0Q7RUFBL0Q7QUFBK0Q7O0FBSS9EO0VBQUEsb0JBQW9CO0VBQXBCO0FBQW9COztBQUlwQjtFQUFBLGVBQXVFO0VBQXZFLHFCQUF1RTtFQUF2RSxrQkFBdUU7RUFBdkUseURBQXVFO0VBQXZFLG9CQUF1RTtFQUF2RSxxQkFBdUU7RUFBdkUsb0JBQXVFO0VBQXZFLHVCQUF1RTtFQUF2RSxrQkFBdUU7RUFBdkUsaUJBQXVFO0VBQXZFLG9CQUF1RTtFQUF2RTtBQUF1RTs7QUFJdkU7RUFBQSxlQUFxRTtFQUFyRSxxQkFBcUU7RUFBckUsa0JBQXFFO0VBQXJFLHlEQUFxRTtFQUFyRSxvQkFBcUU7RUFBckUscUJBQXFFO0VBQXJFLG9CQUFxRTtFQUFyRSx1QkFBcUU7RUFBckUsa0JBQXFFO0VBQXJFLGlCQUFxRTtFQUFyRSxvQkFBcUU7RUFBckU7QUFBcUU7O0FBSXJFO0VBQUEsZUFBcUY7RUFBckYsYUFBcUY7RUFBckYsbUJBQXFGO0VBQXJGLHFCQUFxRjtFQUFyRixrQkFBcUY7RUFBckYseURBQXFGO0VBQXJGLHFCQUFxRjtFQUFyRixzQkFBcUY7RUFBckYsb0JBQXFGO0VBQXJGLHVCQUFxRjtFQUFyRixrQkFBcUY7RUFBckYsaUJBQXFGO0VBQXJGLG9CQUFxRjtFQUFyRjtBQUFxRjs7QUFJckY7RUFBQSxvQkFBdUU7RUFBdkUsOENBQXVFO0VBQXZFLCtGQUF1RTtFQUF2RSx3REFBdUU7RUFBdkU7QUFBdUU7O0FBQXZFO0VBQUEsb0JBQXVFO0VBQXZFO0FBQXVFOztBQUd6RSw0Q0FBNEM7QUFDNUM7RUFDRSxrQ0FBa0M7QUFDcEM7O0FBRUE7RUFDRTtJQUNFLFVBQVU7SUFDViw0QkFBNEI7RUFDOUI7RUFDQTtJQUNFLFVBQVU7SUFDVix3QkFBd0I7RUFDMUI7QUFDRjs7QUFFQSxzQ0FBc0M7QUFDdEM7RUFDRSxVQUFVO0FBQ1o7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQiIsImZpbGUiOiJjb25zdWx0YW50LWxpc3QuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hY3Rpb24tYnV0dG9uIHtcbiAgQGFwcGx5IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHctOCBoLTggcm91bmRlZC1mdWxsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMDtcbn1cblxuLmxpbmtlZGluLWJ1dHRvbiB7XG4gIEBhcHBseSBiZy1ibHVlLTEwMCB0ZXh0LWJsdWUtNjAwIGhvdmVyOmJnLWJsdWUtMjAwO1xufVxuXG4ucGhvbmUtYnV0dG9uIHtcbiAgQGFwcGx5IGJnLWdyZWVuLTEwMCB0ZXh0LWdyZWVuLTYwMCBob3ZlcjpiZy1ncmVlbi0yMDA7XG59XG5cbi5lbWFpbC1idXR0b24ge1xuICBAYXBwbHkgYmctcmVkLTEwMCB0ZXh0LXJlZC02MDAgaG92ZXI6YmctcmVkLTIwMDtcbn1cblxuLnNraWxsLWJhZGdlIHtcbiAgQGFwcGx5IGJnLWJsdWUtMTAwIHRleHQtYmx1ZS03MDAgcm91bmRlZC1tZCBmb250LW1lZGl1bSB0ZXh0LXhzO1xufVxuXG4ubG9jYXRpb24tYmFkZ2Uge1xuICBAYXBwbHkgdGV4dC1ncmF5LTYwMDtcbn1cblxuLmV4cGVydGlzZS1iYWRnZSB7XG4gIEBhcHBseSBiZy1wdXJwbGUtMTAwIHRleHQtcHVycGxlLTgwMCByb3VuZGVkLWZ1bGwgcHgtMiBweS0xIHRleHQteHMgbS0xO1xufVxuXG4uc2VjdG9yLWJhZGdlIHtcbiAgQGFwcGx5IGJnLWdyZWVuLTEwMCB0ZXh0LWdyZWVuLTgwMCByb3VuZGVkLWZ1bGwgcHgtMiBweS0xIHRleHQteHMgbS0xO1xufVxuXG4uZmlsdGVyLXBpbGwge1xuICBAYXBwbHkgYmctYmx1ZS0xMDAgdGV4dC1ibHVlLTcwMCByb3VuZGVkLWZ1bGwgcHgtMyBweS0xIHRleHQteHMgbS0xIGZsZXggaXRlbXMtY2VudGVyO1xufVxuXG4uY2xvc2UtaWNvbiB7XG4gIEBhcHBseSB0ZXh0LWJsdWUtNjAwIGhvdmVyOnRleHQtYmx1ZS04MDAgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMzAwO1xufVxuXG4vKiBBbmltYXRpb24gcG91ciBsJ2V4cGFuc2lvbiBkZXMgc2VjdGlvbnMgKi9cbi5hbmltYXRlLWZhZGVJbiB7XG4gIGFuaW1hdGlvbjogZmFkZUluIDAuM3MgZWFzZS1pbi1vdXQ7XG59XG5cbkBrZXlmcmFtZXMgZmFkZUluIHtcbiAgZnJvbSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwcHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuXG4vKiBTdHlsZSBwb3VyIGxhIGJhcnJlIGRlIGTDqWZpbGVtZW50ICovXG46Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgd2lkdGg6IDhweDtcbn1cblxuOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gIGJhY2tncm91bmQ6ICNmMWYxZjE7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbn1cblxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gIGJhY2tncm91bmQ6ICNjNWM1YzU7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbn1cblxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNhOGE4YTg7XG59Il19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9jb25zdWx0YW50LWxpc3QvY29uc3VsdGFudC1saXN0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFBQSxhQUF3RjtFQUF4RixZQUF3RjtFQUF4RixXQUF3RjtFQUF4RixtQkFBd0Y7RUFBeEYsdUJBQXdGO0VBQXhGLHFCQUF3RjtFQUF4Rix3QkFBd0Y7RUFBeEYsd0RBQXdGO0VBQXhGLDBCQUFBO0FBQXdGOztBQUl4RjtFQUFBLGtCQUFrRDtFQUFsRCx5REFBa0Q7RUFBbEQsb0JBQWtEO0VBQWxELDhDQUFBO0FBQWtEOztBQUFsRDtFQUFBLGtCQUFrRDtFQUFsRCx5REFBQTtBQUFrRDs7QUFJbEQ7RUFBQSxrQkFBcUQ7RUFBckQseURBQXFEO0VBQXJELG9CQUFxRDtFQUFyRCw4Q0FBQTtBQUFxRDs7QUFBckQ7RUFBQSxrQkFBcUQ7RUFBckQseURBQUE7QUFBcUQ7O0FBSXJEO0VBQUEsa0JBQStDO0VBQS9DLHlEQUErQztFQUEvQyxvQkFBK0M7RUFBL0MsOENBQUE7QUFBK0M7O0FBQS9DO0VBQUEsa0JBQStDO0VBQS9DLHlEQUFBO0FBQStDOztBQUkvQztFQUFBLHVCQUErRDtFQUEvRCxrQkFBK0Q7RUFBL0QseURBQStEO0VBQS9ELGtCQUErRDtFQUEvRCxpQkFBK0Q7RUFBL0QsZ0JBQStEO0VBQS9ELG9CQUErRDtFQUEvRCw4Q0FBQTtBQUErRDs7QUFJL0Q7RUFBQSxvQkFBb0I7RUFBcEIsNkNBQUE7QUFBb0I7O0FBSXBCO0VBQUEsZUFBdUU7RUFBdkUscUJBQXVFO0VBQXZFLGtCQUF1RTtFQUF2RSx5REFBdUU7RUFBdkUsb0JBQXVFO0VBQXZFLHFCQUF1RTtFQUF2RSxvQkFBdUU7RUFBdkUsdUJBQXVFO0VBQXZFLGtCQUF1RTtFQUF2RSxpQkFBdUU7RUFBdkUsb0JBQXVFO0VBQXZFLCtDQUFBO0FBQXVFOztBQUl2RTtFQUFBLGVBQXFFO0VBQXJFLHFCQUFxRTtFQUFyRSxrQkFBcUU7RUFBckUseURBQXFFO0VBQXJFLG9CQUFxRTtFQUFyRSxxQkFBcUU7RUFBckUsb0JBQXFFO0VBQXJFLHVCQUFxRTtFQUFyRSxrQkFBcUU7RUFBckUsaUJBQXFFO0VBQXJFLG9CQUFxRTtFQUFyRSw4Q0FBQTtBQUFxRTs7QUFJckU7RUFBQSxlQUFxRjtFQUFyRixhQUFxRjtFQUFyRixtQkFBcUY7RUFBckYscUJBQXFGO0VBQXJGLGtCQUFxRjtFQUFyRix5REFBcUY7RUFBckYscUJBQXFGO0VBQXJGLHNCQUFxRjtFQUFyRixvQkFBcUY7RUFBckYsdUJBQXFGO0VBQXJGLGtCQUFxRjtFQUFyRixpQkFBcUY7RUFBckYsb0JBQXFGO0VBQXJGLDhDQUFBO0FBQXFGOztBQUlyRjtFQUFBLG9CQUF1RTtFQUF2RSw4Q0FBdUU7RUFBdkUsK0ZBQXVFO0VBQXZFLHdEQUF1RTtFQUF2RSwwQkFBQTtBQUF1RTs7QUFBdkU7RUFBQSxvQkFBdUU7RUFBdkUsOENBQUE7QUFBdUU7O0FBR3pFLDRDQUE0QztBQUM1QztFQUNFLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFO0lBQ0UsVUFBVTtJQUNWLDRCQUE0QjtFQUM5QjtFQUNBO0lBQ0UsVUFBVTtJQUNWLHdCQUF3QjtFQUMxQjtBQUNGOztBQUVBLHNDQUFzQztBQUN0QztFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCO0FBcUZBLHc3SEFBdzdIIiwic291cmNlc0NvbnRlbnQiOlsiLmFjdGlvbi1idXR0b24ge1xuICBAYXBwbHkgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdy04IGgtOCByb3VuZGVkLWZ1bGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwO1xufVxuXG4ubGlua2VkaW4tYnV0dG9uIHtcbiAgQGFwcGx5IGJnLWJsdWUtMTAwIHRleHQtYmx1ZS02MDAgaG92ZXI6YmctYmx1ZS0yMDA7XG59XG5cbi5waG9uZS1idXR0b24ge1xuICBAYXBwbHkgYmctZ3JlZW4tMTAwIHRleHQtZ3JlZW4tNjAwIGhvdmVyOmJnLWdyZWVuLTIwMDtcbn1cblxuLmVtYWlsLWJ1dHRvbiB7XG4gIEBhcHBseSBiZy1yZWQtMTAwIHRleHQtcmVkLTYwMCBob3ZlcjpiZy1yZWQtMjAwO1xufVxuXG4uc2tpbGwtYmFkZ2Uge1xuICBAYXBwbHkgYmctYmx1ZS0xMDAgdGV4dC1ibHVlLTcwMCByb3VuZGVkLW1kIGZvbnQtbWVkaXVtIHRleHQteHM7XG59XG5cbi5sb2NhdGlvbi1iYWRnZSB7XG4gIEBhcHBseSB0ZXh0LWdyYXktNjAwO1xufVxuXG4uZXhwZXJ0aXNlLWJhZGdlIHtcbiAgQGFwcGx5IGJnLXB1cnBsZS0xMDAgdGV4dC1wdXJwbGUtODAwIHJvdW5kZWQtZnVsbCBweC0yIHB5LTEgdGV4dC14cyBtLTE7XG59XG5cbi5zZWN0b3ItYmFkZ2Uge1xuICBAYXBwbHkgYmctZ3JlZW4tMTAwIHRleHQtZ3JlZW4tODAwIHJvdW5kZWQtZnVsbCBweC0yIHB5LTEgdGV4dC14cyBtLTE7XG59XG5cbi5maWx0ZXItcGlsbCB7XG4gIEBhcHBseSBiZy1ibHVlLTEwMCB0ZXh0LWJsdWUtNzAwIHJvdW5kZWQtZnVsbCBweC0zIHB5LTEgdGV4dC14cyBtLTEgZmxleCBpdGVtcy1jZW50ZXI7XG59XG5cbi5jbG9zZS1pY29uIHtcbiAgQGFwcGx5IHRleHQtYmx1ZS02MDAgaG92ZXI6dGV4dC1ibHVlLTgwMCB0cmFuc2l0aW9uLWNvbG9ycyBkdXJhdGlvbi0zMDA7XG59XG5cbi8qIEFuaW1hdGlvbiBwb3VyIGwnZXhwYW5zaW9uIGRlcyBzZWN0aW9ucyAqL1xuLmFuaW1hdGUtZmFkZUluIHtcbiAgYW5pbWF0aW9uOiBmYWRlSW4gMC4zcyBlYXNlLWluLW91dDtcbn1cblxuQGtleWZyYW1lcyBmYWRlSW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTBweCk7XG4gIH1cbiAgdG8ge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICB9XG59XG5cbi8qIFN0eWxlIHBvdXIgbGEgYmFycmUgZGUgZMODwqlmaWxlbWVudCAqL1xuOjotd2Via2l0LXNjcm9sbGJhciB7XG4gIHdpZHRoOiA4cHg7XG59XG5cbjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xuICBiYWNrZ3JvdW5kOiAjZjFmMWYxO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG59XG5cbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICBiYWNrZ3JvdW5kOiAjYzVjNWM1O1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG59XG5cbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjYThhOGE4O1xufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 878:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
const environment = {
  production: false,
  // URL pour l'API en mode Replit avec proxy
  apiUrl: '/api',
  // Utilise le proxy configuré dans proxy.conf.json qui redirige vers 0.0.0.0:8000/api
  isExtension: false,
  envName: 'replit',
  // Informations de débogage pour vérifier la configuration
  debugInfo: {
    timestamp: new Date().toISOString(),
    buildMode: 'Replit Development'
  }
};

/***/ }),

/***/ 1268:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppRoutingModule: () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 7400);
/* harmony import */ var _components_auth_login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/auth/login/login.component */ 1486);
/* harmony import */ var _components_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/user/profile/user-profile.component */ 329);
/* harmony import */ var _components_consultant_list_consultant_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/consultant-list/consultant-list.component */ 831);
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./guards/auth.guard */ 9158);
/* harmony import */ var _app_component_debug__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component.debug */ 8775);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3956);








const routes = [
// Route principale - consultants list
{
  path: '',
  component: _components_consultant_list_consultant_list_component__WEBPACK_IMPORTED_MODULE_2__.ConsultantListComponent
},
// Route principale directe vers la liste des consultants
{
  path: 'consultants',
  component: _components_consultant_list_consultant_list_component__WEBPACK_IMPORTED_MODULE_2__.ConsultantListComponent
},
// Route alternative
// Routes d'authentification
{
  path: 'login',
  component: _components_auth_login_login_component__WEBPACK_IMPORTED_MODULE_0__.LoginComponent
},
// Route de débogage
{
  path: 'debug',
  component: _app_component_debug__WEBPACK_IMPORTED_MODULE_4__.AppDebugComponent
},
// Routes protégées par AuthGuard
{
  path: 'profile',
  component: _components_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_1__.UserProfileComponent,
  canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_3__.AuthGuard]
},
// Routes spécifiques aux rôles
{
  path: 'admin',
  component: _components_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_1__.UserProfileComponent,
  // Temporaire - à remplacer par AdminDashboardComponent
  canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_3__.AuthGuard],
  data: {
    roles: ['admin']
  }
}, {
  path: 'consultant-profile',
  component: _components_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_1__.UserProfileComponent,
  // Temporaire - à remplacer par ConsultantProfileComponent
  canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_3__.AuthGuard],
  data: {
    roles: ['consultant']
  }
},
// Redirection par défaut
{
  path: '**',
  component: _components_consultant_list_consultant_list_component__WEBPACK_IMPORTED_MODULE_2__.ConsultantListComponent
} // Redirection vers la liste des consultants
];
class AppRoutingModule {
  static {
    this.ɵfac = function AppRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppRoutingModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
      type: AppRoutingModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forRoot(routes, {
        useHash: true
      }), _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
  });
})();

/***/ }),

/***/ 1486:
/*!**********************************************************!*\
  !*** ./src/app/components/auth/login/login.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginComponent: () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6884);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 6944);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3956);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../services/auth.service */ 5822);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 7400);
/* harmony import */ var _services_modal_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/modal.service */ 4193);








const _c0 = a0 => ({
  "border-red-300": a0
});
const _c1 = a0 => ({
  "opacity-70 cursor-not-allowed": a0
});
function LoginComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r0.loginError, " ");
  }
}
function LoginComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " L'email est requis ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function LoginComponent_div_21_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Le mot de passe est requis");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function LoginComponent_div_21_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Le mot de passe doit contenir au moins 6 caract\u00E8res");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function LoginComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, LoginComponent_div_21_span_1_Template, 2, 0, "span", 26)(2, LoginComponent_div_21_span_2_Template, 2, 0, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (tmp_1_0 = ctx_r0.loginForm.get("password")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["required"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (tmp_2_0 = ctx_r0.loginForm.get("password")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["minlength"]);
  }
}
function LoginComponent_span_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "svg", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "circle", 29)(3, "path", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
class LoginComponent {
  constructor(authService, router, fb, modalService // Changé de private à public pour l'accès depuis le template
  ) {
    this.authService = authService;
    this.router = router;
    this.fb = fb;
    this.modalService = modalService;
    this.isLoading = false;
    this.loginError = null;
    this.rememberMe = false;
    this.loginMode = 'email';
  }
  ngOnInit() {
    // Initialiser le formulaire
    this.loginForm = this.fb.group({
      username: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]],
      password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.minLength(6)]],
      rememberMe: [false]
    });
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.loginError = null;
    const credentials = {
      email: this.loginForm.value.username,
      password: this.loginForm.value.password,
      rememberMe: this.loginForm.value.rememberMe
    };
    this.authService.loginWithEmail(credentials).subscribe({
      next: () => {
        this.isLoading = false;
        this.closeModal();
      },
      error: error => {
        this.handleLoginError(error);
      }
    });
  }
  closeModal() {
    this.modalService.closeLoginModal();
    this.resetForm();
  }
  resetForm() {
    this.loginForm.reset({
      username: '',
      password: '',
      rememberMe: false
    });
    this.loginError = null;
    this.isLoading = false;
  }
  handleLoginError(error) {
    this.isLoading = false;
    if (error.status === 401) {
      this.loginError = 'Identifiants incorrects. Veuillez réessayer.';
    } else {
      this.loginError = 'Une erreur est survenue. Veuillez réessayer plus tard.';
    }
    console.error('Erreur de connexion:', error);
  }
  static {
    this.ɵfac = function LoginComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_modal_service__WEBPACK_IMPORTED_MODULE_1__.ModalService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: LoginComponent,
      selectors: [["app-login"]],
      decls: 34,
      vars: 30,
      consts: [[1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", "bg-black", "bg-opacity-60", "transition-opacity", "duration-300"], [1, "w-full", "max-w-md", "bg-white", "rounded-lg", "shadow-xl", "transition-all", "duration-300", "ease-in-out", "transform"], [1, "flex", "items-center", "justify-between", "px-6", "py-4", "border-b"], [1, "text-xl", "font-semibold", "text-gray-800"], ["type", "button", 1, "text-gray-500", "hover:text-gray-700", "focus:outline-none", 3, "click"], ["fill", "currentColor", "viewBox", "0 0 20 20", 1, "w-5", "h-5"], ["fill-rule", "evenodd", "d", "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", "clip-rule", "evenodd"], [1, "px-6", "py-4"], ["class", "mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm", 4, "ngIf"], [1, "space-y-6"], [3, "ngSubmit", "formGroup"], [1, "mb-4"], ["for", "username", 1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["id", "username", "type", "email", "formControlName", "username", "placeholder", "Entrez votre email", 1, "w-full", "px-3", "py-2", "border", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500", "focus:border-transparent", 3, "ngClass"], ["class", "mt-1 text-sm text-red-600", 4, "ngIf"], ["for", "password", 1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["id", "password", "type", "password", "formControlName", "password", "placeholder", "Entrez votre mot de passe", 1, "w-full", "px-3", "py-2", "border", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500", "focus:border-transparent", 3, "ngClass"], [1, "flex", "items-center", "mb-6"], ["id", "rememberMe", "type", "checkbox", "formControlName", "rememberMe", 1, "h-4", "w-4", "text-indigo-600", "focus:ring-indigo-500", "border-gray-300", "rounded"], ["for", "rememberMe", 1, "ml-2", "block", "text-sm", "text-gray-700"], ["type", "submit", 1, "w-full", "flex", "justify-center", "py-2", "px-4", "border", "border-transparent", "rounded-md", "shadow-sm", "text-sm", "font-medium", "text-white", "bg-indigo-600", "hover:bg-indigo-700", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-indigo-500", 3, "disabled", "ngClass"], ["class", "mr-2", 4, "ngIf"], [1, "flex", "items-center", "justify-between"], ["href", "#", 1, "text-sm", "text-indigo-600", "hover:text-indigo-700"], [1, "mb-4", "p-3", "bg-red-50", "border", "border-red-200", "text-red-600", "rounded-md", "text-sm"], [1, "mt-1", "text-sm", "text-red-600"], [4, "ngIf"], [1, "mr-2"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-4", "w-4", "text-white", "inline-block"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"]],
      template: function LoginComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Connexion \u00E0 FastConnect");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function LoginComponent_Template_button_click_5_listener() {
            return ctx.closeModal();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "svg", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "path", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, LoginComponent_div_9_Template, 2, 1, "div", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 9)(11, "form", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function LoginComponent_Template_form_ngSubmit_11_listener() {
            return ctx.onSubmit();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 11)(13, "label", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, " Email ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "input", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](16, LoginComponent_div_16_Template, 2, 0, "div", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "div", 11)(18, "label", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, " Mot de passe ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](20, "input", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](21, LoginComponent_div_21_Template, 3, 2, "div", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "div", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](23, "input", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "label", 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, " Se souvenir de moi ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "button", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](27, LoginComponent_span_27_Template, 4, 0, "span", 21);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "div", 22)(30, "a", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](31, " Mot de passe oubli\u00E9 ? ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "a", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](33, " Cr\u00E9er un compte ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()();
        }
        if (rf & 2) {
          let tmp_9_0;
          let tmp_10_0;
          let tmp_11_0;
          let tmp_12_0;
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("opacity-0", !ctx.modalService.isLoginModalVisible)("opacity-100", ctx.modalService.isLoginModalVisible)("invisible", !ctx.modalService.isLoginModalVisible);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("scale-95", !ctx.modalService.isLoginModalVisible)("scale-100", ctx.modalService.isLoginModalVisible)("opacity-0", !ctx.modalService.isLoginModalVisible)("opacity-100", ctx.modalService.isLoginModalVisible);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.loginError);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.loginForm);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](24, _c0, ((tmp_9_0 = ctx.loginForm.get("username")) == null ? null : tmp_9_0.invalid) && ((tmp_9_0 = ctx.loginForm.get("username")) == null ? null : tmp_9_0.touched)));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ((tmp_10_0 = ctx.loginForm.get("username")) == null ? null : tmp_10_0.invalid) && ((tmp_10_0 = ctx.loginForm.get("username")) == null ? null : tmp_10_0.touched));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](26, _c0, ((tmp_11_0 = ctx.loginForm.get("password")) == null ? null : tmp_11_0.invalid) && ((tmp_11_0 = ctx.loginForm.get("password")) == null ? null : tmp_11_0.touched)));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ((tmp_12_0 = ctx.loginForm.get("password")) == null ? null : tmp_12_0.invalid) && ((tmp_12_0 = ctx.loginForm.get("password")) == null ? null : tmp_12_0.touched));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.loginForm.invalid || ctx.isLoading)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](28, _c1, ctx.loginForm.invalid || ctx.isLoading));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx.isLoading ? "Connexion en cours..." : "Se connecter", " ");
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormsModule],
      styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0RBQXNEIiwiZmlsZSI6ImxvZ2luLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBTdHlsZXMgc3DDqWNpZmlxdWVzIHBvdXIgbGUgY29tcG9zYW50IGRlIGNvbm5leGlvbiAqLyJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9hdXRoL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0RBQXNEO0FBQ3RELG9UQUFvVCIsInNvdXJjZXNDb250ZW50IjpbIi8qIFN0eWxlcyBzcMODwqljaWZpcXVlcyBwb3VyIGxlIGNvbXBvc2FudCBkZSBjb25uZXhpb24gKi8iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 3636:
/*!*****************************************!*\
  !*** ./src/app/services/api.service.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiService: () => (/* binding */ ApiService)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 878);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3956);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 2979);



/**
 * Service de base pour les appels API
 * Gère les différentes configurations selon le contexte (application web ou extension Chrome)
 */
class ApiService {
  constructor(http) {
    this.http = http;
    this.API_URL = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl;
    this.IS_EXTENSION = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.isExtension;
    this.ENV_NAME = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.envName || 'default';
    console.log('API Service initialisé avec URL:', this.API_URL);
    console.log('Contexte: ', this.IS_EXTENSION ? 'Extension Chrome' : 'Application Web');
    console.log('Environnement: ', this.ENV_NAME);
  }
  /**
   * Crée une URL complète pour une route API
   * @param endpoint Point de terminaison API (sans le préfixe /api)
   * @returns URL complète
   */
  buildApiUrl(endpoint) {
    // Si l'endpoint est déjà une URL complète, la retourner telle quelle
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      return endpoint;
    }
    // S'assurer que endpoint commence par "/" si ce n'est pas déjà le cas
    if (!endpoint.startsWith('/')) {
      endpoint = '/' + endpoint;
    }
    // Les URL sont configurées par environnement et ne devraient pas
    // nécessiter de logique conditionnelle supplémentaire ici
    // Utiliser simplement l'URL configurée dans l'environnement
    return `${this.API_URL}${endpoint}`;
  }
  /**
   * Effectue une requête GET
   * @param endpoint Point de terminaison
   * @param options Options HTTP
   * @returns Observable de la réponse
   */
  get(endpoint, options = {}) {
    return this.http.get(this.buildApiUrl(endpoint), options);
  }
  /**
   * Effectue une requête POST
   * @param endpoint Point de terminaison
   * @param body Corps de la requête
   * @param options Options HTTP
   * @returns Observable de la réponse
   */
  post(endpoint, body, options = {}) {
    return this.http.post(this.buildApiUrl(endpoint), body, options);
  }
  /**
   * Effectue une requête PUT
   * @param endpoint Point de terminaison
   * @param body Corps de la requête
   * @param options Options HTTP
   * @returns Observable de la réponse
   */
  put(endpoint, body, options = {}) {
    return this.http.put(this.buildApiUrl(endpoint), body, options);
  }
  /**
   * Effectue une requête DELETE
   * @param endpoint Point de terminaison
   * @param options Options HTTP
   * @returns Observable de la réponse
   */
  delete(endpoint, options = {}) {
    return this.http.delete(this.buildApiUrl(endpoint), options);
  }
  static {
    this.ɵfac = function ApiService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: ApiService,
      factory: ApiService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 4193:
/*!*******************************************!*\
  !*** ./src/app/services/modal.service.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModalService: () => (/* binding */ ModalService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 5259);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3956);


/**
 * Service pour gérer l'affichage des modals dans l'application
 */
class ModalService {
  // État actuel du modal
  get isLoginModalVisible() {
    return this.loginModalVisibleSubject.value;
  }
  get isModalBackdropVisible() {
    return this.modalBackdropVisibleSubject.value;
  }
  constructor() {
    this.loginModalVisibleSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(false);
    this.modalBackdropVisibleSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(false);
    // Observable public pour que les composants puissent s'abonner aux changements
    this.loginModalVisible$ = this.loginModalVisibleSubject.asObservable();
    this.modalBackdropVisible$ = this.modalBackdropVisibleSubject.asObservable();
  }
  /**
   * Ouvre le modal de connexion
   */
  openLoginModal() {
    this.loginModalVisibleSubject.next(true);
    this.modalBackdropVisibleSubject.next(true);
  }
  /**
   * Ferme le modal de connexion
   */
  closeLoginModal() {
    this.loginModalVisibleSubject.next(false);
    this.modalBackdropVisibleSubject.next(false);
  }
  /**
   * Ferme tous les modals
   */
  closeAllModals() {
    this.closeLoginModal();
    // Ajouter d'autres fermetures de modals ici si nécessaire
  }
  static {
    this.ɵfac = function ModalService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ModalService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: ModalService,
      factory: ModalService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 4757:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser */ 2508);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 2979);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 6944);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 1268);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 5506);
/* harmony import */ var _components_consultant_card_consultant_card_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/consultant-card/consultant-card.component */ 9215);
/* harmony import */ var _components_consultant_list_consultant_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/consultant-list/consultant-list.component */ 831);
/* harmony import */ var _components_auth_login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/auth/login/login.component */ 1486);
/* harmony import */ var _components_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/user/profile/user-profile.component */ 329);
/* harmony import */ var _services_auth_interceptor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/auth.interceptor */ 7926);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 7400);
/* harmony import */ var _app_component_debug__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.component.debug */ 8775);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3956);













class AppModule {
  static {
    this.ɵfac = function AppModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
      type: AppModule,
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent]
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
      providers: [
      // Intercepteur HTTP pour ajouter le token à toutes les requêtes
      {
        provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HTTP_INTERCEPTORS,
        useClass: _services_auth_interceptor__WEBPACK_IMPORTED_MODULE_6__.AuthInterceptor,
        multi: true
      }],
      imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__.BrowserModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClientModule, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.ReactiveFormsModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _angular_router__WEBPACK_IMPORTED_MODULE_12__.RouterModule,
      // Ajout explicite du RouterModule
      // Importation des composants standalone
      _components_consultant_card_consultant_card_component__WEBPACK_IMPORTED_MODULE_2__.ConsultantCardComponent, _components_consultant_list_consultant_list_component__WEBPACK_IMPORTED_MODULE_3__.ConsultantListComponent, _components_auth_login_login_component__WEBPACK_IMPORTED_MODULE_4__.LoginComponent, _components_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_5__.UserProfileComponent, _app_component_debug__WEBPACK_IMPORTED_MODULE_7__.AppDebugComponent]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent
    // Les composants standalone ne doivent pas être déclarés ici
    ],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__.BrowserModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClientModule, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.ReactiveFormsModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _angular_router__WEBPACK_IMPORTED_MODULE_12__.RouterModule,
    // Ajout explicite du RouterModule
    // Importation des composants standalone
    _components_consultant_card_consultant_card_component__WEBPACK_IMPORTED_MODULE_2__.ConsultantCardComponent, _components_consultant_list_consultant_list_component__WEBPACK_IMPORTED_MODULE_3__.ConsultantListComponent, _components_auth_login_login_component__WEBPACK_IMPORTED_MODULE_4__.LoginComponent, _components_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_5__.UserProfileComponent, _app_component_debug__WEBPACK_IMPORTED_MODULE_7__.AppDebugComponent]
  });
})();

/***/ }),

/***/ 4839:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 2508);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3956);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 4757);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 878);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ }),

/***/ 5506:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 7400);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 137);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../environments/environment */ 878);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3956);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/auth.service */ 5822);
/* harmony import */ var _services_modal_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/modal.service */ 4193);
/* harmony import */ var _services_consultant_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/consultant.service */ 5937);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 6884);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 6944);
/* harmony import */ var _components_auth_login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/auth/login/login.component */ 1486);











const _c0 = (a0, a1) => ({
  "filter-panel-show": a0,
  "filter-panel-hide": a1
});
const _c1 = (a0, a1, a2) => ({
  "pt-0": a0,
  "pt-0 md:pt-0": a1,
  "pt-[420px]": a2
});
function AppComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "span", 47)(3, "a", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "Debug Page");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "button", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_div_1_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.toggleFloatingDebug());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "button", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_div_1_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.toggleDebugMode());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"](" FastConnect v1.0 - Environnement: ", ctx_r1.debugInfo.environment, " - Base: ", ctx_r1.debugInfo.baseHref, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r1.showFloatingDebug ? "Cacher Infos" : "Afficher Infos", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" Mode Debug ", ctx_r1.isDebugEnabled ? "ON" : "OFF", " ");
  }
}
function AppComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 51, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_div_2_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.toggleDebugMode());
    })("mouseenter", function AppComponent_div_2_Template_div_mouseenter_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r3);
      const debugButton_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](1);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](debugButton_r4.style.opacity = "1");
    })("mouseleave", function AppComponent_div_2_Template_div_mouseleave_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r3);
      const debugButton_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](1);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](debugButton_r4.style.opacity = "0.6");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "button", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "i", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, " Debug ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function AppComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div")(1, "button", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_div_17_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.openLoginModal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "svg", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "path", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
}
function AppComponent_div_18_div_3_a_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "a", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_div_18_div_3_a_3_Template_a_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.toggleMenu());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Administration ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AppComponent_div_18_div_3_a_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "a", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_div_18_div_3_a_4_Template_a_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r9);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.toggleMenu());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Mon profil consultant ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AppComponent_div_18_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 60)(1, "a", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_div_18_div_3_Template_a_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.toggleMenu());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, " Mon profil ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, AppComponent_div_18_div_3_a_3_Template, 2, 0, "a", 62)(4, AppComponent_div_18_div_3_a_4_Template, 2, 0, "a", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](5, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "button", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_div_18_div_3_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.logout());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, " D\u00E9connexion ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.role) === "admin");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.role) === "consultant");
  }
}
function AppComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 57)(1, "button", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_div_18_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.toggleMenu());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, AppComponent_div_18_div_3_Template, 8, 2, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r1.getInitials(), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.menuOpen);
  }
}
function AppComponent_option_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "option", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const exp_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", exp_r10.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](exp_r10.label);
  }
}
function AppComponent_option_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "option", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const avail_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", avail_r11.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](avail_r11.label);
  }
}
function AppComponent_option_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "option", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const location_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", location_r12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](location_r12);
  }
}
function AppComponent_div_57_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 72)(1, "input", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("change", function AppComponent_div_57_div_2_Template_input_change_1_listener($event) {
      const skill_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r13).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      ctx_r1.toggleSkill(skill_r14);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event.stopPropagation());
    })("click", function AppComponent_div_57_div_2_Template_input_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r13);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "label", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_div_57_div_2_Template_label_click_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r13);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const skill_r14 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("id", "skill-" + skill_r14)("checked", ctx_r1.isSkillSelected(skill_r14));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("for", "skill-" + skill_r14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](skill_r14);
  }
}
function AppComponent_div_57_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 69)(1, "div", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, AppComponent_div_57_div_2_Template, 4, 4, "div", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r1.availableSkills);
  }
}
function AppComponent_option_65_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "option", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const exp_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", exp_r15.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](exp_r15.label);
  }
}
function AppComponent_option_72_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "option", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const avail_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", avail_r16.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](avail_r16.label);
  }
}
function AppComponent_option_79_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "option", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const location_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", location_r17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](location_r17);
  }
}
function AppComponent_div_88_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 72)(1, "input", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("change", function AppComponent_div_88_div_2_Template_input_change_1_listener($event) {
      const skill_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r18).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      ctx_r1.toggleSkill(skill_r19);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event.stopPropagation());
    })("click", function AppComponent_div_88_div_2_Template_input_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r18);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "label", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_div_88_div_2_Template_label_click_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r18);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const skill_r19 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("id", "mobile-skill-" + skill_r19)("checked", ctx_r1.isSkillSelected(skill_r19));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("for", "mobile-skill-" + skill_r19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](skill_r19);
  }
}
function AppComponent_div_88_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 75)(1, "div", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, AppComponent_div_88_div_2_Template, 4, 4, "div", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r1.availableSkills);
  }
}
function AppComponent_div_97_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_div_97_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r20);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.modalService.closeAllModals());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
class AppComponent {
  constructor(authService, router, modalService, consultantService) {
    this.authService = authService;
    this.router = router;
    this.modalService = modalService;
    this.consultantService = consultantService;
    this.title = 'FastConnect';
    this.currentUser = null;
    this.isAuthenticated = false;
    this.currentRoute = '';
    this.menuOpen = false;
    this.showFilterPanel = false; // Pour gérer l'affichage du panneau de filtres
    this.isDebugEnabled = true; // Par défaut, le débogage est activé
    this.showFloatingDebug = false; // Le débogueur flottant est désactivé par défaut
    this.debugElement = null;
    // Taille d'écran pour déterminer si on est en mobile ou desktop
    this.mobileBreakpoint = 768;
    // Variables pour les filtres dans le style LinkedIn
    this.searchText = '';
    this.selectedExperience = 'all';
    this.selectedAvailability = 'all';
    this.selectedLocation = 'all';
    this.selectedSkills = []; // Pour stocker les compétences sélectionnées
    this.availableLocations = [];
    this.availableSkills = []; // Pour stocker les compétences disponibles
    // États pour les dropdowns de compétences
    this.skillsDropdownOpen = false;
    this.mobileSkillsDropdownOpen = false;
    this.experienceOptions = [{
      value: 'less_than_3',
      label: 'Moins de 3 ans'
    }, {
      value: 'between_3_and_10',
      label: 'Entre 3 et 10 ans'
    }, {
      value: 'more_than_10',
      label: 'Plus de 10 ans'
    }];
    this.availabilityOptions = [{
      value: '0',
      label: 'Disponible maintenant'
    }, {
      value: '1',
      label: 'Disponible prochainement'
    }, {
      value: '2',
      label: 'Non disponible'
    }];
    this.debugInfo = {
      baseHref: document.getElementsByTagName('base')[0]?.getAttribute('href') || 'undefined',
      location: window.location.href,
      environment: _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.envName || 'undefined',
      apiUrl: _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl || 'undefined',
      routerUrl: '',
      isExtension: _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.isExtension,
      appStartTime: new Date().toISOString()
    };
    /**
     * Fonction pour fermer les dropdowns lorsqu'on clique ailleurs
     */
    this.closeSkillsDropdowns = event => {
      // Vérifier si le clic est dans un des dropdowns
      const desktopDropdown = document.querySelector('.skill-dropdown-desktop');
      const mobileDropdown = document.querySelector('.skill-dropdown-mobile');
      // Ne pas fermer si on a cliqué dans le dropdown
      if (desktopDropdown && desktopDropdown.contains(event.target) || mobileDropdown && mobileDropdown.contains(event.target)) {
        return;
      }
      this.skillsDropdownOpen = false;
      this.mobileSkillsDropdownOpen = false;
      document.removeEventListener('click', this.closeSkillsDropdowns);
    };
    console.log('🔍 FastConnect initialisation:', this.debugInfo);
    // Vérifier si le débogage est désactivé dans le localStorage
    const savedDebugState = localStorage.getItem('fastconnect-debug-enabled');
    if (savedDebugState !== null) {
      this.isDebugEnabled = savedDebugState === 'true';
    }
    const savedFloatingDebugState = localStorage.getItem('fastconnect-floating-debug');
    if (savedFloatingDebugState !== null) {
      this.showFloatingDebug = savedFloatingDebugState === 'true';
    }
    // Créer un élément pour le débogage visuel flottant
    setTimeout(() => {
      this.createFloatingDebugElement();
      this.updateFloatingDebugVisibility();
    }, 1000);
  }
  ngOnInit() {
    // Observer les changements d'état d'authentification
    this.authService.authState$.subscribe(state => {
      this.isAuthenticated = state.isAuthenticated;
      this.currentUser = state.user;
    });
    // Observer les changements de route
    this.router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_7__.NavigationEnd)).subscribe(event => {
      this.currentRoute = event.url;
      this.menuOpen = false; // Fermer le menu à chaque changement de route
    });
    // Charger les données pour les filtres
    this.loadFilterOptions();
  }
  /**
   * Charge les options disponibles pour les filtres
   */
  loadFilterOptions() {
    this.consultantService.getConsultants().subscribe(consultants => {
      // Extraire les localisations disponibles
      const locationsSet = new Set();
      // Extraire les compétences disponibles
      const skillsSet = new Set();
      consultants.forEach(consultant => {
        // Traitement des localisations
        if (consultant.location) {
          const locations = consultant.location.split(',').map(loc => loc.trim());
          locations.forEach(location => {
            locationsSet.add(location);
          });
        }
        // Traitement des compétences
        if (consultant.skills && Array.isArray(consultant.skills)) {
          // Si skills est déjà un tableau, on peut directement itérer dessus
          consultant.skills.forEach(skill => {
            if (skill) skillsSet.add(skill.trim());
          });
        }
      });
      this.availableLocations = Array.from(locationsSet).sort();
      this.availableSkills = Array.from(skillsSet).sort();
    });
  }
  /**
   * Gère le changement de texte dans la barre de recherche
   */
  onSearchTextChange() {
    // On émet un événement pour le composant de liste de consultants
    // qui utilisera cette valeur pour le filtrage
    const searchParams = {
      searchText: this.searchText
    };
    // Passer les paramètres de recherche via localStorage
    localStorage.setItem('fastconnect-search-params', JSON.stringify(searchParams));
    // Émettre un événement custom pour notifier les composants
    window.dispatchEvent(new CustomEvent('fastconnect-search-updated'));
  }
  /**
   * Gère l'application des filtres avancés
   */
  applyAdvancedFilters() {
    // On stocke les paramètres de filtrage que le composant de liste récupérera
    const filterParams = {
      searchText: this.searchText,
      selectedExperience: this.selectedExperience,
      selectedAvailability: this.selectedAvailability,
      selectedLocation: this.selectedLocation,
      selectedSkills: this.selectedSkills // Ajout des compétences sélectionnées
    };
    localStorage.setItem('fastconnect-filter-params', JSON.stringify(filterParams));
    // Émettre un événement custom pour notifier les composants
    window.dispatchEvent(new CustomEvent('fastconnect-filters-updated'));
    // Fermer le panneau de filtres
    this.showFilterPanel = false;
  }
  /**
   * Réinitialise tous les filtres
   */
  resetAllFilters() {
    this.searchText = '';
    this.selectedExperience = 'all';
    this.selectedAvailability = 'all';
    this.selectedLocation = 'all';
    this.selectedSkills = []; // Vider les compétences sélectionnées
    // Appliquer les filtres réinitialisés
    this.applyAdvancedFilters();
  }
  /**
   * Crée l'élément de débogage flottant
   */
  createFloatingDebugElement() {
    // Supprimer l'ancien élément s'il existe
    const existingDebugElement = document.getElementById('floating-debug-info');
    if (existingDebugElement) {
      document.body.removeChild(existingDebugElement);
    }
    // Créer un nouvel élément
    this.debugElement = document.createElement('div');
    this.debugElement.id = 'floating-debug-info';
    this.debugElement.style.position = 'fixed';
    this.debugElement.style.bottom = '10px';
    this.debugElement.style.left = '10px';
    this.debugElement.style.padding = '10px';
    this.debugElement.style.background = 'rgba(0,0,0,0.7)';
    this.debugElement.style.color = 'white';
    this.debugElement.style.fontSize = '12px';
    this.debugElement.style.fontFamily = 'monospace';
    this.debugElement.style.zIndex = '9999';
    this.debugElement.style.borderRadius = '5px';
    this.debugElement.style.transition = 'transform 0.3s ease';
    this.debugElement.style.display = this.showFloatingDebug ? 'block' : 'none';
    this.debugElement.innerHTML = `
      <strong>DEBUGGER</strong><br>
      Base: ${this.debugInfo.baseHref}<br>
      URL: ${this.debugInfo.location}<br>
      Env: ${this.debugInfo.environment}<br>
      API: ${this.debugInfo.apiUrl}<br>
      Ext: ${this.debugInfo.isExtension}<br>
      Time: ${this.debugInfo.appStartTime}<br>
    `;
    document.body.appendChild(this.debugElement);
  }
  /**
   * Met à jour la visibilité de l'élément de débogage flottant
   */
  updateFloatingDebugVisibility() {
    if (!this.debugElement) return;
    this.debugElement.style.display = this.showFloatingDebug ? 'block' : 'none';
  }
  /**
   * Active ou désactive le mode débogage
   */
  toggleDebugMode() {
    this.isDebugEnabled = !this.isDebugEnabled;
    localStorage.setItem('fastconnect-debug-enabled', this.isDebugEnabled.toString());
    // Mettre à jour les éléments visuels de débogage
    const headerDebug = document.getElementById('header-debug-bar');
    if (headerDebug) {
      headerDebug.style.display = this.isDebugEnabled ? 'block' : 'none';
    }
  }
  /**
   * Active ou désactive le débogueur flottant
   */
  toggleFloatingDebug() {
    this.showFloatingDebug = !this.showFloatingDebug;
    localStorage.setItem('fastconnect-floating-debug', this.showFloatingDebug.toString());
    this.updateFloatingDebugVisibility();
  }
  /**
   * Active ou désactive le panneau de filtres
   */
  toggleFilterPanel() {
    this.showFilterPanel = !this.showFilterPanel;
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  openLoginModal() {
    this.modalService.openLoginModal();
  }
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        // Au lieu de rediriger, on reste sur la même page
        this.menuOpen = false;
      },
      error: error => {
        console.error('Erreur lors de la déconnexion:', error);
        this.menuOpen = false;
      }
    });
  }
  /**
   * Retourne l'initiale du prénom ou du nom d'utilisateur pour l'affichage mobile
   * @returns Une lettre initiale ou 'U' par défaut
   */
  getInitials() {
    if (this.currentUser) {
      if (this.currentUser.firstName) {
        return this.currentUser.firstName.charAt(0);
      }
      if (this.currentUser.username) {
        return this.currentUser.username.charAt(0);
      }
    }
    return 'U';
  }
  /**
   * Détermine si l'affichage est en mode mobile
   * @returns true si la largeur d'écran est inférieure au point de rupture mobile
   */
  isMobileView() {
    return window.innerWidth < this.mobileBreakpoint;
  }
  /**
   * Ouvre/ferme le dropdown de compétences en mode desktop
   */
  toggleSkillsDropdown(event) {
    event.stopPropagation();
    this.skillsDropdownOpen = !this.skillsDropdownOpen;
    this.mobileSkillsDropdownOpen = false; // Ferme le dropdown mobile si ouvert
    // Ajouter un écouteur d'événement au document pour fermer le dropdown quand on clique ailleurs
    if (this.skillsDropdownOpen) {
      setTimeout(() => {
        document.addEventListener('click', this.closeSkillsDropdowns);
      }, 0);
    }
  }
  /**
   * Ouvre/ferme le dropdown de compétences en mode mobile
   */
  toggleMobileSkillsDropdown(event) {
    event.stopPropagation();
    this.mobileSkillsDropdownOpen = !this.mobileSkillsDropdownOpen;
    this.skillsDropdownOpen = false; // Ferme le dropdown desktop si ouvert
    // Ajouter un écouteur d'événement au document pour fermer le dropdown quand on clique ailleurs
    if (this.mobileSkillsDropdownOpen) {
      setTimeout(() => {
        document.addEventListener('click', this.closeSkillsDropdowns);
      }, 0);
    }
  }
  /**
   * Vérifie si une compétence est déjà sélectionnée
   */
  isSkillSelected(skill) {
    return this.selectedSkills.includes(skill);
  }
  /**
   * Ajoute ou retire une compétence de la sélection
   */
  toggleSkill(skill) {
    const index = this.selectedSkills.indexOf(skill);
    if (index === -1) {
      // Ajouter la compétence si elle n'est pas déjà sélectionnée
      this.selectedSkills.push(skill);
    } else {
      // Retirer la compétence si elle est déjà sélectionnée
      this.selectedSkills.splice(index, 1);
    }
  }
  static {
    this.ɵfac = function AppComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_modal_service__WEBPACK_IMPORTED_MODULE_2__.ModalService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_consultant_service__WEBPACK_IMPORTED_MODULE_3__.ConsultantService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      standalone: false,
      decls: 98,
      vars: 31,
      consts: [["debugButton", ""], [1, "flex", "justify-center", "w-full", "h-screen", "flex-col", "overflow-hidden"], ["id", "header-debug-bar", "style", "position: fixed; top: 0; left: 0; right: 0; background-color: #2563eb; color: white; padding: 5px; text-align: center; font-size: 14px; z-index: 9999;", 4, "ngIf"], ["style", "position: fixed; bottom: 10px; right: 10px; z-index: 9999; opacity: 0.6; transition: opacity 0.3s ease; cursor: pointer;", 3, "click", "mouseenter", "mouseleave", 4, "ngIf"], [1, "w-full", "max-w-3xl", "mx-auto", "flex", "flex-col", "h-full"], [1, "bg-white", "p-2", "shadow-sm", "z-40", "mt-8", "sticky", "top-0"], [1, "flex", "items-center", "justify-between", "space-x-2", "px-1"], [1, "relative", "flex-grow"], ["type", "text", "placeholder", "Rechercher un consultant...", 1, "w-full", "pl-8", "pr-2", "py-2", "rounded-md", "border", "border-gray-300", "focus:outline-none", "focus:ring-1", "focus:ring-blue-500", "text-sm", "bg-gray-50", 3, "ngModelChange", "keyup", "ngModel"], [1, "absolute", "inset-y-0", "left-2", "flex", "items-center", "pointer-events-none"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 20 20", "fill", "currentColor", 1, "h-4", "w-4", "text-gray-400"], ["fill-rule", "evenodd", "d", "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z", "clip-rule", "evenodd"], [1, "flex", "items-center", "justify-center", "gap-1", "px-2", "py-1.5", "rounded-md", "bg-gray-50", "hover:bg-gray-100", "transition-colors", "duration-150", "h-8", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", "xmlns", "http://www.w3.org/2000/svg", 1, "h-4", "w-4", "text-gray-600"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"], [1, "text-xs", "text-gray-600", "hidden", "md:inline"], [1, "flex", "items-center"], [4, "ngIf"], ["class", "relative", 4, "ngIf"], [1, "w-full", "bg-white", "shadow-md", "filter-panel", "py-4", "px-4", "overflow-hidden", "border-t", "md:border-t", "border-gray-200", 3, "ngClass"], [1, "space-y-4", "max-w-3xl", "mx-auto"], [1, "flex", "justify-between", "items-center"], [1, "font-medium", "text-sm", "text-gray-700"], [1, "text-gray-400", "hover:text-gray-600", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", "xmlns", "http://www.w3.org/2000/svg", 1, "h-4", "w-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], [1, "hidden", "md:flex", "md:flex-row", "md:gap-3", "md:items-end"], [1, "flex-1", "min-w-0"], [1, "block", "text-xs", "font-medium", "text-gray-600", "mb-1.5"], [1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "text-sm", "text-gray-700", "focus:outline-none", "focus:ring-1", "focus:ring-blue-500", 3, "ngModelChange", "ngModel"], ["value", "all"], [3, "value", 4, "ngFor", "ngForOf"], [1, "flex-1", "min-w-0", "relative"], [1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "text-sm", "text-gray-700", "focus:outline-none", "focus:ring-1", "focus:ring-blue-500", "cursor-pointer", "flex", "justify-between", "items-center", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", "xmlns", "http://www.w3.org/2000/svg", 1, "h-4", "w-4", "text-gray-500"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 9l-7 7-7-7"], ["class", "absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto skill-dropdown-desktop", 4, "ngIf"], [1, "grid", "grid-cols-1", "gap-4", "md:hidden"], [1, "mb-2"], [1, "mb-2", "relative"], ["class", "absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto skill-dropdown-mobile", 4, "ngIf"], [1, "pt-3", "flex", "justify-end", "space-x-3"], [1, "px-4", "py-2", "text-xs", "text-gray-700", "border", "border-gray-300", "rounded-md", "hover:bg-gray-50", "transition-colors", "duration-150", 3, "click"], [1, "px-4", "py-2", "text-xs", "text-white", "bg-blue-600", "rounded-md", "hover:bg-blue-700", "transition-colors", "duration-150", 3, "click"], [1, "transition-all", "duration-300", "ease-in-out", 3, "ngClass"], ["class", "fixed inset-0 bg-black bg-opacity-50 z-40", 3, "click", 4, "ngIf"], ["id", "header-debug-bar", 2, "position", "fixed", "top", "0", "left", "0", "right", "0", "background-color", "#2563eb", "color", "white", "padding", "5px", "text-align", "center", "font-size", "14px", "z-index", "9999"], [1, "ml-2", "text-yellow-200"], ["routerLink", "/debug", 1, "underline", "hover:text-white", "mr-2"], ["title", "Activer/d\u00E9sactiver le panneau de d\u00E9bogage flottant", 1, "px-2", "py-0.5", "bg-indigo-700", "rounded-sm", "text-xs", "hover:bg-indigo-800", "mr-1", 3, "click"], ["title", "D\u00E9sactiver compl\u00E8tement le mode d\u00E9bogage", 1, "px-2", "py-0.5", "bg-red-700", "rounded-sm", "text-xs", "hover:bg-red-800", 3, "click"], [2, "position", "fixed", "bottom", "10px", "right", "10px", "z-index", "9999", "opacity", "0.6", "transition", "opacity 0.3s ease", "cursor", "pointer", 3, "click", "mouseenter", "mouseleave"], [1, "px-2", "py-1", "bg-gray-800", "text-white", "rounded", "text-xs"], [1, "fas", "fa-bug", "mr-1"], [1, "rounded-full", "p-1", "bg-white", "hover:bg-gray-50", "border", "border-gray-300", "flex", "items-center", "justify-center", "w-8", "h-8", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", "xmlns", "http://www.w3.org/2000/svg", 1, "h-5", "w-5", "text-gray-600"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"], [1, "relative"], ["aria-expanded", "false", 1, "rounded-full", "p-0", "flex", "items-center", "justify-center", "overflow-hidden", "w-8", "h-8", "text-sm", "font-medium", "text-white", "bg-indigo-600", "hover:bg-indigo-700", "transition-colors", "duration-150", "focus:outline-none", 3, "click"], ["class", "absolute right-0 mt-2 w-40 md:w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5", 4, "ngIf"], [1, "absolute", "right-0", "mt-2", "w-40", "md:w-48", "bg-white", "rounded-md", "shadow-lg", "py-1", "z-50", "ring-1", "ring-black", "ring-opacity-5"], ["routerLink", "/profile", 1, "block", "px-3", "md:px-4", "py-2", "text-xs", "md:text-sm", "text-gray-700", "hover:bg-gray-100", "transition", "duration-150", 3, "click"], ["routerLink", "/admin", "class", "block px-3 md:px-4 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100 transition duration-150", 3, "click", 4, "ngIf"], ["routerLink", "/consultant-profile", "class", "block px-3 md:px-4 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100 transition duration-150", 3, "click", 4, "ngIf"], [1, "border-t", "border-gray-100", "my-1"], [1, "block", "w-full", "text-left", "px-3", "md:px-4", "py-2", "text-xs", "md:text-sm", "text-red-600", "hover:bg-gray-100", "transition", "duration-150", 3, "click"], ["routerLink", "/admin", 1, "block", "px-3", "md:px-4", "py-2", "text-xs", "md:text-sm", "text-gray-700", "hover:bg-gray-100", "transition", "duration-150", 3, "click"], ["routerLink", "/consultant-profile", 1, "block", "px-3", "md:px-4", "py-2", "text-xs", "md:text-sm", "text-gray-700", "hover:bg-gray-100", "transition", "duration-150", 3, "click"], [3, "value"], [1, "absolute", "z-50", "w-full", "mt-1", "bg-white", "border", "border-gray-300", "rounded-md", "shadow-lg", "max-h-60", "overflow-y-auto", "skill-dropdown-desktop"], [1, "p-2"], ["class", "flex items-center py-1", 4, "ngFor", "ngForOf"], [1, "flex", "items-center", "py-1"], ["type", "checkbox", 1, "h-4", "w-4", "text-blue-600", "border-gray-300", "rounded", "focus:ring-blue-500", 3, "change", "click", "id", "checked"], [1, "ml-2", "text-sm", "text-gray-700", "cursor-pointer", 3, "click", "for"], [1, "absolute", "z-50", "w-full", "mt-1", "bg-white", "border", "border-gray-300", "rounded-md", "shadow-lg", "max-h-60", "overflow-y-auto", "skill-dropdown-mobile"], [1, "fixed", "inset-0", "bg-black", "bg-opacity-50", "z-40", 3, "click"]],
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, AppComponent_div_1_Template, 9, 4, "div", 2)(2, AppComponent_div_2_Template, 5, 0, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 4)(4, "div", 5)(5, "div", 6)(6, "div", 7)(7, "input", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function AppComponent_Template_input_ngModelChange_7_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.searchText, $event) || (ctx.searchText = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("keyup", function AppComponent_Template_input_keyup_7_listener() {
            return ctx.onSearchTextChange();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "div", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "svg", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](10, "path", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "button", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_Template_button_click_11_listener() {
            return ctx.toggleFilterPanel();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "svg", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](13, "path", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "span", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](15, "Filtres avanc\u00E9s");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "div", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](17, AppComponent_div_17_Template, 4, 0, "div", 17)(18, AppComponent_div_18_Template, 4, 2, "div", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "div", 19)(20, "div", 20)(21, "div", 21)(22, "h3", 22);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](23, "Filtres avanc\u00E9s");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "button", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_Template_button_click_24_listener() {
            return ctx.toggleFilterPanel();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](25, "svg", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](26, "path", 25);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](27, "div", 26)(28, "div", 27)(29, "label", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](30, "Exp\u00E9rience");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](31, "select", 29);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function AppComponent_Template_select_ngModelChange_31_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.selectedExperience, $event) || (ctx.selectedExperience = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](32, "option", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](33, "Tout niveau");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](34, AppComponent_option_34_Template, 2, 2, "option", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](35, "div", 27)(36, "label", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](37, "Disponibilit\u00E9");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](38, "select", 29);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function AppComponent_Template_select_ngModelChange_38_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.selectedAvailability, $event) || (ctx.selectedAvailability = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](39, "option", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](40, "Toutes");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](41, AppComponent_option_41_Template, 2, 2, "option", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](42, "div", 27)(43, "label", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](44, "Localisation");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](45, "select", 29);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function AppComponent_Template_select_ngModelChange_45_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.selectedLocation, $event) || (ctx.selectedLocation = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](46, "option", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](47, "Toutes");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](48, AppComponent_option_48_Template, 2, 2, "option", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](49, "div", 32)(50, "label", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](51, "Comp\u00E9tences");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](52, "div", 33);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_Template_div_click_52_listener($event) {
            return ctx.toggleSkillsDropdown($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](53, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](54);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](55, "svg", 34);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](56, "path", 35);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](57, AppComponent_div_57_Template, 3, 1, "div", 36);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](58, "div", 37)(59, "div", 38)(60, "label", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](61, "Exp\u00E9rience");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](62, "select", 29);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function AppComponent_Template_select_ngModelChange_62_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.selectedExperience, $event) || (ctx.selectedExperience = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](63, "option", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](64, "Tout niveau");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](65, AppComponent_option_65_Template, 2, 2, "option", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](66, "div", 38)(67, "label", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](68, "Disponibilit\u00E9");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](69, "select", 29);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function AppComponent_Template_select_ngModelChange_69_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.selectedAvailability, $event) || (ctx.selectedAvailability = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](70, "option", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](71, "Toutes");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](72, AppComponent_option_72_Template, 2, 2, "option", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](73, "div", 38)(74, "label", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](75, "Localisation");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](76, "select", 29);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function AppComponent_Template_select_ngModelChange_76_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.selectedLocation, $event) || (ctx.selectedLocation = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](77, "option", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](78, "Toutes");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](79, AppComponent_option_79_Template, 2, 2, "option", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](80, "div", 39)(81, "label", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](82, "Comp\u00E9tences");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](83, "div", 33);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_Template_div_click_83_listener($event) {
            return ctx.toggleMobileSkillsDropdown($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](84, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](85);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](86, "svg", 34);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](87, "path", 35);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](88, AppComponent_div_88_Template, 3, 1, "div", 40);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](89, "div", 41)(90, "button", 42);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_Template_button_click_90_listener() {
            return ctx.resetAllFilters();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](91, " R\u00E9initialiser ");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](92, "button", 43);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_Template_button_click_92_listener() {
            return ctx.applyAdvancedFilters();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](93, " Appliquer ");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](94, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](95, "router-outlet");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](96, "app-login");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](97, AppComponent_div_97_Template, 1, 0, "div", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.isDebugEnabled);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.isDebugEnabled);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.searchText);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](10);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.isAuthenticated);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.isAuthenticated);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction2"](24, _c0, ctx.showFilterPanel, !ctx.showFilterPanel));
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](12);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.selectedExperience);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.experienceOptions);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.selectedAvailability);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.availabilityOptions);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.selectedLocation);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.availableLocations);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.selectedSkills.length ? ctx.selectedSkills.length + " comp\u00E9tence(s)" : "Comp\u00E9tences");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.skillsDropdownOpen);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.selectedExperience);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.experienceOptions);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.selectedAvailability);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.availabilityOptions);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.selectedLocation);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.availableLocations);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.selectedSkills.length ? ctx.selectedSkills.length + " comp\u00E9tence(s)" : "Comp\u00E9tences");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.mobileSkillsDropdownOpen);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction3"](27, _c1, !ctx.showFilterPanel, ctx.showFilterPanel, ctx.showFilterPanel && ctx.isMobileView()));
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.modalService.isModalBackdropVisible);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterOutlet, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLink, _components_auth_login_login_component__WEBPACK_IMPORTED_MODULE_4__.LoginComponent],
      styles: [".status-indicator[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  display: inline-block;\n}\n\n.status-available[_ngcontent-%COMP%] {\n  background-color: #10B981; \n\n}\n\n.status-soon[_ngcontent-%COMP%] {\n  background-color: #F59E0B; \n\n}\n\n.status-unavailable[_ngcontent-%COMP%] {\n  background-color: #EF4444; \n\n}\n\n\n\n.skill-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.25rem;\n  font-size: 0.75rem;\n  background-color: #3B82F6; \n\n  color: white;\n  margin-right: 0.25rem;\n  margin-bottom: 0.25rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n\n.skill-badge[_ngcontent-%COMP%]:hover {\n  background-color: #2563EB; \n\n  transform: translateY(-1px);\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n\n\n.message-panel[_ngcontent-%COMP%] {\n  border-top: 1px solid #F3F4F6; \n\n}\n\n\n\n.action-button[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 9999px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  cursor: pointer;\n}\n\n.linkedin-button[_ngcontent-%COMP%] {\n  background-color: #E0F2FE; \n\n  color: #2563EB; \n\n}\n\n.linkedin-button[_ngcontent-%COMP%]:hover {\n  background-color: #BFDBFE; \n\n}\n\n.phone-button[_ngcontent-%COMP%] {\n  background-color: #DCFCE7; \n\n  color: #16A34A; \n\n}\n\n.phone-button[_ngcontent-%COMP%]:hover {\n  background-color: #BBF7D0; \n\n}\n\n.email-button[_ngcontent-%COMP%] {\n  background-color: #FEF3C7; \n\n  color: #D97706; \n\n}\n\n.email-button[_ngcontent-%COMP%]:hover {\n  background-color: #FDE68A; \n\n}\n\n\n\n.contact-button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 0.75rem;\n  font-size: 0.875rem;\n  border-radius: 0.375rem;\n  background-color: white;\n  border: 1px solid #E5E7EB; \n\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.contact-button[_ngcontent-%COMP%]:hover {\n  background-color: #F9FAFB; \n\n}\n\n\n\n[_nghost-%COMP%]     .text-blue-600 {\n  color: #2563EB;\n  cursor: pointer;\n}\n\n[_nghost-%COMP%]     .text-blue-600:hover {\n  text-decoration: underline;\n}\n\n\n\n.truncated[_ngcontent-%COMP%] {\n  max-height: 80px;\n  overflow: hidden;\n  position: relative;\n}\n\n.bg-gradient-overlay[_ngcontent-%COMP%] {\n  background: linear-gradient(to bottom, transparent 60%, white);\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 40px;\n  pointer-events: none;\n}\n\n\n\n.bg-gradient-overlay[_ngcontent-%COMP%] {\n  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);\n}\n\n\n\n.filter-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.25rem 0.75rem;\n  background-color: #EFF6FF; \n\n  color: #2563EB; \n\n  border-radius: 9999px;\n  font-size: 0.875rem;\n  margin-right: 0.5rem;\n  margin-bottom: 0.5rem;\n  transition: all 0.3s ease;\n}\n\n.filter-pill[_ngcontent-%COMP%]:hover {\n  background-color: #DBEAFE; \n\n}\n\n.filter-pill[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%] {\n  margin-left: 0.25rem;\n  width: 1rem;\n  height: 1rem;\n  opacity: 0.5;\n  transition: opacity 0.3s ease;\n}\n\n.filter-pill[_ngcontent-%COMP%]:hover   .close-icon[_ngcontent-%COMP%] {\n  opacity: 0.8;\n}\n\n\n\n.filter-dropdown[_ngcontent-%COMP%] {\n  transition: all 0.3s ease;\n  opacity: 0;\n  transform: translateY(-10px);\n  visibility: hidden;\n}\n\n.filter-dropdown.show[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: translateY(0);\n  visibility: visible;\n}\n\n\n\n.filter-panel[_ngcontent-%COMP%] {\n  transform-origin: top center;\n  box-shadow: 0 2px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n  transition: max-height 0.3s ease-in-out, opacity 0.25s ease-in-out, visibility 0.25s ease-in-out, padding 0.25s ease;\n  position: relative;\n  width: 100%;\n  max-width: 100%;\n  z-index: 20;\n  max-height: 0;\n  padding-top: 0 !important;\n  padding-bottom: 0 !important;\n  overflow: hidden;\n}\n\n.filter-panel-show[_ngcontent-%COMP%] {\n  max-height: 400px; \n\n  padding-top: 1rem !important;\n  padding-bottom: 1rem !important;\n  opacity: 1;\n  visibility: visible;\n  overflow: visible; \n\n}\n\n.filter-panel-hide[_ngcontent-%COMP%] {\n  max-height: 0;\n  opacity: 0;\n  visibility: hidden;\n  pointer-events: none;\n}\n\n\n\n.filter-panel-spacer-visible[_ngcontent-%COMP%] {\n  height: 200px; \n\n  transition: height 0.3s ease;\n}\n\n.filter-panel-spacer-hidden[_ngcontent-%COMP%] {\n  height: 0;\n  transition: height 0.3s ease;\n}\n\n\n\n@media (max-width: 768px) {\n  .filter-panel[_ngcontent-%COMP%] {\n    position: fixed; \n\n    top: 56px; \n\n    left: 0;\n    right: 0;\n    z-index: 30; \n\n    border-top: none; \n\n    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); \n\n  }\n  \n  .filter-panel-spacer-visible[_ngcontent-%COMP%] {\n    height: 420px; \n\n  }\n  \n  .filter-panel-show[_ngcontent-%COMP%] {\n    max-height: 700px; \n\n    border-top: none; \n\n  }\n}\n\n\n\n@media (max-width: 640px) {\n  .skill-badge[_ngcontent-%COMP%] {\n    padding: 0.125rem 0.375rem;\n    font-size: 0.7rem;\n  }\n  \n  .filter-section[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  \n  .filter-item[_ngcontent-%COMP%] {\n    width: 100%;\n    margin-bottom: 0.5rem;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UseUJBQXlCLEVBQUUsY0FBYztBQUMzQzs7QUFFQTtFQUNFLHlCQUF5QixFQUFFLGVBQWU7QUFDNUM7O0FBRUE7RUFDRSx5QkFBeUIsRUFBRSxZQUFZO0FBQ3pDOztBQUVBLDBDQUEwQztBQUMxQztFQUNFLHFCQUFxQjtFQUNyQix1QkFBdUI7RUFDdkIsc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQix5QkFBeUIsRUFBRSxhQUFhO0VBQ3hDLFlBQVk7RUFDWixxQkFBcUI7RUFDckIsc0JBQXNCO0VBQ3RCLGdCQUFnQjtFQUNoQix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUIsRUFBRSxhQUFhO0VBQ3hDLDJCQUEyQjtFQUMzQix3Q0FBd0M7QUFDMUM7O0FBRUEsMEJBQTBCO0FBQzFCO0VBQ0UsNkJBQTZCLEVBQUUsYUFBYTtBQUM5Qzs7QUFFQSwrQkFBK0I7QUFDL0I7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLHFCQUFxQjtFQUNyQixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osZUFBZTtBQUNqQjs7QUFFQTtFQUNFLHlCQUF5QixFQUFFLGFBQWE7RUFDeEMsY0FBYyxFQUFFLGFBQWE7QUFDL0I7O0FBRUE7RUFDRSx5QkFBeUIsRUFBRSxhQUFhO0FBQzFDOztBQUVBO0VBQ0UseUJBQXlCLEVBQUUsY0FBYztFQUN6QyxjQUFjLEVBQUUsY0FBYztBQUNoQzs7QUFFQTtFQUNFLHlCQUF5QixFQUFFLGNBQWM7QUFDM0M7O0FBRUE7RUFDRSx5QkFBeUIsRUFBRSxjQUFjO0VBQ3pDLGNBQWMsRUFBRSxjQUFjO0FBQ2hDOztBQUVBO0VBQ0UseUJBQXlCLEVBQUUsY0FBYztBQUMzQzs7QUFFQSxzQ0FBc0M7QUFDdEM7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLFdBQVc7RUFDWCx1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2Qix1QkFBdUI7RUFDdkIseUJBQXlCLEVBQUUsYUFBYTtFQUN4QyxlQUFlO0VBQ2Ysb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UseUJBQXlCLEVBQUUsWUFBWTtBQUN6Qzs7QUFFQSxtQ0FBbUM7QUFDbkM7RUFDRSxjQUFjO0VBQ2QsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLDBCQUEwQjtBQUM1Qjs7QUFFQSw4QkFBOEI7QUFDOUI7RUFDRSxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLDhEQUE4RDtFQUM5RCxrQkFBa0I7RUFDbEIsU0FBUztFQUNULE9BQU87RUFDUCxRQUFRO0VBQ1IsWUFBWTtFQUNaLG9CQUFvQjtBQUN0Qjs7QUFFQSxrQkFBa0I7QUFDbEI7RUFDRSw4RkFBOEY7QUFDaEc7O0FBRUEsMkNBQTJDO0FBQzNDO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQix3QkFBd0I7RUFDeEIseUJBQXlCLEVBQUUsWUFBWTtFQUN2QyxjQUFjLEVBQUUsYUFBYTtFQUM3QixxQkFBcUI7RUFDckIsbUJBQW1CO0VBQ25CLG9CQUFvQjtFQUNwQixxQkFBcUI7RUFDckIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCLEVBQUUsYUFBYTtBQUMxQzs7QUFFQTtFQUNFLG9CQUFvQjtFQUNwQixXQUFXO0VBQ1gsWUFBWTtFQUNaLFlBQVk7RUFDWiw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUEscUJBQXFCO0FBQ3JCO0VBQ0UseUJBQXlCO0VBQ3pCLFVBQVU7RUFDViw0QkFBNEI7RUFDNUIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsVUFBVTtFQUNWLHdCQUF3QjtFQUN4QixtQkFBbUI7QUFDckI7O0FBRUEsc0NBQXNDO0FBQ3RDO0VBQ0UsNEJBQTRCO0VBQzVCLGlGQUFpRjtFQUNqRixvSEFBb0g7RUFDcEgsa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxlQUFlO0VBQ2YsV0FBVztFQUNYLGFBQWE7RUFDYix5QkFBeUI7RUFDekIsNEJBQTRCO0VBQzVCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGlCQUFpQixFQUFFLHNEQUFzRDtFQUN6RSw0QkFBNEI7RUFDNUIsK0JBQStCO0VBQy9CLFVBQVU7RUFDVixtQkFBbUI7RUFDbkIsaUJBQWlCLEVBQUUsZ0RBQWdEO0FBQ3JFOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFVBQVU7RUFDVixrQkFBa0I7RUFDbEIsb0JBQW9CO0FBQ3RCOztBQUVBLG9EQUFvRDtBQUNwRDtFQUNFLGFBQWEsRUFBRSxrREFBa0Q7RUFDakUsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UsU0FBUztFQUNULDRCQUE0QjtBQUM5Qjs7QUFFQSx1Q0FBdUM7QUFDdkM7RUFDRTtJQUNFLGVBQWUsRUFBRSxtRUFBbUU7SUFDcEYsU0FBUyxFQUFFLDZDQUE2QztJQUN4RCxPQUFPO0lBQ1AsUUFBUTtJQUNSLFdBQVcsRUFBRSw2RUFBNkU7SUFDMUYsZ0JBQWdCLEVBQUUsOEJBQThCO0lBQ2hELHlDQUF5QyxFQUFFLHVCQUF1QjtFQUNwRTs7RUFFQTtJQUNFLGFBQWEsRUFBRSx1RUFBdUU7RUFDeEY7O0VBRUE7SUFDRSxpQkFBaUIsRUFBRSwyRUFBMkU7SUFDOUYsZ0JBQWdCLEVBQUUsOERBQThEO0VBQ2xGO0FBQ0Y7O0FBRUEsMkJBQTJCO0FBQzNCO0VBQ0U7SUFDRSwwQkFBMEI7SUFDMUIsaUJBQWlCO0VBQ25COztFQUVBO0lBQ0Usc0JBQXNCO0VBQ3hCOztFQUVBO0lBQ0UsV0FBVztJQUNYLHFCQUFxQjtFQUN2QjtBQUNGIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnN0YXR1cy1pbmRpY2F0b3Ige1xuICB3aWR0aDogMTBweDtcbiAgaGVpZ2h0OiAxMHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxuLnN0YXR1cy1hdmFpbGFibGUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTBCOTgxOyAvKiBncmVlbi01MDAgKi9cbn1cblxuLnN0YXR1cy1zb29uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0Y1OUUwQjsgLyogeWVsbG93LTUwMCAqL1xufVxuXG4uc3RhdHVzLXVuYXZhaWxhYmxlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0VGNDQ0NDsgLyogcmVkLTUwMCAqL1xufVxuXG4vKiBTa2lsbCBiYWRnZXMgLSBibHVlIHJlY3Rhbmd1bGFyIHBpbGxzICovXG4uc2tpbGwtYmFkZ2Uge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBhZGRpbmc6IDAuMjVyZW0gMC41cmVtO1xuICBib3JkZXItcmFkaXVzOiAwLjI1cmVtO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICMzQjgyRjY7IC8qIGJsdWUtNTAwICovXG4gIGNvbG9yOiB3aGl0ZTtcbiAgbWFyZ2luLXJpZ2h0OiAwLjI1cmVtO1xuICBtYXJnaW4tYm90dG9tOiAwLjI1cmVtO1xuICBmb250LXdlaWdodDogNTAwO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xufVxuXG4uc2tpbGwtYmFkZ2U6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjU2M0VCOyAvKiBibHVlLTYwMCAqL1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTFweCk7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi8qIE1lc3NhZ2UgcGFuZWwgc3R5bGluZyAqL1xuLm1lc3NhZ2UtcGFuZWwge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI0YzRjRGNjsgLyogZ3JheS0xMDAgKi9cbn1cblxuLyogQWN0aW9uIGJ1dHRvbnMgZm9yIGRlc2t0b3AgKi9cbi5hY3Rpb24tYnV0dG9uIHtcbiAgd2lkdGg6IDJyZW07XG4gIGhlaWdodDogMnJlbTtcbiAgYm9yZGVyLXJhZGl1czogOTk5OXB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYm9yZGVyOiBub25lO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5saW5rZWRpbi1idXR0b24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRTBGMkZFOyAvKiBibHVlLTEwMCAqL1xuICBjb2xvcjogIzI1NjNFQjsgLyogYmx1ZS02MDAgKi9cbn1cblxuLmxpbmtlZGluLWJ1dHRvbjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNCRkRCRkU7IC8qIGJsdWUtMjAwICovXG59XG5cbi5waG9uZS1idXR0b24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRENGQ0U3OyAvKiBncmVlbi0xMDAgKi9cbiAgY29sb3I6ICMxNkEzNEE7IC8qIGdyZWVuLTYwMCAqL1xufVxuXG4ucGhvbmUtYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0JCRjdEMDsgLyogZ3JlZW4tMjAwICovXG59XG5cbi5lbWFpbC1idXR0b24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkVGM0M3OyAvKiBhbWJlci0xMDAgKi9cbiAgY29sb3I6ICNEOTc3MDY7IC8qIGFtYmVyLTYwMCAqL1xufVxuXG4uZW1haWwtYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZERTY4QTsgLyogYW1iZXItMjAwICovXG59XG5cbi8qIENvbnRhY3QgYnV0dG9ucyBmb3IgbW9iaWxlL3RhYmxldCAqL1xuLmNvbnRhY3QtYnV0dG9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAwLjVyZW07XG4gIHBhZGRpbmc6IDAuNXJlbSAwLjc1cmVtO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBib3JkZXItcmFkaXVzOiAwLjM3NXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNFNUU3RUI7IC8qIGdyYXktMjAwICovXG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnM7XG59XG5cbi5jb250YWN0LWJ1dHRvbjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGOUZBRkI7IC8qIGdyYXktNTAgKi9cbn1cblxuLyogU3R5bGUgZm9yIGhhc2h0YWdzIGluIG1lc3NhZ2VzICovXG46aG9zdCA6Om5nLWRlZXAgLnRleHQtYmx1ZS02MDAge1xuICBjb2xvcjogIzI1NjNFQjtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG46aG9zdCA6Om5nLWRlZXAgLnRleHQtYmx1ZS02MDA6aG92ZXIge1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1cblxuLyogTWVzc2FnZSB0cnVuY2F0aW9uIHN0eWxlcyAqL1xuLnRydW5jYXRlZCB7XG4gIG1heC1oZWlnaHQ6IDgwcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmJnLWdyYWRpZW50LW92ZXJsYXkge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCB0cmFuc3BhcmVudCA2MCUsIHdoaXRlKTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBoZWlnaHQ6IDQwcHg7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuXG4vKiBGaWx0ZXIgc3R5bGVzICovXG4uYmctZ3JhZGllbnQtb3ZlcmxheSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sIHJnYmEoMjU1LCAyNTUsIDI1NSwgMCkgMCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMSkgMTAwJSk7XG59XG5cbi8qIEZpbHRlciBjaGlwcy9waWxscyBmb3Igc2VsZWN0ZWQgc2tpbGxzICovXG4uZmlsdGVyLXBpbGwge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogMC4yNXJlbSAwLjc1cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUZGNkZGOyAvKiBibHVlLTUwICovXG4gIGNvbG9yOiAjMjU2M0VCOyAvKiBibHVlLTYwMCAqL1xuICBib3JkZXItcmFkaXVzOiA5OTk5cHg7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIG1hcmdpbi1yaWdodDogMC41cmVtO1xuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG59XG5cbi5maWx0ZXItcGlsbDpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNEQkVBRkU7IC8qIGJsdWUtMTAwICovXG59XG5cbi5maWx0ZXItcGlsbCAuY2xvc2UtaWNvbiB7XG4gIG1hcmdpbi1sZWZ0OiAwLjI1cmVtO1xuICB3aWR0aDogMXJlbTtcbiAgaGVpZ2h0OiAxcmVtO1xuICBvcGFjaXR5OiAwLjU7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBlYXNlO1xufVxuXG4uZmlsdGVyLXBpbGw6aG92ZXIgLmNsb3NlLWljb24ge1xuICBvcGFjaXR5OiAwLjg7XG59XG5cbi8qIERyb3Bkb3duIHN0eWxpbmcgKi9cbi5maWx0ZXItZHJvcGRvd24ge1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xuICBvcGFjaXR5OiAwO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwcHgpO1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG59XG5cbi5maWx0ZXItZHJvcGRvd24uc2hvdyB7XG4gIG9wYWNpdHk6IDE7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbn1cblxuLyogU3R5bGVzIHBvdXIgbGUgcGFubmVhdSBkZSBmaWx0cmVzICovXG4uZmlsdGVyLXBhbmVsIHtcbiAgdHJhbnNmb3JtLW9yaWdpbjogdG9wIGNlbnRlcjtcbiAgYm94LXNoYWRvdzogMCAycHggNnB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDJweCA0cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMDYpO1xuICB0cmFuc2l0aW9uOiBtYXgtaGVpZ2h0IDAuM3MgZWFzZS1pbi1vdXQsIG9wYWNpdHkgMC4yNXMgZWFzZS1pbi1vdXQsIHZpc2liaWxpdHkgMC4yNXMgZWFzZS1pbi1vdXQsIHBhZGRpbmcgMC4yNXMgZWFzZTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMTAwJTtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICB6LWluZGV4OiAyMDtcbiAgbWF4LWhlaWdodDogMDtcbiAgcGFkZGluZy10b3A6IDAgIWltcG9ydGFudDtcbiAgcGFkZGluZy1ib3R0b206IDAgIWltcG9ydGFudDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLmZpbHRlci1wYW5lbC1zaG93IHtcbiAgbWF4LWhlaWdodDogNDAwcHg7IC8qIEhhdXRldXIgcGFyIGTDqWZhdXQgcG91ciBkZXNrdG9wICh1bmUgc2V1bGUgbGlnbmUpICovXG4gIHBhZGRpbmctdG9wOiAxcmVtICFpbXBvcnRhbnQ7XG4gIHBhZGRpbmctYm90dG9tOiAxcmVtICFpbXBvcnRhbnQ7XG4gIG9wYWNpdHk6IDE7XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIG92ZXJmbG93OiB2aXNpYmxlOyAvKiBQZXJtZXQgYXUgY29udGVudSBkZSBkw6lib3JkZXIgc2kgbsOpY2Vzc2FpcmUgKi9cbn1cblxuLmZpbHRlci1wYW5lbC1oaWRlIHtcbiAgbWF4LWhlaWdodDogMDtcbiAgb3BhY2l0eTogMDtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuLyogRXNwYWNlIHLDqXNlcnbDqSBwb3VyIMOpdml0ZXIgbGVzIHNhdXRzIGRlIGNvbnRlbnUgKi9cbi5maWx0ZXItcGFuZWwtc3BhY2VyLXZpc2libGUge1xuICBoZWlnaHQ6IDIwMHB4OyAvKiBSw6lkdWl0IHBvdXIgZGVza3RvcCAoYWZmaWNoYWdlIHN1ciB1bmUgbGlnbmUpICovXG4gIHRyYW5zaXRpb246IGhlaWdodCAwLjNzIGVhc2U7XG59XG5cbi5maWx0ZXItcGFuZWwtc3BhY2VyLWhpZGRlbiB7XG4gIGhlaWdodDogMDtcbiAgdHJhbnNpdGlvbjogaGVpZ2h0IDAuM3MgZWFzZTtcbn1cblxuLyogQWRhcHRhdGlvbiBwb3VyIG1vYmlsZSBldCB0YWJsZXR0ZSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5maWx0ZXItcGFuZWwge1xuICAgIHBvc2l0aW9uOiBmaXhlZDsgLyogUG9zaXRpb24gZml4ZSBwb3VyIGNvbGxlciBkaXJlY3RlbWVudCDDoCBsYSBiYXJyZSBkZSBuYXZpZ2F0aW9uICovXG4gICAgdG9wOiA1NnB4OyAvKiBIYXV0ZXVyIGRlIGxhIGJhcnJlIGRlIG5hdmlnYXRpb24gbW9iaWxlICovXG4gICAgbGVmdDogMDtcbiAgICByaWdodDogMDtcbiAgICB6LWluZGV4OiAzMDsgLyogWi1pbmRleCBzdXDDqXJpZXVyIHBvdXIgcydhc3N1cmVyIHF1J2lsIGVzdCBhdS1kZXNzdXMgZGVzIGF1dHJlcyDDqWzDqW1lbnRzICovXG4gICAgYm9yZGVyLXRvcDogbm9uZTsgLyogUGFzIGRlIGJvcmR1cmUgc3Vww6lyaWV1cmUgKi9cbiAgICBib3gtc2hhZG93OiAwIDRweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTsgLyogT21icmUgcGx1cyB2aXNpYmxlICovXG4gIH1cbiAgXG4gIC5maWx0ZXItcGFuZWwtc3BhY2VyLXZpc2libGUge1xuICAgIGhlaWdodDogNDIwcHg7IC8qIEF1Z21lbnTDqSBwb3VyIHMnYXNzdXJlciBxdWUgdG91dCBsZSBjb250ZW51IGVzdCB2aXNpYmxlIHN1ciBtb2JpbGUgKi9cbiAgfVxuICBcbiAgLmZpbHRlci1wYW5lbC1zaG93IHtcbiAgICBtYXgtaGVpZ2h0OiA3MDBweDsgLyogQXVnbWVudMOpIHBvdXIgbW9iaWxlIHBvdXIgcydhc3N1cmVyIHF1ZSB0b3VzIGxlcyBmaWx0cmVzIHNvbnQgdmlzaWJsZXMgKi9cbiAgICBib3JkZXItdG9wOiBub25lOyAvKiBTdXBwcmltZSBsYSBib3JkdXJlIHN1cMOpcmlldXJlIHBvdXIgdW5lIHRyYW5zaXRpb24gZmx1aWRlICovXG4gIH1cbn1cblxuLyogUmVzcG9uc2l2ZSBhZGp1c3RtZW50cyAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDY0MHB4KSB7XG4gIC5za2lsbC1iYWRnZSB7XG4gICAgcGFkZGluZzogMC4xMjVyZW0gMC4zNzVyZW07XG4gICAgZm9udC1zaXplOiAwLjdyZW07XG4gIH1cbiAgXG4gIC5maWx0ZXItc2VjdGlvbiB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuICBcbiAgLmZpbHRlci1pdGVtIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG4gIH1cbn0iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSx5QkFBeUIsRUFBRSxjQUFjO0FBQzNDOztBQUVBO0VBQ0UseUJBQXlCLEVBQUUsZUFBZTtBQUM1Qzs7QUFFQTtFQUNFLHlCQUF5QixFQUFFLFlBQVk7QUFDekM7O0FBRUEsMENBQTBDO0FBQzFDO0VBQ0UscUJBQXFCO0VBQ3JCLHVCQUF1QjtFQUN2QixzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLHlCQUF5QixFQUFFLGFBQWE7RUFDeEMsWUFBWTtFQUNaLHFCQUFxQjtFQUNyQixzQkFBc0I7RUFDdEIsZ0JBQWdCO0VBQ2hCLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHlCQUF5QixFQUFFLGFBQWE7RUFDeEMsMkJBQTJCO0VBQzNCLHdDQUF3QztBQUMxQzs7QUFFQSwwQkFBMEI7QUFDMUI7RUFDRSw2QkFBNkIsRUFBRSxhQUFhO0FBQzlDOztBQUVBLCtCQUErQjtBQUMvQjtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1oscUJBQXFCO0VBQ3JCLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UseUJBQXlCLEVBQUUsYUFBYTtFQUN4QyxjQUFjLEVBQUUsYUFBYTtBQUMvQjs7QUFFQTtFQUNFLHlCQUF5QixFQUFFLGFBQWE7QUFDMUM7O0FBRUE7RUFDRSx5QkFBeUIsRUFBRSxjQUFjO0VBQ3pDLGNBQWMsRUFBRSxjQUFjO0FBQ2hDOztBQUVBO0VBQ0UseUJBQXlCLEVBQUUsY0FBYztBQUMzQzs7QUFFQTtFQUNFLHlCQUF5QixFQUFFLGNBQWM7RUFDekMsY0FBYyxFQUFFLGNBQWM7QUFDaEM7O0FBRUE7RUFDRSx5QkFBeUIsRUFBRSxjQUFjO0FBQzNDOztBQUVBLHNDQUFzQztBQUN0QztFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsV0FBVztFQUNYLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLHVCQUF1QjtFQUN2Qix5QkFBeUIsRUFBRSxhQUFhO0VBQ3hDLGVBQWU7RUFDZixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSx5QkFBeUIsRUFBRSxZQUFZO0FBQ3pDOztBQUVBLG1DQUFtQztBQUNuQztFQUNFLGNBQWM7RUFDZCxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsMEJBQTBCO0FBQzVCOztBQUVBLDhCQUE4QjtBQUM5QjtFQUNFLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsOERBQThEO0VBQzlELGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsT0FBTztFQUNQLFFBQVE7RUFDUixZQUFZO0VBQ1osb0JBQW9CO0FBQ3RCOztBQUVBLGtCQUFrQjtBQUNsQjtFQUNFLDhGQUE4RjtBQUNoRzs7QUFFQSwyQ0FBMkM7QUFDM0M7RUFDRSxvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLHdCQUF3QjtFQUN4Qix5QkFBeUIsRUFBRSxZQUFZO0VBQ3ZDLGNBQWMsRUFBRSxhQUFhO0VBQzdCLHFCQUFxQjtFQUNyQixtQkFBbUI7RUFDbkIsb0JBQW9CO0VBQ3BCLHFCQUFxQjtFQUNyQix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUIsRUFBRSxhQUFhO0FBQzFDOztBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLFdBQVc7RUFDWCxZQUFZO0VBQ1osWUFBWTtFQUNaLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQSxxQkFBcUI7QUFDckI7RUFDRSx5QkFBeUI7RUFDekIsVUFBVTtFQUNWLDRCQUE0QjtFQUM1QixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1Ysd0JBQXdCO0VBQ3hCLG1CQUFtQjtBQUNyQjs7QUFFQSxzQ0FBc0M7QUFDdEM7RUFDRSw0QkFBNEI7RUFDNUIsaUZBQWlGO0VBQ2pGLG9IQUFvSDtFQUNwSCxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLGVBQWU7RUFDZixXQUFXO0VBQ1gsYUFBYTtFQUNiLHlCQUF5QjtFQUN6Qiw0QkFBNEI7RUFDNUIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsaUJBQWlCLEVBQUUsc0RBQXNEO0VBQ3pFLDRCQUE0QjtFQUM1QiwrQkFBK0I7RUFDL0IsVUFBVTtFQUNWLG1CQUFtQjtFQUNuQixpQkFBaUIsRUFBRSxnREFBZ0Q7QUFDckU7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsVUFBVTtFQUNWLGtCQUFrQjtFQUNsQixvQkFBb0I7QUFDdEI7O0FBRUEsb0RBQW9EO0FBQ3BEO0VBQ0UsYUFBYSxFQUFFLGtEQUFrRDtFQUNqRSw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsNEJBQTRCO0FBQzlCOztBQUVBLHVDQUF1QztBQUN2QztFQUNFO0lBQ0UsZUFBZSxFQUFFLG1FQUFtRTtJQUNwRixTQUFTLEVBQUUsNkNBQTZDO0lBQ3hELE9BQU87SUFDUCxRQUFRO0lBQ1IsV0FBVyxFQUFFLDZFQUE2RTtJQUMxRixnQkFBZ0IsRUFBRSw4QkFBOEI7SUFDaEQseUNBQXlDLEVBQUUsdUJBQXVCO0VBQ3BFOztFQUVBO0lBQ0UsYUFBYSxFQUFFLHVFQUF1RTtFQUN4Rjs7RUFFQTtJQUNFLGlCQUFpQixFQUFFLDJFQUEyRTtJQUM5RixnQkFBZ0IsRUFBRSw4REFBOEQ7RUFDbEY7QUFDRjs7QUFFQSwyQkFBMkI7QUFDM0I7RUFDRTtJQUNFLDBCQUEwQjtJQUMxQixpQkFBaUI7RUFDbkI7O0VBRUE7SUFDRSxzQkFBc0I7RUFDeEI7O0VBRUE7SUFDRSxXQUFXO0lBQ1gscUJBQXFCO0VBQ3ZCO0FBQ0Y7QUFDQSxnbVdBQWdtVyIsInNvdXJjZXNDb250ZW50IjpbIi5zdGF0dXMtaW5kaWNhdG9yIHtcbiAgd2lkdGg6IDEwcHg7XG4gIGhlaWdodDogMTBweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbi5zdGF0dXMtYXZhaWxhYmxlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzEwQjk4MTsgLyogZ3JlZW4tNTAwICovXG59XG5cbi5zdGF0dXMtc29vbiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGNTlFMEI7IC8qIHllbGxvdy01MDAgKi9cbn1cblxuLnN0YXR1cy11bmF2YWlsYWJsZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNFRjQ0NDQ7IC8qIHJlZC01MDAgKi9cbn1cblxuLyogU2tpbGwgYmFkZ2VzIC0gYmx1ZSByZWN0YW5ndWxhciBwaWxscyAqL1xuLnNraWxsLWJhZGdlIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwYWRkaW5nOiAwLjI1cmVtIDAuNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogMC4yNXJlbTtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjM0I4MkY2OyAvKiBibHVlLTUwMCAqL1xuICBjb2xvcjogd2hpdGU7XG4gIG1hcmdpbi1yaWdodDogMC4yNXJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMC4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcbn1cblxuLnNraWxsLWJhZGdlOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI1NjNFQjsgLyogYmx1ZS02MDAgKi9cbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xcHgpO1xuICBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4vKiBNZXNzYWdlIHBhbmVsIHN0eWxpbmcgKi9cbi5tZXNzYWdlLXBhbmVsIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNGM0Y0RjY7IC8qIGdyYXktMTAwICovXG59XG5cbi8qIEFjdGlvbiBidXR0b25zIGZvciBkZXNrdG9wICovXG4uYWN0aW9uLWJ1dHRvbiB7XG4gIHdpZHRoOiAycmVtO1xuICBoZWlnaHQ6IDJyZW07XG4gIGJvcmRlci1yYWRpdXM6IDk5OTlweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJvcmRlcjogbm9uZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4ubGlua2VkaW4tYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0UwRjJGRTsgLyogYmx1ZS0xMDAgKi9cbiAgY29sb3I6ICMyNTYzRUI7IC8qIGJsdWUtNjAwICovXG59XG5cbi5saW5rZWRpbi1idXR0b246aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQkZEQkZFOyAvKiBibHVlLTIwMCAqL1xufVxuXG4ucGhvbmUtYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0RDRkNFNzsgLyogZ3JlZW4tMTAwICovXG4gIGNvbG9yOiAjMTZBMzRBOyAvKiBncmVlbi02MDAgKi9cbn1cblxuLnBob25lLWJ1dHRvbjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNCQkY3RDA7IC8qIGdyZWVuLTIwMCAqL1xufVxuXG4uZW1haWwtYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZFRjNDNzsgLyogYW1iZXItMTAwICovXG4gIGNvbG9yOiAjRDk3NzA2OyAvKiBhbWJlci02MDAgKi9cbn1cblxuLmVtYWlsLWJ1dHRvbjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGREU2OEE7IC8qIGFtYmVyLTIwMCAqL1xufVxuXG4vKiBDb250YWN0IGJ1dHRvbnMgZm9yIG1vYmlsZS90YWJsZXQgKi9cbi5jb250YWN0LWJ1dHRvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMC41cmVtO1xuICBwYWRkaW5nOiAwLjVyZW0gMC43NXJlbTtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgYm9yZGVyLXJhZGl1czogMC4zNzVyZW07XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBib3JkZXI6IDFweCBzb2xpZCAjRTVFN0VCOyAvKiBncmF5LTIwMCAqL1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzO1xufVxuXG4uY29udGFjdC1idXR0b246aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjlGQUZCOyAvKiBncmF5LTUwICovXG59XG5cbi8qIFN0eWxlIGZvciBoYXNodGFncyBpbiBtZXNzYWdlcyAqL1xuOmhvc3QgOjpuZy1kZWVwIC50ZXh0LWJsdWUtNjAwIHtcbiAgY29sb3I6ICMyNTYzRUI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuOmhvc3QgOjpuZy1kZWVwIC50ZXh0LWJsdWUtNjAwOmhvdmVyIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG59XG5cbi8qIE1lc3NhZ2UgdHJ1bmNhdGlvbiBzdHlsZXMgKi9cbi50cnVuY2F0ZWQge1xuICBtYXgtaGVpZ2h0OiA4MHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5iZy1ncmFkaWVudC1vdmVybGF5IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgdHJhbnNwYXJlbnQgNjAlLCB3aGl0ZSk7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgaGVpZ2h0OiA0MHB4O1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuLyogRmlsdGVyIHN0eWxlcyAqL1xuLmJnLWdyYWRpZW50LW92ZXJsYXkge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDApIDAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpIDEwMCUpO1xufVxuXG4vKiBGaWx0ZXIgY2hpcHMvcGlsbHMgZm9yIHNlbGVjdGVkIHNraWxscyAqL1xuLmZpbHRlci1waWxsIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDAuMjVyZW0gMC43NXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0VGRjZGRjsgLyogYmx1ZS01MCAqL1xuICBjb2xvcjogIzI1NjNFQjsgLyogYmx1ZS02MDAgKi9cbiAgYm9yZGVyLXJhZGl1czogOTk5OXB4O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xufVxuXG4uZmlsdGVyLXBpbGw6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjREJFQUZFOyAvKiBibHVlLTEwMCAqL1xufVxuXG4uZmlsdGVyLXBpbGwgLmNsb3NlLWljb24ge1xuICBtYXJnaW4tbGVmdDogMC4yNXJlbTtcbiAgd2lkdGg6IDFyZW07XG4gIGhlaWdodDogMXJlbTtcbiAgb3BhY2l0eTogMC41O1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgZWFzZTtcbn1cblxuLmZpbHRlci1waWxsOmhvdmVyIC5jbG9zZS1pY29uIHtcbiAgb3BhY2l0eTogMC44O1xufVxuXG4vKiBEcm9wZG93biBzdHlsaW5nICovXG4uZmlsdGVyLWRyb3Bkb3duIHtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMHB4KTtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuXG4uZmlsdGVyLWRyb3Bkb3duLnNob3cge1xuICBvcGFjaXR5OiAxO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG59XG5cbi8qIFN0eWxlcyBwb3VyIGxlIHBhbm5lYXUgZGUgZmlsdHJlcyAqL1xuLmZpbHRlci1wYW5lbCB7XG4gIHRyYW5zZm9ybS1vcmlnaW46IHRvcCBjZW50ZXI7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDZweCAtMXB4IHJnYmEoMCwgMCwgMCwgMC4xKSwgMCAycHggNHB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjA2KTtcbiAgdHJhbnNpdGlvbjogbWF4LWhlaWdodCAwLjNzIGVhc2UtaW4tb3V0LCBvcGFjaXR5IDAuMjVzIGVhc2UtaW4tb3V0LCB2aXNpYmlsaXR5IDAuMjVzIGVhc2UtaW4tb3V0LCBwYWRkaW5nIDAuMjVzIGVhc2U7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgei1pbmRleDogMjA7XG4gIG1heC1oZWlnaHQ6IDA7XG4gIHBhZGRpbmctdG9wOiAwICFpbXBvcnRhbnQ7XG4gIHBhZGRpbmctYm90dG9tOiAwICFpbXBvcnRhbnQ7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5maWx0ZXItcGFuZWwtc2hvdyB7XG4gIG1heC1oZWlnaHQ6IDQwMHB4OyAvKiBIYXV0ZXVyIHBhciBkw4PCqWZhdXQgcG91ciBkZXNrdG9wICh1bmUgc2V1bGUgbGlnbmUpICovXG4gIHBhZGRpbmctdG9wOiAxcmVtICFpbXBvcnRhbnQ7XG4gIHBhZGRpbmctYm90dG9tOiAxcmVtICFpbXBvcnRhbnQ7XG4gIG9wYWNpdHk6IDE7XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIG92ZXJmbG93OiB2aXNpYmxlOyAvKiBQZXJtZXQgYXUgY29udGVudSBkZSBkw4PCqWJvcmRlciBzaSBuw4PCqWNlc3NhaXJlICovXG59XG5cbi5maWx0ZXItcGFuZWwtaGlkZSB7XG4gIG1heC1oZWlnaHQ6IDA7XG4gIG9wYWNpdHk6IDA7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG5cbi8qIEVzcGFjZSByw4PCqXNlcnbDg8KpIHBvdXIgw4PCqXZpdGVyIGxlcyBzYXV0cyBkZSBjb250ZW51ICovXG4uZmlsdGVyLXBhbmVsLXNwYWNlci12aXNpYmxlIHtcbiAgaGVpZ2h0OiAyMDBweDsgLyogUsODwqlkdWl0IHBvdXIgZGVza3RvcCAoYWZmaWNoYWdlIHN1ciB1bmUgbGlnbmUpICovXG4gIHRyYW5zaXRpb246IGhlaWdodCAwLjNzIGVhc2U7XG59XG5cbi5maWx0ZXItcGFuZWwtc3BhY2VyLWhpZGRlbiB7XG4gIGhlaWdodDogMDtcbiAgdHJhbnNpdGlvbjogaGVpZ2h0IDAuM3MgZWFzZTtcbn1cblxuLyogQWRhcHRhdGlvbiBwb3VyIG1vYmlsZSBldCB0YWJsZXR0ZSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5maWx0ZXItcGFuZWwge1xuICAgIHBvc2l0aW9uOiBmaXhlZDsgLyogUG9zaXRpb24gZml4ZSBwb3VyIGNvbGxlciBkaXJlY3RlbWVudCDDg8KgIGxhIGJhcnJlIGRlIG5hdmlnYXRpb24gKi9cbiAgICB0b3A6IDU2cHg7IC8qIEhhdXRldXIgZGUgbGEgYmFycmUgZGUgbmF2aWdhdGlvbiBtb2JpbGUgKi9cbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIHotaW5kZXg6IDMwOyAvKiBaLWluZGV4IHN1cMODwqlyaWV1ciBwb3VyIHMnYXNzdXJlciBxdSdpbCBlc3QgYXUtZGVzc3VzIGRlcyBhdXRyZXMgw4PCqWzDg8KpbWVudHMgKi9cbiAgICBib3JkZXItdG9wOiBub25lOyAvKiBQYXMgZGUgYm9yZHVyZSBzdXDDg8KpcmlldXJlICovXG4gICAgYm94LXNoYWRvdzogMCA0cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMSk7IC8qIE9tYnJlIHBsdXMgdmlzaWJsZSAqL1xuICB9XG4gIFxuICAuZmlsdGVyLXBhbmVsLXNwYWNlci12aXNpYmxlIHtcbiAgICBoZWlnaHQ6IDQyMHB4OyAvKiBBdWdtZW50w4PCqSBwb3VyIHMnYXNzdXJlciBxdWUgdG91dCBsZSBjb250ZW51IGVzdCB2aXNpYmxlIHN1ciBtb2JpbGUgKi9cbiAgfVxuICBcbiAgLmZpbHRlci1wYW5lbC1zaG93IHtcbiAgICBtYXgtaGVpZ2h0OiA3MDBweDsgLyogQXVnbWVudMODwqkgcG91ciBtb2JpbGUgcG91ciBzJ2Fzc3VyZXIgcXVlIHRvdXMgbGVzIGZpbHRyZXMgc29udCB2aXNpYmxlcyAqL1xuICAgIGJvcmRlci10b3A6IG5vbmU7IC8qIFN1cHByaW1lIGxhIGJvcmR1cmUgc3Vww4PCqXJpZXVyZSBwb3VyIHVuZSB0cmFuc2l0aW9uIGZsdWlkZSAqL1xuICB9XG59XG5cbi8qIFJlc3BvbnNpdmUgYWRqdXN0bWVudHMgKi9cbkBtZWRpYSAobWF4LXdpZHRoOiA2NDBweCkge1xuICAuc2tpbGwtYmFkZ2Uge1xuICAgIHBhZGRpbmc6IDAuMTI1cmVtIDAuMzc1cmVtO1xuICAgIGZvbnQtc2l6ZTogMC43cmVtO1xuICB9XG4gIFxuICAuZmlsdGVyLXNlY3Rpb24ge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIH1cbiAgXG4gIC5maWx0ZXItaXRlbSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 5822:
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthService: () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 5259);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 5733);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 2874);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 3320);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 878);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3956);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ 2979);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.service */ 3636);






/**
 * Service d'authentification pour gérer la connexion/déconnexion et les sessions utilisateur
 */
class AuthService {
  constructor(http, apiService) {
    this.http = http;
    this.apiService = apiService;
    this.AUTH_DATA_KEY = 'auth_data';
    this.API_URL = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl;
    this.IS_EXTENSION = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.isExtension;
    this.authStateSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject({
      isAuthenticated: false,
      user: null,
      token: null,
      refreshToken: null,
      tokenExpiration: null
    });
    this.authState$ = this.authStateSubject.asObservable();
    this.loadAuthState();
    console.log('Auth Service initialisé');
  }
  /**
   * Obtenir l'état d'authentification actuel
   */
  get currentAuthState() {
    return this.authStateSubject.value;
  }
  /**
   * Vérifier si l'utilisateur est authentifié
   */
  get isAuthenticated() {
    return this.currentAuthState.isAuthenticated && !this.isTokenExpired();
  }
  /**
   * Obtenir l'utilisateur actuellement connecté
   */
  get currentUser() {
    return this.currentAuthState.user;
  }
  /**
   * Obtenir le token JWT actuel
   */
  get token() {
    if (this.isTokenExpired()) {
      return null;
    }
    return this.currentAuthState.token;
  }
  /**
   * Authentification avec email et mot de passe
   * @param credentials Informations d'authentification (email, mot de passe)
   */
  loginWithEmail(credentials) {
    return this.apiService.post('auth/login', credentials).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(response => this.handleAuthResponse(response)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
      console.error('Erreur lors de la connexion:', error);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(() => error);
    }));
  }
  /**
   * Authentification avec LinkedIn
   * @param profile Profil LinkedIn
   */
  loginWithLinkedIn(profile) {
    return this.apiService.post('auth/linkedin', profile).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(response => this.handleAuthResponse(response)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
      console.error('Erreur lors de la connexion avec LinkedIn:', error);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(() => error);
    }));
  }
  /**
   * Inscription d'un nouvel utilisateur
   * @param user Données de l'utilisateur à inscrire
   */
  register(user) {
    return this.apiService.post('auth/register', user).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(response => this.handleAuthResponse(response)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
      console.error('Erreur lors de l\'inscription:', error);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(() => error);
    }));
  }
  /**
   * Compléter l'onboarding de l'utilisateur (choix de rôle, etc.)
   * @param onboardingData Données d'onboarding
   */
  completeOnboarding(onboardingData) {
    return this.apiService.post('auth/onboarding', onboardingData).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(response => this.handleAuthResponse(response)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
      console.error('Erreur lors de l\'onboarding:', error);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(() => error);
    }));
  }
  /**
   * Rafraîchir le token JWT
   * @param refreshToken Token de rafraîchissement
   */
  refreshToken(refreshToken) {
    const request = {
      refreshToken
    };
    return this.apiService.post('auth/refresh-token', request).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(response => this.handleAuthResponse(response)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
      console.error('Erreur lors du rafraîchissement du token:', error);
      // En cas d'échec, déconnecter l'utilisateur
      this.logout();
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(() => error);
    }));
  }
  /**
   * Vérifier si l'utilisateur a besoin de compléter l'onboarding
   */
  needsOnboarding() {
    const user = this.currentUser;
    return !!user && !user.onboardingCompleted;
  }
  /**
   * Obtenir le rôle de l'utilisateur actuel
   */
  getUserRole() {
    const user = this.currentUser;
    return user ? user.role : null;
  }
  /**
   * Déconnexion de l'utilisateur
   */
  logout() {
    // Appel à l'API pour invalider le token côté serveur (optionnel)
    return this.apiService.post('auth/logout', {}).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(() => {
      this.clearAuthState();
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
      console.error('Erreur lors de la déconnexion:', error);
      // Même en cas d'erreur, on efface les données d'authentification côté client
      this.clearAuthState();
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(() => error);
    }));
  }
  /**
   * Vérifier si le token JWT est expiré
   */
  isTokenExpired() {
    const expiration = this.currentAuthState.tokenExpiration;
    if (!expiration) {
      return true;
    }
    return expiration < new Date();
  }
  /**
   * Traiter la réponse de l'authentification
   * @param response Réponse d'authentification de l'API
   */
  handleAuthResponse(response) {
    if (response && response.success) {
      const expirationDate = new Date(response.expiration);
      const authState = {
        isAuthenticated: true,
        user: response.user,
        token: response.token,
        refreshToken: response.refreshToken,
        tokenExpiration: expirationDate
      };
      this.saveAuthState(authState);
      this.authStateSubject.next(authState);
    }
  }
  /**
   * Sauvegarder l'état d'authentification dans le localStorage
   */
  saveAuthState(authState) {
    try {
      const state = {
        ...authState,
        tokenExpiration: authState.tokenExpiration ? authState.tokenExpiration.toISOString() : null
      };
      localStorage.setItem(this.AUTH_DATA_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données d\'authentification:', error);
    }
  }
  /**
   * Charger l'état d'authentification depuis le localStorage
   */
  loadAuthState() {
    try {
      const storedState = localStorage.getItem(this.AUTH_DATA_KEY);
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        const authState = {
          isAuthenticated: parsedState.isAuthenticated,
          user: parsedState.user,
          token: parsedState.token,
          refreshToken: parsedState.refreshToken,
          tokenExpiration: parsedState.tokenExpiration ? new Date(parsedState.tokenExpiration) : null
        };
        // Vérifier si le token est expiré
        if (authState.isAuthenticated && this.isTokenExpired()) {
          // Si le token est expiré, tenter de le rafraîchir automatiquement
          const refreshToken = authState.refreshToken;
          if (refreshToken) {
            this.refreshToken(refreshToken).subscribe({
              error: () => this.clearAuthState()
            });
          } else {
            this.clearAuthState();
          }
        } else {
          this.authStateSubject.next(authState);
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données d\'authentification:', error);
      this.clearAuthState();
    }
  }
  /**
   * Effacer l'état d'authentification
   */
  clearAuthState() {
    localStorage.removeItem(this.AUTH_DATA_KEY);
    this.authStateSubject.next({
      isAuthenticated: false,
      user: null,
      token: null,
      refreshToken: null,
      tokenExpiration: null
    });
  }
  static {
    this.ɵfac = function AuthService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_1__.ApiService));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
      token: AuthService,
      factory: AuthService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 5937:
/*!************************************************!*\
  !*** ./src/app/services/consultant.service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConsultantService: () => (/* binding */ ConsultantService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 5733);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 2874);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 7589);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 3320);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3956);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.service */ 3636);




class ConsultantService {
  constructor(apiService) {
    this.apiService = apiService;
    this.mockData = [];
    console.log('ConsultantService initialized');
    // Générons quand même les données mockées en cas de besoin
    this.generateMockData();
  }
  /**
   * Génère des données de test pour le développement
   * NOTE: Ces données sont uniquement pour le développement en local et ne sont plus utilisées
   * Les données réelles proviennent exclusivement de l'API
   */
  generateMockData() {
    console.log('[ConsultantService] Génération de données mockées pour le développement (inutilisées)');
    const roles = ['Développeur Full Stack', 'Data Scientist', 'DevOps Engineer', 'UX/UI Designer', 'Product Manager', 'Architecte Logiciel', 'Mobile Developer', 'Frontend Developer', 'Backend Developer', 'SRE/Cloud Engineer'];
    const types = ['Freelance', 'Salarié', 'Consultant'];
    const locations = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux', 'Lille', 'Nantes', 'Strasbourg', 'Remote', 'Hybride', 'Full-Remote', 'Luxembourg', 'Bruxelles'];
    const experiences = ['less_than_3', 'between_3_and_10', 'more_than_10'];
    const availabilities = [0, 1, 2]; // 0 = available, 1 = soon, 2 = unavailable
    // Entreprises pour les expériences professionnelles
    const companies = ['Accenture', 'Capgemini', 'Sopra Steria', 'SNCF', 'Orange', 'Total', 'BNP Paribas', 'Société Générale', 'Crédit Agricole', 'AXA', 'Engie', 'EDF', 'L\'Oréal', 'Carrefour', 'Google', 'Microsoft', 'Amazon', 'Apple', 'Facebook', 'Twitter', 'Airbnb', 'Uber', 'Doctolib', 'Deezer', 'Blablacar', 'OVH', 'Thales', 'Atos', 'IBM', 'HP', 'Dell', 'Allianz', 'Axa', 'MAIF', 'La Poste', 'Air France', 'RATP', 'SNCF'];
    const skillsPool = ['JavaScript', 'TypeScript', 'Angular', 'React', 'Vue.js', 'Node.js', 'Python', 'Java', 'C#', '.NET', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'Git', 'GitHub Actions', 'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Oracle', 'Redis', 'HTML', 'CSS', 'SASS', 'LESS', 'Tailwind CSS', 'Bootstrap', 'Material Design', 'REST API', 'GraphQL', 'gRPC', 'WebSockets', 'Microservices', 'Serverless', 'Agile', 'Scrum', 'Kanban', 'Jira', 'Confluence', 'TDD', 'BDD', 'DDD', 'Machine Learning', 'AI', 'Deep Learning', 'NLP', 'Computer Vision', 'Data Analysis', 'Mobile', 'iOS', 'Android', 'Kotlin', 'Swift', 'React Native', 'Flutter'];
    // Domaines d'expertise spécifiques 
    const expertiseDomains = ['Architecture logicielle', 'Cybersécurité', 'Cloud computing', 'DevOps', 'FinTech', 'E-commerce', 'Santé', 'Transport', 'Énergie', 'Télécommunications', 'Médias', 'Éducation', 'Retail', 'Industrie 4.0', 'Smart City', 'IoT', 'Blockchain', 'Intelligence artificielle', 'Big Data', 'Réalité virtuelle', 'Réalité augmentée', 'User experience', 'Accessibilité', 'Sécurité des données', 'Protection de la vie privée', 'Transformation digitale', 'Innovation', 'Conduite du changement', 'Agilité à l\'échelle', 'Performance web', 'Mobile first', 'Progressive Web Apps', 'Microservices'];
    // Secteurs d'activité
    const activitySectors = ['Banque & Finance', 'Assurance', 'Santé', 'Pharmaceutique', 'Luxe', 'Commerce de détail', 'Transport & Logistique', 'Aéronautique', 'Automobile', 'Télécommunications', 'Média & Divertissement', 'Énergie', 'Industrie manufacturière', 'Services publics', 'Défense', 'Éducation', 'Agroalimentaire', 'Hôtellerie & Restauration', 'Immobilier', 'Construction', 'High-Tech', 'Environnement & Développement durable', 'Tourisme', 'Sport', 'Mode & Textile', 'Conseil', 'E-commerce'];
    const messages = ["Bonjour,\n\nJe suis disponible pour des missions de conseil en architecture de systèmes distribués et infrastructures cloud.\n\nMon expertise :\n- Expérience approfondie avec AWS, GCP et Azure\n- Spécialiste en migration vers le cloud\n- Optimisation des coûts d'infrastructure\n\nJ'ai aidé plus de 15 entreprises à réduire leurs coûts cloud de 30% en moyenne tout en améliorant la performance et la fiabilité de leurs systèmes.\n\nÀ l'écoute de nouvelles opportunités à partir de mai 2025.\n\n#technique #architecture #devops #cloud #costoptimization", "Bonjour,\n\nExpert en solutions #cloud et #cybersécurité, je suis passionné par les technologies émergentes et la sécurisation des infrastructures critiques.\n\nProfil :\n- +10 ans d'expérience en sécurité des SI\n- Certifications CISSP et AWS Security Specialist\n- Spécialiste des normes ISO27001 et RGPD\n\nRécemment, j'ai dirigé des audits de sécurité pour des entreprises du CAC 40 et implémenté des stratégies de défense qui ont réduit les incidents de 75%.\n\nDisponible immédiatement pour des missions d'audit ou de conseil stratégique.\n\n#security #compliance #audit #training", "Bonjour à tous,\n\nDéveloppeur full-stack avec 8 ans d'expérience en #javascript #react #nodejs, je recherche de nouveaux défis techniques.\n\nMes compétences :\n- Architecture microservices\n- Optimisation de performance\n- Certifié AWS Solutions Architect et MongoDB Developer\n\nMa dernière réalisation : refonte complète d'une plateforme e-commerce (10M+ visiteurs) avec mise en place d'une architecture JAMstack qui a amélioré les temps de chargement de 300%.\n\nDisponible dès juillet pour des projets innovants.\n\n#fullstack #performance #architecture #ecommerce", "Bonjour,\n\nData Scientist spécialisé #MachineLearning et #DeepLearning, je suis actuellement disponible pour des missions en remote.\n\nMon parcours :\n- PhD en Intelligence Artificielle (École Polytechnique)\n- Expert TensorFlow, PyTorch et scikit-learn\n- Spécialiste en modèles prédictifs et détection de fraudes\n\nMon projet récent : système de détection de fraude financière avec réduction des faux positifs de 60% tout en maintenant un taux de détection >95%.\n\nÀ la recherche d'opportunités à fort impact social ou environnemental.\n\n#DataScience #AI #analytics #python", "Bonjour,\n\nConsultant UX/UI à la recherche d'une nouvelle opportunité dans le secteur de la santé ou de l'éducation.\n\nMon expertise :\n- Portfolio de +30 projets (startups et grandes entreprises)\n- Recherche utilisateur, prototypage, tests d'utilisabilité\n- Maîtrise de Figma, Adobe XD et Sketch\n\nRécemment, j'ai dirigé la refonte UX d'une application de santé mentale (500K+ utilisateurs), améliorant la rétention de 40%.\n\nJe privilégie les projets à impact social positif.\n\nDisponible dès maintenant.\n\n#design #frontend #healthcare #edtech #accessibility", "Bonjour,\n\nArchitecte logiciel expérimenté dans les environnements critiques à haute disponibilité.\n\nMes domaines d'expertise :\n- Conception de systèmes distribués\n- Traitement de données en temps réel\n- Architectures événementielles (Kafka, RabbitMQ, Apache Flink)\n\nJ'ai conçu des architectures critiques pour les secteurs bancaire et télécoms garantissant une disponibilité de 99,999%.\n\nMa spécialité : transformer des systèmes monolithiques en architectures microservices modernes sans perturbation opérationnelle.\n\nDisponible à partir de juin 2025.\n\n#reliability #architecture #distributed #microservices", "Bonjour,\n\nDéveloppeur mobile avec +5 ans d'expérience en développement natif et cross-platform.\n\nMes technologies :\n- React Native, Flutter\n- Kotlin, Swift\n- AR, ML on-device\n\nJ'ai publié plus de 15 applications (App Store/Google Play) totalisant des millions d'utilisateurs.\n\nProjet récent : application de fitness ayant atteint le Top 10 de sa catégorie sur l'App Store avec une note de 4,8/5 (50K+ avis).\n\nJe suis particulièrement intéressé par les projets innovants utilisant l'AR ou le ML.\n\nDisponible immédiatement.\n\n#mobile #reactnative #flutter #performance #ux", "Expert en solutions DevOps et CI/CD avec une solide expérience en automatisation d'infrastructures et déploiements. Maîtrise de Kubernetes, Terraform, Ansible, Jenkins, GitHub Actions et GitLab CI. J'ai mis en place des pipelines CI/CD robustes pour des équipes de développement de toutes tailles, réduisant les temps de déploiement de plusieurs heures à quelques minutes. #docker #kubernetes #automation #gitops #terraform #IaC", "Ingénieur backend passionné par les API performantes et les architectures scalables. Expertise en Java, Spring Boot, Quarkus et microservices. J'ai conçu et implémenté des systèmes capables de traiter des milliers de transactions par seconde avec une latence minimale. Expérience en optimisation de bases de données relationnelles et NoSQL. #java #spring #microservices #performance #scalability #databases", "Product Manager orienté données avec background technique en développement et analyse de données. J'ai dirigé le développement de produits SaaS B2B dans les secteurs de la finance et du marketing, en mettant l'accent sur l'expérience utilisateur et l'exploitation des données pour la prise de décision. Certifié Scrum Product Owner et Google Analytics. #produit #analytics #agile #saas #b2b #finance", "Spécialiste en cybersécurité pour applications cloud avec expertise en sécurisation d'environnements AWS, Azure et GCP. Expérience en tests d'intrusion, analyse de vulnérabilités et réponse aux incidents. J'ai aidé plusieurs entreprises à obtenir des certifications de sécurité (ISO27001, SOC2) et à mettre en place des pratiques de DevSecOps. Certifié CEH, OSCP et AWS Security Specialist. #security #pentesting #devsecops #cloud #compliance #certification", "Consultant en transformation digitale pour le secteur financier avec plus de 12 ans d'expérience. J'accompagne les banques et assurances dans leur modernisation technologique et organisationnelle. Expertise en optimisation de processus, adoption de méthodologies agiles et mise en place de plateformes API. Ancien directeur technique dans une grande banque européenne. #fintech #agile #transformation #banking #insurance #api", "Développeur .NET avec forte expertise Azure et plus de 7 ans d'expérience en développement d'applications d'entreprise. Spécialiste ASP.NET Core, Entity Framework, Azure Functions et Azure DevOps. J'ai conçu et implémenté des systèmes critiques pour des clients dans les secteurs de la santé, de la finance et de l'industrie. Microsoft Certified Azure Developer Associate. #csharp #dotnet #azure #cloud #microsoft #enterprise", "Expert en solutions BigData et DataLakes avec expérience approfondie en conception et implémentation d'architectures de traitement de données à grande échelle. Maîtrise de Hadoop, Spark, Databricks, Snowflake et les services AWS/Azure pour le Big Data. J'ai dirigé des projets de migration vers le cloud et d'implémentation de solutions data pour de grandes entreprises internationales. #hadoop #spark #databricks #bigdata #datalake #cloud", "Consultant en accessibilité web et mobile avec 6 ans d'expérience dans la conception et l'audit d'interfaces inclusives. Je travaille avec les équipes produit et développement pour garantir la conformité aux normes WCAG et l'inclusion de tous les utilisateurs. J'ai réalisé plus de 50 audits d'accessibilité et formé des équipes aux bonnes pratiques. Défenseur de l'inclusion numérique et intervenant régulier dans des conférences sur l'accessibilité. #a11y #inclusive #standards #wcag #ux #formation"];
    for (let i = 1; i <= 100; i++) {
      const locked = Math.random() > 0.7;
      const randomRole = roles[Math.floor(Math.random() * roles.length)];
      const randomType = types[Math.floor(Math.random() * types.length)];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      const randomExperience = experiences[Math.floor(Math.random() * experiences.length)];
      const randomAvailability = availabilities[Math.floor(Math.random() * availabilities.length)];
      // Generate random skills (between 3 and 7)
      const randomSkillsCount = Math.floor(Math.random() * 5) + 3;
      const shuffledSkills = [...skillsPool].sort(() => 0.5 - Math.random());
      const randomSkills = shuffledSkills.slice(0, randomSkillsCount);
      // Generate random message
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      // Génération d'emplacements multiples pour certains consultants (1 à 3 lieux)
      let consultantLocations = randomLocation;
      // Pour 40% des consultants, ajouter des emplacements multiples
      if (Math.random() < 0.4) {
        // Sélectionner 1 ou 2 lieux supplémentaires différents du premier
        const additionalLocationsCount = Math.floor(Math.random() * 2) + 1;
        const availableLocations = locations.filter(loc => loc !== randomLocation);
        const shuffledLocations = [...availableLocations].sort(() => 0.5 - Math.random());
        const additionalLocations = shuffledLocations.slice(0, additionalLocationsCount);
        // Combiner les emplacements avec des virgules
        consultantLocations = [randomLocation, ...additionalLocations].join(', ');
      }
      // Génération d'expertises aléatoires (entre 2 et 4)
      const randomExpertiseCount = Math.floor(Math.random() * 3) + 2;
      const shuffledExpertises = [...expertiseDomains].sort(() => 0.5 - Math.random());
      const randomExpertises = shuffledExpertises.slice(0, randomExpertiseCount);
      // Génération de secteurs d'activité (entre 1 et 3)
      const sectorCount = Math.floor(Math.random() * 3) + 1;
      const shuffledSectors = [...activitySectors].sort(() => 0.5 - Math.random());
      const randomSectors = shuffledSectors.slice(0, sectorCount);
      // Génération d'expériences professionnelles aléatoires (entre 1 et 3)
      const experienceCount = Math.floor(Math.random() * 3) + 1;
      const randomExperiences = [];
      // Création d'expériences aléatoires
      for (let j = 0; j < experienceCount; j++) {
        const randomCompany = companies[Math.floor(Math.random() * companies.length)];
        const roleForExperience = roles[Math.floor(Math.random() * roles.length)];
        const isCurrent = j === 0; // La première expérience est l'expérience actuelle
        randomExperiences.push({
          role: roleForExperience,
          company: randomCompany,
          isCurrent: isCurrent
        });
      }
      this.mockData.push({
        id: `100${i}`,
        role: randomRole,
        linkedinUrl: 'https://www.linkedin.com/in/example',
        phone: locked ? null : '+33 6 12 34 56 78',
        email: locked ? null : 'contact@example.com',
        locked: locked,
        type: randomType,
        skills: randomSkills,
        location: consultantLocations,
        experience: randomExperience,
        phoneValidated: !locked,
        emailValidated: !locked,
        linkedinValidated: true,
        availability: randomAvailability,
        message: randomMessage,
        experiences: randomExperiences,
        expertises: randomExpertises,
        sectors: randomSectors
      });
    }
  }
  /**
   * Get all consultants
   */
  getConsultants() {
    console.log('[ConsultantService] Fetching all consultants from API');
    // Use the real API with proper error handling
    return this.apiService.get('consultants').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(response => {
      console.log('[ConsultantService] All consultants API Response received - length:', response?.length || 0);
      if (response?.length === 0) {
        console.warn('[ConsultantService] API returned empty consultant array');
      }
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(consultants => {
      // Vérifier que consultants est bien un tableau
      if (!Array.isArray(consultants)) {
        console.error('[ConsultantService] API did not return an array of consultants:', consultants);
        return [];
      }
      console.log(`[ConsultantService] Processing ${consultants.length} consultants, adding tags`);
      return consultants.map(consultant => ({
        ...consultant,
        tags: this.extractTags(consultant?.message || '')
      }));
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.catchError)(error => {
      console.error('[ConsultantService] Error fetching all consultants:', error);
      // Retourner l'erreur au lieu d'utiliser des données de repli
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.throwError)(() => new Error('Impossible de récupérer les consultants. ' + (error.status === 0 ? 'Le serveur API est peut-être indisponible.' : `Erreur ${error.status}: ${error.message || 'message inconnu'}`)));
    }));
  }
  /**
   * Get consultants with pagination
   */
  getPagedConsultants(page, pageSize) {
    console.log(`[ConsultantService] Fetching paged consultants`);
    console.log(`[ConsultantService] Page: ${page}, PageSize: ${pageSize}`);
    // Pour le moment, nous utilisons l'API complète et simulons la pagination côté client
    return this.apiService.get('consultants').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(response => {
      console.log('[ConsultantService] API Response received - length:', response?.length || 0);
      if (response?.length === 0) {
        console.warn('[ConsultantService] API returned empty consultant array');
      }
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(consultants => {
      // Vérifier que consultants est bien un tableau
      if (!Array.isArray(consultants)) {
        console.error('[ConsultantService] API did not return an array of consultants:', consultants);
        return [];
      }
      // Simuler la pagination côté client
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      console.log(`[ConsultantService] Slice from ${startIndex} to ${endIndex}`);
      return consultants.slice(startIndex, endIndex);
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(consultants => {
      console.log(`[ConsultantService] Processing ${consultants.length} consultants, adding tags`);
      return consultants.map(consultant => ({
        ...consultant,
        tags: this.extractTags(consultant?.message || '')
      }));
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.catchError)(error => {
      console.error('[ConsultantService] Error fetching paged consultants:', error);
      // Retourner l'erreur au lieu d'utiliser des données de repli
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.throwError)(() => new Error('Impossible de récupérer les consultants paginés. ' + (error.status === 0 ? 'Le serveur API est peut-être indisponible.' : `Erreur ${error.status}: ${error.message || 'message inconnu'}`)));
    }));
  }
  /**
   * Extract hashtags from a message
   */
  extractTags(message) {
    const tags = [];
    const regex = /#(\w+)/g;
    let match;
    while ((match = regex.exec(message)) !== null) {
      tags.push(match[1]);
    }
    return tags;
  }
  /**
   * Filter consultants based on search criteria
   */
  filterConsultants(consultants, searchText, skills, availability, experience, location) {
    return consultants.filter(consultant => {
      // Filter by search text
      if (searchText && searchText.trim() !== '') {
        const searchLower = searchText.toLowerCase();
        const messageMatch = consultant.message.toLowerCase().includes(searchLower);
        const roleMatch = consultant.role.toLowerCase().includes(searchLower);
        const locationMatch = consultant.location.toLowerCase().includes(searchLower);
        const tagsMatch = consultant.tags.some(tag => tag.toLowerCase().includes(searchLower));
        if (!messageMatch && !roleMatch && !locationMatch && !tagsMatch) {
          return false;
        }
      }
      // Filter by skills
      if (skills && skills.length > 0) {
        if (!skills.every(skill => consultant.skills.includes(skill))) {
          return false;
        }
      }
      // Filter by availability
      if (availability && availability !== 'all') {
        // Convert string to number for comparison
        const availabilityNum = parseInt(availability, 10);
        if (consultant.availability !== availabilityNum) {
          return false;
        }
      }
      // Filter by experience
      if (experience && experience !== 'all') {
        if (consultant.experience !== experience) {
          return false;
        }
      }
      // Filter by location
      if (location && location !== 'all') {
        // Check if any of the consultant's locations match the filter
        const consultantLocations = consultant.location.split(',').map(loc => loc.trim());
        if (!consultantLocations.includes(location)) {
          return false;
        }
      }
      return true;
    });
  }
  static {
    this.ɵfac = function ConsultantService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ConsultantService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
      token: ConsultantService,
      factory: ConsultantService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 7926:
/*!**********************************************!*\
  !*** ./src/app/services/auth.interceptor.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthInterceptor: () => (/* binding */ AuthInterceptor)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 2979);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 5259);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 5733);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 2874);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 3320);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 2201);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 8561);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 137);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 8636);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 3956);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.service */ 5822);





/**
 * Intercepteur HTTP pour gérer l'ajout du token JWT et le rafraîchissement automatique
 */
class AuthInterceptor {
  constructor(authService) {
    this.authService = authService;
    this.isRefreshing = false;
    this.refreshTokenSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(null);
  }
  /**
   * Intercepter les requêtes HTTP pour ajouter le token JWT et gérer les erreurs d'authentification
   * @param request Requête HTTP originale
   * @param next Handler de la requête
   * @returns Observable de l'événement HTTP
   */
  intercept(request, next) {
    // Log la requête HTTP
    console.log(`API Request:`, {
      method: request.method,
      url: request.url,
      headers: request.headers.keys().map(key => `${key}: ${request.headers.get(key)}`),
      body: request.body
    });
    // Calcul du temps d'envoi de la requête
    const startTime = Date.now();
    // Vérifier si la requête doit éviter l'ajout du token
    if (this.shouldSkipAuthHeader(request)) {
      return next.handle(request).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(event => {
        if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpResponse) {
          // Log la réponse HTTP
          const endTime = Date.now();
          console.log(`API Response (${endTime - startTime}ms):`, {
            url: request.url,
            status: event.status,
            statusText: event.statusText,
            body: event.body
          });
        }
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
        // Log l'erreur HTTP
        const endTime = Date.now();
        console.error(`API Error (${endTime - startTime}ms):`, {
          url: request.url,
          error: error.message,
          status: error.status,
          statusText: error.statusText
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(() => error);
      }));
    }
    // Récupérer le token JWT actuel
    const token = this.authService.token;
    // Ajouter le token JWT à la requête si disponible
    if (token) {
      request = this.addToken(request, token);
    }
    // Traiter la requête
    return next.handle(request).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(event => {
      if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpResponse) {
        // Log la réponse HTTP
        const endTime = Date.now();
        console.log(`API Response (${endTime - startTime}ms):`, {
          url: request.url,
          status: event.status,
          statusText: event.statusText,
          body: event.body
        });
      }
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
      // Log l'erreur HTTP
      const endTime = Date.now();
      console.error(`API Error (${endTime - startTime}ms):`, {
        url: request.url,
        error: error.message,
        status: error.status,
        statusText: error.statusText
      });
      // Gérer les erreurs 401 (Non autorisé)
      if (error instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      } else {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(() => error);
      }
    }));
  }
  /**
   * Décider si la requête doit éviter l'ajout du header d'authentification
   * @param request Requête HTTP
   * @returns Booléen indiquant si l'on doit sauter l'ajout du header
   */
  shouldSkipAuthHeader(request) {
    // Les requêtes d'authentification ne doivent pas ajouter le token
    const url = request.url.toLowerCase();
    return url.includes('/auth/login') || url.includes('/auth/register') || url.includes('/auth/linkedin') || url.includes('/auth/refresh-token');
  }
  /**
   * Ajouter le token JWT à l'en-tête Authorization de la requête
   * @param request Requête HTTP originale
   * @param token Token JWT
   * @returns Requête HTTP avec le token
   */
  addToken(request, token) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  /**
   * Gérer les erreurs 401 (Non autorisé) en tentant de rafraîchir le token
   * @param request Requête HTTP originale
   * @param next Handler de la requête
   * @returns Observable de l'événement HTTP
   */
  handle401Error(request, next) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const refreshToken = this.authService.currentAuthState.refreshToken;
      if (refreshToken) {
        return this.authService.refreshToken(refreshToken).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.switchMap)(response => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(response.token);
          return next.handle(this.addToken(request, response.token));
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
          this.isRefreshing = false;
          this.authService.logout();
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(() => error);
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.finalize)(() => {
          this.isRefreshing = false;
        }));
      } else {
        // Pas de refresh token, forcer la déconnexion
        this.isRefreshing = false;
        this.authService.logout();
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(() => new Error('Session expirée.'));
      }
    } else {
      // Si un rafraîchissement est déjà en cours, attendre qu'il soit terminé
      return this.refreshTokenSubject.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.filter)(token => token !== null), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.switchMap)(token => next.handle(this.addToken(request, token))));
    }
  }
  static {
    this.ɵfac = function AuthInterceptor_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AuthInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjectable"]({
      token: AuthInterceptor,
      factory: AuthInterceptor.ɵfac
    });
  }
}

/***/ }),

/***/ 8775:
/*!****************************************!*\
  !*** ./src/app/app.component.debug.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppDebugComponent: () => (/* binding */ AppDebugComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6884);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 2979);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 6944);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../environments/environment */ 878);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3956);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/api.service */ 3636);
/* harmony import */ var _services_consultant_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/consultant.service */ 5937);








function AppDebugComponent_div_22_p_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("Data: ", ctx_r0.apiData.length, " consultants loaded");
  }
}
function AppDebugComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 5)(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, AppDebugComponent_div_22_p_3_Template, 2, 1, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", ctx_r0.apiStatus === "OK" ? "bg-green-100" : "bg-red-100");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("API Status: ", ctx_r0.apiStatus, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.apiData);
  }
}
class AppDebugComponent {
  constructor(apiService, consultantService) {
    this.apiService = apiService;
    this.consultantService = consultantService;
    this.debugInfo = {
      baseHref: document.getElementsByTagName('base')[0]?.getAttribute('href') || 'undefined',
      location: window.location.href,
      environment: _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.envName || 'undefined',
      apiUrl: _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl || 'undefined',
      isExtension: _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.isExtension,
      appStartTime: new Date().toISOString()
    };
    this.apiStatus = null;
    this.apiData = null;
    console.log('🔍 FastConnect Debug Module initialisé:', this.debugInfo);
  }
  ngOnInit() {
    console.log('Debug component initialized');
  }
  testApiConnection() {
    this.apiStatus = 'Testing...';
    this.consultantService.getConsultants().subscribe(data => {
      console.log('API response received:', data);
      this.apiStatus = 'OK';
      this.apiData = data;
    }, error => {
      console.error('API error:', error);
      this.apiStatus = 'Error: ' + (error.message || 'Unknown error');
    });
  }
  static {
    this.ɵfac = function AppDebugComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppDebugComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_api_service__WEBPACK_IMPORTED_MODULE_1__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_consultant_service__WEBPACK_IMPORTED_MODULE_2__.ConsultantService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: AppDebugComponent,
      selectors: [["app-debug"]],
      decls: 23,
      vars: 5,
      consts: [[1, "bg-white", "p-4", "shadow-lg", "fixed", "top-0", "left-0", "right-0", "z-50"], [1, "text-xl", "font-bold"], [1, "mt-2"], [1, "mt-2", "px-4", "py-2", "bg-blue-500", "text-white", "rounded", 3, "click"], ["class", "mt-2 p-2", 3, "ngClass", 4, "ngIf"], [1, "mt-2", "p-2", 3, "ngClass"], [4, "ngIf"]],
      template: function AppDebugComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "h1", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "FastConnect Debug Console");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 2)(4, "p")(5, "strong");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Environment:");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "p")(9, "strong");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "API URL:");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "p")(13, "strong");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "isExtension:");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "p")(17, "strong");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "Base href:");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppDebugComponent_Template_button_click_20_listener() {
            return ctx.testApiConnection();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, " Test API Connection ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](22, AppDebugComponent_div_22_Template, 4, 3, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.debugInfo.environment, "");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.debugInfo.apiUrl, "");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.debugInfo.isExtension, "");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.debugInfo.baseHref, "");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.apiStatus);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClientModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule],
      encapsulation: 2
    });
  }
}

/***/ }),

/***/ 9158:
/*!**************************************!*\
  !*** ./src/app/guards/auth.guard.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthGuard: () => (/* binding */ AuthGuard),
/* harmony export */   GuestGuard: () => (/* binding */ GuestGuard),
/* harmony export */   OnboardingGuard: () => (/* binding */ OnboardingGuard),
/* harmony export */   RoleGuard: () => (/* binding */ RoleGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3956);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/auth.service */ 5822);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7400);



/**
 * Garde qui vérifie si l'utilisateur est authentifié
 * Utilisé pour protéger les routes qui nécessitent une authentification
 */
class AuthGuard {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  /**
   * Vérifie si l'utilisateur peut accéder à la route
   * @param route Information sur la route activée
   * @param state État du routeur
   * @returns Booléen indiquant si l'accès est autorisé
   */
  canActivate(route, state) {
    // Vérifier si l'utilisateur est authentifié
    if (!this.authService.isAuthenticated) {
      // Rediriger vers la page de connexion
      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: state.url
        }
      });
      return false;
    }
    // Si l'utilisateur doit compléter l'onboarding, rediriger vers cette page (sauf si déjà sur cette page)
    if (this.authService.needsOnboarding() && !state.url.includes('/onboarding')) {
      this.router.navigate(['/onboarding']);
      return false;
    }
    return true;
  }
  static {
    this.ɵfac = function AuthGuard_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: AuthGuard,
      factory: AuthGuard.ɵfac,
      providedIn: 'root'
    });
  }
}
/**
 * Garde qui vérifie si l'utilisateur n'est PAS authentifié
 * Utilisé pour protéger les routes qui ne sont accessibles qu'aux invités (login, register)
 */
class GuestGuard {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  /**
   * Vérifie si l'utilisateur peut accéder à la route en tant qu'invité
   * @param route Information sur la route activée
   * @param state État du routeur
   * @returns Booléen indiquant si l'accès est autorisé
   */
  canActivate(route, state) {
    // Si l'utilisateur est authentifié, rediriger vers la page d'accueil
    if (this.authService.isAuthenticated) {
      // Si l'utilisateur doit compléter l'onboarding, rediriger vers cette page
      if (this.authService.needsOnboarding()) {
        this.router.navigate(['/onboarding']);
      } else {
        this.router.navigate(['/']);
      }
      return false;
    }
    return true;
  }
  static {
    this.ɵfac = function GuestGuard_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || GuestGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: GuestGuard,
      factory: GuestGuard.ɵfac,
      providedIn: 'root'
    });
  }
}
/**
 * Garde qui vérifie si l'utilisateur doit compléter l'onboarding
 * Utilisé pour protéger la route d'onboarding
 */
class OnboardingGuard {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  /**
   * Vérifie si l'utilisateur doit accéder à la page d'onboarding
   * @param route Information sur la route activée
   * @param state État du routeur
   * @returns Booléen indiquant si l'accès est autorisé
   */
  canActivate(route, state) {
    // Vérifier si l'utilisateur est authentifié
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    // Si l'utilisateur a déjà complété l'onboarding, rediriger vers la page d'accueil
    if (!this.authService.needsOnboarding()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
  static {
    this.ɵfac = function OnboardingGuard_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || OnboardingGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: OnboardingGuard,
      factory: OnboardingGuard.ɵfac,
      providedIn: 'root'
    });
  }
}
/**
 * Garde qui vérifie le rôle de l'utilisateur
 * Utilisé pour protéger les routes qui nécessitent un rôle spécifique
 */
class RoleGuard {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  /**
   * Vérifie si l'utilisateur a le rôle requis pour accéder à la route
   * @param route Information sur la route activée, contenant les rôles requis
   * @param state État du routeur
   * @returns Booléen indiquant si l'accès est autorisé
   */
  canActivate(route, state) {
    // Vérifier si l'utilisateur est authentifié
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: state.url
        }
      });
      return false;
    }
    // Récupérer les rôles autorisés depuis les données de la route
    const allowedRoles = route.data['roles'];
    if (!allowedRoles || allowedRoles.length === 0) {
      return true; // Si aucun rôle n'est spécifié, l'accès est autorisé
    }
    // Vérifier si l'utilisateur a l'un des rôles requis
    const userRole = this.authService.getUserRole();
    if (!userRole || !allowedRoles.includes(userRole)) {
      this.router.navigate(['/forbidden']);
      return false;
    }
    return true;
  }
  static {
    this.ɵfac = function RoleGuard_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || RoleGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: RoleGuard,
      factory: RoleGuard.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 9215:
/*!*************************************************************************!*\
  !*** ./src/app/components/consultant-card/consultant-card.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConsultantCardComponent: () => (/* binding */ ConsultantCardComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3956);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 6884);




const _c0 = (a0, a1) => ({
  "text-green-500": a0,
  "text-red-500": a1
});
const _c1 = (a0, a1, a2) => ({
  "bg-green-500": a0,
  "bg-yellow-500": a1,
  "bg-red-500": a2
});
const _c2 = () => [1, 2, 3];
const _c3 = a0 => ({
  "opacity-50 cursor-not-allowed": a0
});
const _c4 = (a0, a1) => ({
  "opacity-50 cursor-not-allowed": a0,
  "bg-blue-100": a1
});
const _c5 = (a0, a1) => ({
  "opacity-50 cursor-not-allowed": a0,
  "bg-green-100": a1
});
const _c6 = (a0, a1) => ({
  "opacity-50 cursor-not-allowed": a0,
  "bg-red-100": a1
});
const _c7 = (a0, a1, a2, a3, a4) => ({
  "bg-blue-600": a0,
  "bg-blue-200": a1,
  "h-1": a2,
  "h-2": a3,
  "h-3.5": a4
});
const _c8 = (a0, a1, a2, a3, a4) => ({
  "bg-blue-600": a0,
  "bg-blue-200": a1,
  "h-1": a2,
  "h-1.5": a3,
  "h-2.5": a4
});
function ConsultantCardComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 63);
  }
  if (rf & 2) {
    const i_r1 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction5"](1, _c7, i_r1 <= ctx_r1.getSeniorityBars(ctx_r1.consultant.experience), i_r1 > ctx_r1.getSeniorityBars(ctx_r1.consultant.experience), i_r1 === 1, i_r1 === 2, i_r1 === 3));
  }
}
function ConsultantCardComponent_span_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const skill_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", skill_r3, " ");
  }
}
function ConsultantCardComponent_span_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" +", ctx_r1.consultant.skills.length - 3, " ");
  }
}
function ConsultantCardComponent_ng_container_24_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "\u2022");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function ConsultantCardComponent_ng_container_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ConsultantCardComponent_ng_container_24_span_3_Template, 2, 0, "span", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const location_r4 = ctx.$implicit;
    const last_r5 = ctx.last;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](location_r4.trim());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !last_r5);
  }
}
function ConsultantCardComponent_div_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConsultantCardComponent_div_38_Template_div_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 70)(2, "a", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConsultantCardComponent_div_38_Template_a_click_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.onLinkedInClick(ctx_r1.consultant.linkedinUrl, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "i", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " Voir sur LinkedIn ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConsultantCardComponent_div_38_Template_a_click_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.onPhoneClick(ctx_r1.consultant.phone, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "i", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Appeler ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "a", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConsultantCardComponent_div_38_Template_a_click_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.onEmailClick(ctx_r1.consultant.email, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "i", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " Envoyer un email ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("opacity-50", !ctx_r1.consultant.linkedinValidated)("cursor-not-allowed", !ctx_r1.consultant.linkedinValidated)("pointer-events-none", !ctx_r1.consultant.linkedinValidated);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("opacity-50", !ctx_r1.consultant.phoneValidated || !ctx_r1.consultant.phone)("cursor-not-allowed", !ctx_r1.consultant.phoneValidated || !ctx_r1.consultant.phone)("pointer-events-none", !ctx_r1.consultant.phoneValidated || !ctx_r1.consultant.phone);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("opacity-50", !ctx_r1.consultant.emailValidated || !ctx_r1.consultant.email)("cursor-not-allowed", !ctx_r1.consultant.emailValidated || !ctx_r1.consultant.email)("pointer-events-none", !ctx_r1.consultant.emailValidated || !ctx_r1.consultant.email);
  }
}
function ConsultantCardComponent_div_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConsultantCardComponent_div_46_Template_div_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.onToggleExpansion(ctx_r1.consultant.id, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function ConsultantCardComponent_button_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConsultantCardComponent_button_48_Template_button_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.onToggleExpansion(ctx_r1.consultant.id, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Voir tout le message ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function ConsultantCardComponent_span_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span")(1, "button", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConsultantCardComponent_span_49_Template_button_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.onToggleExpansion(ctx_r1.consultant.id, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Masquer ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
}
function ConsultantCardComponent_div_52_div_1_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const sector_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", sector_r10, " ");
  }
}
function ConsultantCardComponent_div_52_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 77)(1, "h3", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Secteurs d'activit\u00E9");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ConsultantCardComponent_div_52_div_1_span_4_Template, 2, 1, "span", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.consultant.sectors);
  }
}
function ConsultantCardComponent_div_52_div_2_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const expertise_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", expertise_r11, " ");
  }
}
function ConsultantCardComponent_div_52_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 77)(1, "h3", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Expertises");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ConsultantCardComponent_div_52_div_2_span_4_Template, 2, 1, "span", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.consultant.expertises);
  }
}
function ConsultantCardComponent_div_52_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const skill_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", skill_r12, " ");
  }
}
function ConsultantCardComponent_div_52_div_8_li_4_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const exp_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u2022 ", exp_r13.company, "");
  }
}
function ConsultantCardComponent_div_52_div_8_li_4_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "(Actuelle)");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function ConsultantCardComponent_div_52_div_8_li_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div")(3, "span", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, ConsultantCardComponent_div_52_div_8_li_4_span_5_Template, 2, 1, "span", 90)(6, ConsultantCardComponent_div_52_div_8_li_4_span_6_Template, 2, 0, "span", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const exp_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](exp_r13.role);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", exp_r13.company);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", exp_r13.isCurrent);
  }
}
function ConsultantCardComponent_div_52_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div")(1, "h3", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Derni\u00E8res exp\u00E9riences");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "ul", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ConsultantCardComponent_div_52_div_8_li_4_Template, 7, 3, "li", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.consultant.experiences);
  }
}
function ConsultantCardComponent_div_52_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ConsultantCardComponent_div_52_div_1_Template, 5, 1, "div", 76)(2, ConsultantCardComponent_div_52_div_2_Template, 5, 1, "div", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 77)(4, "h3", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Comp\u00E9tences techniques");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, ConsultantCardComponent_div_52_span_7_Template, 2, 1, "span", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, ConsultantCardComponent_div_52_div_8_Template, 5, 1, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.consultant.sectors && ctx_r1.consultant.sectors.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.consultant.expertises && ctx_r1.consultant.expertises.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.consultant.skills);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.consultant.experiences && ctx_r1.consultant.experiences.length > 0);
  }
}
function ConsultantCardComponent_div_63_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 94);
  }
  if (rf & 2) {
    const i_r14 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction5"](1, _c8, i_r14 <= ctx_r1.getSeniorityBars(ctx_r1.consultant.experience), i_r14 > ctx_r1.getSeniorityBars(ctx_r1.consultant.experience), i_r14 === 1, i_r14 === 2, i_r14 === 3));
  }
}
function ConsultantCardComponent_ng_container_79_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "\u2022");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function ConsultantCardComponent_ng_container_79_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ConsultantCardComponent_ng_container_79_span_3_Template, 2, 0, "span", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const location_r15 = ctx.$implicit;
    const last_r16 = ctx.last;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](location_r15.trim());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !last_r16);
  }
}
function ConsultantCardComponent_span_81_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const skill_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", skill_r17, " ");
  }
}
function ConsultantCardComponent_span_82_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" +", ctx_r1.consultant.skills.length - 5, " ");
  }
}
function ConsultantCardComponent_div_89_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConsultantCardComponent_div_89_Template_div_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.onToggleExpansion(ctx_r1.consultant.id, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function ConsultantCardComponent_button_91_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConsultantCardComponent_button_91_Template_button_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r19);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.onToggleExpansion(ctx_r1.consultant.id, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Voir tout le message ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function ConsultantCardComponent_span_92_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span")(1, "button", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConsultantCardComponent_span_92_Template_button_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r20);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.onToggleExpansion(ctx_r1.consultant.id, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Masquer ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
}
function ConsultantCardComponent_div_95_div_1_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const sector_r21 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", sector_r21, " ");
  }
}
function ConsultantCardComponent_div_95_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 77)(1, "h3", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Secteurs d'activit\u00E9");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ConsultantCardComponent_div_95_div_1_span_4_Template, 2, 1, "span", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.consultant.sectors);
  }
}
function ConsultantCardComponent_div_95_div_2_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const expertise_r22 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", expertise_r22, " ");
  }
}
function ConsultantCardComponent_div_95_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 77)(1, "h3", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Expertises");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ConsultantCardComponent_div_95_div_2_span_4_Template, 2, 1, "span", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.consultant.expertises);
  }
}
function ConsultantCardComponent_div_95_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const skill_r23 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", skill_r23, " ");
  }
}
function ConsultantCardComponent_div_95_div_8_li_4_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const exp_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u2022 ", exp_r24.company, "");
  }
}
function ConsultantCardComponent_div_95_div_8_li_4_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "(Actuelle)");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function ConsultantCardComponent_div_95_div_8_li_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div")(3, "span", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, ConsultantCardComponent_div_95_div_8_li_4_span_5_Template, 2, 1, "span", 90)(6, ConsultantCardComponent_div_95_div_8_li_4_span_6_Template, 2, 0, "span", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const exp_r24 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](exp_r24.role);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", exp_r24.company);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", exp_r24.isCurrent);
  }
}
function ConsultantCardComponent_div_95_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div")(1, "h3", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Derni\u00E8res exp\u00E9riences");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "ul", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ConsultantCardComponent_div_95_div_8_li_4_Template, 7, 3, "li", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.consultant.experiences);
  }
}
function ConsultantCardComponent_div_95_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ConsultantCardComponent_div_95_div_1_Template, 5, 1, "div", 76)(2, ConsultantCardComponent_div_95_div_2_Template, 5, 1, "div", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 77)(4, "h3", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Comp\u00E9tences techniques");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, ConsultantCardComponent_div_95_span_7_Template, 2, 1, "span", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, ConsultantCardComponent_div_95_div_8_Template, 5, 1, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.consultant.sectors && ctx_r1.consultant.sectors.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.consultant.expertises && ctx_r1.consultant.expertises.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.consultant.skills);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.consultant.experiences && ctx_r1.consultant.experiences.length > 0);
  }
}
class ConsultantCardComponent {
  constructor() {
    this.expanded = false;
    this.messageExpanded = false;
    this.dropdownOpen = false;
    this.detailsExpanded = false; // Nouvelle propriété pour l'affichage des détails
    this.linkedinClick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.phoneClick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.emailClick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.toggleExpansion = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.toggleDropdown = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.toggleMessageExpansion = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.toggleDetailsExpansion = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter(); // Nouvel événement pour afficher/masquer les détails
  }
  /**
   * Get the experience level as 1-3 bars
   */
  getSeniorityBars(experience) {
    if (experience === 'less_than_3') return 1;
    if (experience === 'between_3_and_10') return 2;
    return 3;
  }
  /**
   * Format message with highlighted hashtags
   */
  formatMessage(message) {
    return message.replace(/#(\w+)/g, '<span class="text-blue-600 text-xs font-medium hover:text-blue-800 transition-colors duration-300">#$1</span>');
  }
  /**
   * Check if a message is long enough to be truncated
   * Utilise une combinaison de longueur et de nombre de lignes pour
   * déterminer si un message doit être tronqué
   * Algorithme optimisé pour considérer plus de messages comme "longs"
   */
  isMessageLong(message) {
    // Si le message est vide, il n'est pas long
    if (!message || message.trim() === '') return false;
    // Si le message dépasse un certain nombre de caractères (réduit à 100)
    if (message.length > 100) return true;
    // Si le message contient plusieurs lignes (toute ligne additionnelle compte)
    const lineCount = (message.match(/\n/g) || []).length + 1;
    if (lineCount > 1) return true;
    // Si le message contient beaucoup de mots (réduit à 15)
    const wordCount = message.split(/\s+/).length;
    if (wordCount > 15) return true;
    return false;
  }
  onLinkedInClick(url, event) {
    event.stopPropagation();
    if (this.consultant.linkedinValidated) {
      this.linkedinClick.emit(url);
    }
  }
  onPhoneClick(phone, event) {
    event.stopPropagation();
    if (this.consultant.phoneValidated) {
      this.phoneClick.emit(phone);
    }
  }
  onEmailClick(email, event) {
    event.stopPropagation();
    if (this.consultant.emailValidated) {
      this.emailClick.emit(email);
    }
  }
  onToggleExpansion(id, event) {
    event.stopPropagation();
    this.toggleExpansion.emit({
      id,
      expanded: !this.expanded
    });
  }
  onToggleDropdown(id, event) {
    event.stopPropagation();
    this.toggleDropdown.emit({
      id,
      event
    });
  }
  onToggleMessageExpansion(id, event) {
    event.stopPropagation();
    this.toggleMessageExpansion.emit({
      id,
      event
    });
  }
  onToggleDetailsExpansion(id, event) {
    event.stopPropagation();
    this.toggleDetailsExpansion.emit({
      id,
      event
    });
  }
  static {
    this.ɵfac = function ConsultantCardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ConsultantCardComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: ConsultantCardComponent,
      selectors: [["app-consultant-card"]],
      inputs: {
        consultant: "consultant",
        expanded: "expanded",
        messageExpanded: "messageExpanded",
        dropdownOpen: "dropdownOpen",
        detailsExpanded: "detailsExpanded"
      },
      outputs: {
        linkedinClick: "linkedinClick",
        phoneClick: "phoneClick",
        emailClick: "emailClick",
        toggleExpansion: "toggleExpansion",
        toggleDropdown: "toggleDropdown",
        toggleMessageExpansion: "toggleMessageExpansion",
        toggleDetailsExpansion: "toggleDetailsExpansion"
      },
      decls: 96,
      vars: 82,
      consts: [[1, "bg-white", "border", "border-gray-200", "rounded-md", "overflow-hidden", "shadow-md", "hover:shadow-lg", "transition-shadow", "duration-300", "hidden", "md:block"], [1, "w-full", "border-collapse"], [1, "transition-all", "duration-300", "hover:bg-gray-50", "cursor-pointer"], [1, "whitespace-nowrap", "p-2", "border-r", "border-gray-100", "w-16", "align-middle"], [1, "flex", "flex-col", "items-center", "justify-center", "h-full"], [1, "material-icons", "text-2xl", "mb-1", 3, "ngClass", "title"], [1, "text-xs", "text-gray-400", "text-center"], [1, "p-2", "pl-4", "align-top"], [1, "font-medium", "text-base", "mb-1.5", "flex", "items-center"], [1, "w-2.5", "h-2.5", "rounded-full", "mr-1.5", 3, "ngClass"], [1, "flex", "items-center", "mb-2"], [1, "flex", "space-x-0.5", "items-end", "h-3.5", "mr-3"], ["class", "w-1 rounded-sm", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "flex", "flex-wrap"], ["class", "skill-badge text-xs py-0 px-1.5 mb-0.5", 4, "ngFor", "ngForOf"], ["class", "text-xs text-gray-500 flex items-center ml-1", 4, "ngIf"], [1, "text-xs", "text-gray-600", "flex", "items-center"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-3.5", "w-3.5", "mr-0.5", "flex-shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 11a3 3 0 11-6 0 3 3 0 016 0z"], [4, "ngFor", "ngForOf"], [1, "py-2", "pr-4", "align-top", "w-24", "text-right"], [1, "hidden", "lg:flex", "lg:space-x-2", "mb-2"], [1, "action-button", 3, "click", "disabled", "title", "ngClass"], [1, "fab", "fa-linkedin", "text-blue-600"], [1, "fas", "fa-phone-alt", "text-green-600"], [1, "fas", "fa-envelope", "text-red-600"], [1, "lg:hidden"], [1, "relative"], ["type", "button", 1, "inline-flex", "justify-center", "px-3", "py-2", "w-10", "h-8", "text-sm", "font-medium", "text-gray-700", "bg-gray-100", "border", "border-gray-300", "rounded-md", "hover:bg-gray-200", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "transition-all", "duration-300", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-4", "w-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"], ["class", "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50", 3, "click", 4, "ngIf"], [1, "mt-2", "h-6"], [1, "px-4", "py-3", "border-t", "border-gray-100", "bg-gray-50", "transition-all", "duration-300"], [1, "mb-2"], [1, "text-sm", "font-medium", "text-gray-800", "mb-1"], [1, "text-sm", "text-gray-600", "consultantMessage", 3, "innerHTML"], ["class", "bg-gradient-overlay", 3, "click", 4, "ngIf"], [1, "flex", "justify-between", "mt-1"], ["class", "text-xs text-blue-600 hover:text-blue-800 hover:underline focus:outline-none transition-colors duration-300", 3, "click", 4, "ngIf"], [4, "ngIf"], [1, "text-xs", "text-blue-600", "hover:text-blue-800", "hover:underline", "focus:outline-none", "transition-colors", "duration-300", 3, "click"], [1, "mobile-consultant-card", "block", "md:hidden"], [1, "mobile-header-row"], [1, "flex", "items-center"], [1, "material-icons", "text-lg", "mr-1.5", 3, "ngClass"], [1, "text-xs", "text-gray-500", "mr-1.5"], [1, "w-2", "h-2", "rounded-full", "mr-1", 3, "ngClass"], [1, "flex", "space-x-0.5", "items-end", "h-2.5"], ["class", "w-0.5 rounded-sm", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "mobile-action-buttons"], [1, "w-6", "h-6", "flex", "items-center", "justify-center", "rounded-full", 3, "click", "disabled", "ngClass"], [1, "fab", "fa-linkedin", "text-blue-600", "text-xs"], [1, "fas", "fa-phone-alt", "text-green-600", "text-xs"], [1, "fas", "fa-envelope", "text-red-600", "text-xs"], [1, "px-4", "pt-2", "pb-3"], [1, "font-medium", "text-base", "mb-2.5"], [1, "text-xs", "text-gray-600", "flex", "items-center", "mb-2"], [1, "flex", "flex-wrap", "mt-2.5"], ["class", "skill-badge text-xs py-0.5 px-2 mb-1", 4, "ngFor", "ngForOf"], ["class", "text-xs text-gray-500 flex items-center ml-1 mb-1", 4, "ngIf"], [1, "px-4", "py-3", "border-t", "border-gray-100", "bg-gray-50", "mobile-scrollable-container", "transition-all", "duration-300"], [1, "w-1", "rounded-sm", 3, "ngClass"], [1, "skill-badge", "text-xs", "py-0", "px-1.5", "mb-0.5"], [1, "text-xs", "text-gray-500", "flex", "items-center", "ml-1"], [1, "location-badge"], ["class", "mx-1", 4, "ngIf"], [1, "mx-1"], [1, "origin-top-right", "absolute", "right-0", "mt-2", "w-48", "rounded-md", "shadow-lg", "bg-white", "ring-1", "ring-black", "ring-opacity-5", "focus:outline-none", "z-50", 3, "click"], ["role", "none", 1, "py-1"], ["href", "javascript:void(0)", 1, "flex", "items-center", "px-4", "py-2", "text-sm", "text-gray-700", "hover:bg-gray-100", "transition-colors", "duration-300", 3, "click"], [1, "fab", "fa-linkedin", "text-blue-600", "mr-2"], [1, "fas", "fa-phone-alt", "text-green-600", "mr-2"], [1, "fas", "fa-envelope", "text-red-600", "mr-2"], [1, "bg-gradient-overlay", 3, "click"], ["class", "mb-4", 4, "ngIf"], [1, "mb-4"], ["class", "skill-badge", 4, "ngFor", "ngForOf"], [1, "flex", "flex-wrap", "space-x-1"], ["class", "sector-badge", 4, "ngFor", "ngForOf"], [1, "sector-badge"], ["class", "expertise-badge", 4, "ngFor", "ngForOf"], [1, "expertise-badge"], [1, "skill-badge"], [1, "text-sm", "text-gray-600", "space-y-2"], ["class", "flex items-start", 4, "ngFor", "ngForOf"], [1, "flex", "items-start"], [1, "mt-0.5", "mr-1.5", "w-1.5", "h-1.5", "rounded-full", "bg-gray-400", "flex-shrink-0"], [1, "font-medium"], ["class", "ml-1", 4, "ngIf"], ["class", "text-xs ml-1 text-blue-600", 4, "ngIf"], [1, "ml-1"], [1, "text-xs", "ml-1", "text-blue-600"], [1, "w-0.5", "rounded-sm", 3, "ngClass"], [1, "skill-badge", "text-xs", "py-0.5", "px-2", "mb-1"], [1, "text-xs", "text-gray-500", "flex", "items-center", "ml-1", "mb-1"]],
      template: function ConsultantCardComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "table", 1)(2, "tr", 2)(3, "td", 3)(4, "div", 4)(5, "span", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "span", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td", 7)(10, "div", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "div", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 10)(14, "div", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, ConsultantCardComponent_div_15_Template, 1, 7, "div", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, ConsultantCardComponent_span_17_Template, 2, 1, "span", 14)(18, ConsultantCardComponent_span_18_Template, 2, 1, "span", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "svg", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "path", 18)(22, "path", 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "span", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](24, ConsultantCardComponent_ng_container_24_Template, 4, 2, "ng-container", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "td", 21)(26, "div", 22)(27, "button", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConsultantCardComponent_Template_button_click_27_listener($event) {
            return ctx.onLinkedInClick(ctx.consultant.linkedinUrl, $event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "i", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "button", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConsultantCardComponent_Template_button_click_29_listener($event) {
            return ctx.onPhoneClick(ctx.consultant.phone, $event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "i", 25);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "button", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConsultantCardComponent_Template_button_click_31_listener($event) {
            return ctx.onEmailClick(ctx.consultant.email, $event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "i", 26);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 27)(34, "div", 28)(35, "button", 29);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConsultantCardComponent_Template_button_click_35_listener($event) {
            return ctx.onToggleDropdown(ctx.consultant.id, $event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "svg", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](37, "path", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](38, ConsultantCardComponent_div_38_Template, 11, 18, "div", 32);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](39, "div", 33);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 34)(41, "div", 35)(42, "h3", 36);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "Message");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](45, "div", 37);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](46, ConsultantCardComponent_div_46_Template, 1, 0, "div", 38);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 39);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](48, ConsultantCardComponent_button_48_Template, 2, 0, "button", 40)(49, ConsultantCardComponent_span_49_Template, 3, 0, "span", 41);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "button", 42);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConsultantCardComponent_Template_button_click_50_listener($event) {
            return ctx.onToggleDetailsExpansion(ctx.consultant.id, $event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](52, ConsultantCardComponent_div_52_Template, 9, 4, "div", 41);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div", 43)(54, "div", 44)(55, "div", 45)(56, "span", 46);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "span", 47);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "div", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](61, "div", 48);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "div", 49);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](63, ConsultantCardComponent_div_63_Template, 1, 7, "div", 50);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "div", 51)(65, "button", 52);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConsultantCardComponent_Template_button_click_65_listener($event) {
            return ctx.onLinkedInClick(ctx.consultant.linkedinUrl, $event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](66, "i", 53);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "button", 52);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConsultantCardComponent_Template_button_click_67_listener($event) {
            return ctx.onPhoneClick(ctx.consultant.phone, $event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](68, "i", 54);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "button", 52);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConsultantCardComponent_Template_button_click_69_listener($event) {
            return ctx.onEmailClick(ctx.consultant.email, $event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](70, "i", 55);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "div", 56)(72, "div", 57);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "div", 58);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "svg", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](76, "path", 18)(77, "path", 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "span", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](79, ConsultantCardComponent_ng_container_79_Template, 4, 2, "ng-container", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "div", 59);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](81, ConsultantCardComponent_span_81_Template, 2, 1, "span", 60)(82, ConsultantCardComponent_span_82_Template, 2, 1, "span", 61);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "div", 62)(84, "div", 35)(85, "h3", 36);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](86, "Message");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "div", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](88, "div", 37);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](89, ConsultantCardComponent_div_89_Template, 1, 0, "div", 38);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "div", 39);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](91, ConsultantCardComponent_button_91_Template, 2, 0, "button", 40)(92, ConsultantCardComponent_span_92_Template, 3, 0, "span", 41);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "button", 42);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConsultantCardComponent_Template_button_click_93_listener($event) {
            return ctx.onToggleDetailsExpansion(ctx.consultant.id, $event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](94);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](95, ConsultantCardComponent_div_95_Template, 9, 4, "div", 41);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](51, _c0, !ctx.consultant.locked, ctx.consultant.locked))("title", ctx.consultant.locked ? "Profil verrouill\u00E9" : "Profil accessible");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.consultant.locked ? "lock" : "lock_open", " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("#", ctx.consultant.id, "");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction3"](54, _c1, ctx.consultant.availability === 0, ctx.consultant.availability === 1, ctx.consultant.availability === 2));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.consultant.role, " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](58, _c2));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.consultant.skills.slice(0, 3));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.consultant.skills.length > 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.consultant.location.split(","));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx.consultant.linkedinValidated)("title", ctx.consultant.linkedinValidated ? "Voir profil LinkedIn" : "LinkedIn non disponible")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](59, _c3, !ctx.consultant.linkedinValidated));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx.consultant.phoneValidated || !ctx.consultant.phone)("title", ctx.consultant.phoneValidated && ctx.consultant.phone ? "Appeler" : "T\u00E9l\u00E9phone non disponible")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](61, _c3, !ctx.consultant.phoneValidated || !ctx.consultant.phone));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx.consultant.emailValidated || !ctx.consultant.email)("title", ctx.consultant.emailValidated && ctx.consultant.email ? "Envoyer un email" : "Email non disponible")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](63, _c3, !ctx.consultant.emailValidated || !ctx.consultant.email));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.dropdownOpen);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("truncated", ctx.isMessageLong(ctx.consultant.message) && !ctx.expanded);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", ctx.formatMessage(ctx.consultant.message), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isMessageLong(ctx.consultant.message) && !ctx.expanded);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isMessageLong(ctx.consultant.message) && !ctx.expanded);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.expanded);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.detailsExpanded ? "Masquer les d\u00E9tails" : "Voir plus", " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.detailsExpanded);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](65, _c0, !ctx.consultant.locked, ctx.consultant.locked));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.consultant.locked ? "lock" : "lock_open", " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("#", ctx.consultant.id, "");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction3"](68, _c1, ctx.consultant.availability === 0, ctx.consultant.availability === 1, ctx.consultant.availability === 2));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](72, _c2));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx.consultant.linkedinValidated)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](73, _c4, !ctx.consultant.linkedinValidated, ctx.consultant.linkedinValidated));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx.consultant.phoneValidated || !ctx.consultant.phone)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](76, _c5, !ctx.consultant.phoneValidated || !ctx.consultant.phone, ctx.consultant.phoneValidated && ctx.consultant.phone));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx.consultant.emailValidated || !ctx.consultant.email)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](79, _c6, !ctx.consultant.emailValidated || !ctx.consultant.email, ctx.consultant.emailValidated && ctx.consultant.email));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.consultant.role, " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.consultant.location.split(","));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.consultant.skills.slice(0, 5));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.consultant.skills.length > 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("truncated", ctx.isMessageLong(ctx.consultant.message) && !ctx.expanded);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", ctx.formatMessage(ctx.consultant.message), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isMessageLong(ctx.consultant.message) && !ctx.expanded);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isMessageLong(ctx.consultant.message) && !ctx.expanded);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.expanded);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.detailsExpanded ? "Masquer les d\u00E9tails" : "Voir plus", " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.detailsExpanded);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf],
      styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  margin-bottom: 0.5rem;\n}\n\n.consultantMessage[_ngcontent-%COMP%] {\n  line-height: 1.5;\n  word-break: break-word;\n  padding: 0.5rem 0;\n}\n\n.truncated[_ngcontent-%COMP%] {\n  max-height: 45px;\n  overflow: hidden;\n  position: relative;\n}\n\n.bg-gradient-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 35px;\n  background: linear-gradient(to bottom, rgba(249, 250, 251, 0) 0%, rgba(249, 250, 251, 0.8) 60%, rgba(249, 250, 251, 0.95) 100%);\n  cursor: pointer;\n  border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n  transition: all 0.2s ease-in-out;\n}\n\n.bg-gradient-overlay[_ngcontent-%COMP%]:hover {\n  background: linear-gradient(to bottom, rgba(249, 250, 251, 0) 0%, rgba(219, 234, 254, 0.5) 60%, rgba(219, 234, 254, 0.8) 100%);\n  border-bottom: 2px solid rgba(59, 130, 246, 0.4);\n}\n\n.action-button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border-radius: 4px !important;\n  background-color: #f3f4f6;\n  color: #374151;\n  transition: all 0.2s ease-in-out;\n}\n\n.action-button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #e5e7eb;\n}\n\n.action-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  background-color: #f3f4f6;\n}\n\n.location-badge[_ngcontent-%COMP%] {\n  margin-right: 4px;\n}\n\n.skill-badge[_ngcontent-%COMP%] {\n  margin-right: 4px;\n  margin-bottom: 4px;\n}\n\n\n\ntd.p-2[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n}\n\n\n\ndiv[class*=\"bg-gray-50\"][_ngcontent-%COMP%] {\n  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnN1bHRhbnQtY2FyZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGlEQUFpRDtBQUNqRDtFQUNFLGNBQWM7RUFDZCxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsc0JBQXNCO0VBQ3RCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFNBQVM7RUFDVCxPQUFPO0VBQ1AsUUFBUTtFQUNSLFlBQVk7RUFDWiwrSEFBK0g7RUFDL0gsZUFBZTtFQUNmLGdEQUFnRDtFQUNoRCxnQ0FBZ0M7QUFDbEM7O0FBRUE7RUFDRSw4SEFBOEg7RUFDOUgsZ0RBQWdEO0FBQ2xEOztBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsV0FBVztFQUNYLFlBQVk7RUFDWiw2QkFBNkI7RUFDN0IseUJBQXlCO0VBQ3pCLGNBQWM7RUFDZCxnQ0FBZ0M7QUFDbEM7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixrQkFBa0I7QUFDcEI7O0FBRUEsd0RBQXdEO0FBQ3hEO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBLGdEQUFnRDtBQUNoRDtFQUNFLGlEQUFpRDtBQUNuRCIsImZpbGUiOiJjb25zdWx0YW50LWNhcmQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEN1c3RvbSBzdHlsZXMgcG91ciBsZXMgY2FydGVzIGRlIGNvbnN1bHRhbnRzICovXG46aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG59XG5cbi5jb25zdWx0YW50TWVzc2FnZSB7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7XG4gIHBhZGRpbmc6IDAuNXJlbSAwO1xufVxuXG4udHJ1bmNhdGVkIHtcbiAgbWF4LWhlaWdodDogNDVweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uYmctZ3JhZGllbnQtb3ZlcmxheSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgaGVpZ2h0OiAzNXB4O1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCByZ2JhKDI0OSwgMjUwLCAyNTEsIDApIDAlLCByZ2JhKDI0OSwgMjUwLCAyNTEsIDAuOCkgNjAlLCByZ2JhKDI0OSwgMjUwLCAyNTEsIDAuOTUpIDEwMCUpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZ2JhKDU5LCAxMzAsIDI0NiwgMC4yKTtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7XG59XG5cbi5iZy1ncmFkaWVudC1vdmVybGF5OmhvdmVyIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgcmdiYSgyNDksIDI1MCwgMjUxLCAwKSAwJSwgcmdiYSgyMTksIDIzNCwgMjU0LCAwLjUpIDYwJSwgcmdiYSgyMTksIDIzNCwgMjU0LCAwLjgpIDEwMCUpO1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgcmdiYSg1OSwgMTMwLCAyNDYsIDAuNCk7XG59XG5cbi5hY3Rpb24tYnV0dG9uIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB3aWR0aDogMzJweDtcbiAgaGVpZ2h0OiAzMnB4O1xuICBib3JkZXItcmFkaXVzOiA0cHggIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YzZjRmNjtcbiAgY29sb3I6ICMzNzQxNTE7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2UtaW4tb3V0O1xufVxuXG4uYWN0aW9uLWJ1dHRvbjpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlNWU3ZWI7XG59XG5cbi5hY3Rpb24tYnV0dG9uOmRpc2FibGVkIHtcbiAgb3BhY2l0eTogMC41O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjNmNGY2O1xufVxuXG4ubG9jYXRpb24tYmFkZ2Uge1xuICBtYXJnaW4tcmlnaHQ6IDRweDtcbn1cblxuLnNraWxsLWJhZGdlIHtcbiAgbWFyZ2luLXJpZ2h0OiA0cHg7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcbn1cblxuLyogU3R5bGUgc3VwcGzDqW1lbnRhaXJlIHBvdXIgbCdlc3BhY2VtZW50IGRlcyDDqWzDqW1lbnRzICovXG50ZC5wLTIge1xuICBwYWRkaW5nOiAwLjc1cmVtO1xufVxuXG4vKiBBbcOpbGlvcmF0aW9uIHZpc3VlbGxlIGRlIGxhIHBhcnRpZSBleHBhbmTDqWUgKi9cbmRpdltjbGFzcyo9XCJiZy1ncmF5LTUwXCJdIHtcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAycHggNHB4IDAgcmdiYSgwLCAwLCAwLCAwLjA1KTtcbn0iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9jb25zdWx0YW50LWNhcmQvY29uc3VsdGFudC1jYXJkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsaURBQWlEO0FBQ2pEO0VBQ0UsY0FBYztFQUNkLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixzQkFBc0I7RUFDdEIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsU0FBUztFQUNULE9BQU87RUFDUCxRQUFRO0VBQ1IsWUFBWTtFQUNaLCtIQUErSDtFQUMvSCxlQUFlO0VBQ2YsZ0RBQWdEO0VBQ2hELGdDQUFnQztBQUNsQzs7QUFFQTtFQUNFLDhIQUE4SDtFQUM5SCxnREFBZ0Q7QUFDbEQ7O0FBRUE7RUFDRSxvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixXQUFXO0VBQ1gsWUFBWTtFQUNaLDZCQUE2QjtFQUM3Qix5QkFBeUI7RUFDekIsY0FBYztFQUNkLGdDQUFnQztBQUNsQzs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGtCQUFrQjtBQUNwQjs7QUFFQSx3REFBd0Q7QUFDeEQ7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUEsZ0RBQWdEO0FBQ2hEO0VBQ0UsaURBQWlEO0FBQ25EO0FBQ0Esd3JHQUF3ckciLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDdXN0b20gc3R5bGVzIHBvdXIgbGVzIGNhcnRlcyBkZSBjb25zdWx0YW50cyAqL1xuOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xufVxuXG4uY29uc3VsdGFudE1lc3NhZ2Uge1xuICBsaW5lLWhlaWdodDogMS41O1xuICB3b3JkLWJyZWFrOiBicmVhay13b3JkO1xuICBwYWRkaW5nOiAwLjVyZW0gMDtcbn1cblxuLnRydW5jYXRlZCB7XG4gIG1heC1oZWlnaHQ6IDQ1cHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmJnLWdyYWRpZW50LW92ZXJsYXkge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIGhlaWdodDogMzVweDtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgcmdiYSgyNDksIDI1MCwgMjUxLCAwKSAwJSwgcmdiYSgyNDksIDI1MCwgMjUxLCAwLjgpIDYwJSwgcmdiYSgyNDksIDI1MCwgMjUxLCAwLjk1KSAxMDAlKTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgcmdiYSg1OSwgMTMwLCAyNDYsIDAuMik7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2UtaW4tb3V0O1xufVxuXG4uYmctZ3JhZGllbnQtb3ZlcmxheTpob3ZlciB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sIHJnYmEoMjQ5LCAyNTAsIDI1MSwgMCkgMCUsIHJnYmEoMjE5LCAyMzQsIDI1NCwgMC41KSA2MCUsIHJnYmEoMjE5LCAyMzQsIDI1NCwgMC44KSAxMDAlKTtcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHJnYmEoNTksIDEzMCwgMjQ2LCAwLjQpO1xufVxuXG4uYWN0aW9uLWJ1dHRvbiB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDMycHg7XG4gIGhlaWdodDogMzJweDtcbiAgYm9yZGVyLXJhZGl1czogNHB4ICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmM2Y0ZjY7XG4gIGNvbG9yOiAjMzc0MTUxO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLWluLW91dDtcbn1cblxuLmFjdGlvbi1idXR0b246aG92ZXI6bm90KDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTVlN2ViO1xufVxuXG4uYWN0aW9uLWJ1dHRvbjpkaXNhYmxlZCB7XG4gIG9wYWNpdHk6IDAuNTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YzZjRmNjtcbn1cblxuLmxvY2F0aW9uLWJhZGdlIHtcbiAgbWFyZ2luLXJpZ2h0OiA0cHg7XG59XG5cbi5za2lsbC1iYWRnZSB7XG4gIG1hcmdpbi1yaWdodDogNHB4O1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG59XG5cbi8qIFN0eWxlIHN1cHBsw4PCqW1lbnRhaXJlIHBvdXIgbCdlc3BhY2VtZW50IGRlcyDDg8KpbMODwqltZW50cyAqL1xudGQucC0yIHtcbiAgcGFkZGluZzogMC43NXJlbTtcbn1cblxuLyogQW3Dg8KpbGlvcmF0aW9uIHZpc3VlbGxlIGRlIGxhIHBhcnRpZSBleHBhbmTDg8KpZSAqL1xuZGl2W2NsYXNzKj1cImJnLWdyYXktNTBcIl0ge1xuICBib3gtc2hhZG93OiBpbnNldCAwIDJweCA0cHggMCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4839)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map