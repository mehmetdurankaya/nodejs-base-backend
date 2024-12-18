const express =require("express");
const router = express.Router();
const Response = require("../lib/Response");
const Roles = require("../models/Roles");
const RolePrivileges = require("../models/RolePrivileges");
const ErrorResponse = require("../lib/Error");
const CustomError = require("../lib/Error");
const Enum = require("../config/Enum");
const mongoose = require("mongoose");
const role_privileges = require("../config/role_privileges");
const auth= require("../lib/auth")();
const config = require("../config/config");
const i18n=new(require("../lib/i18n"))(config.DEFAULT_LANG);




router.all("*",auth.authenticate(),(req,res,next)=>{
    next();
})




router.get("/",auth.checkRoles("roles_view") ,async(req,res)=>{
    try {
        let roles= await Roles.find({})
        res.json(Response.successResponse(roles));
    } catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse)
    }
});
router.post("/add", auth.checkRoles("role_add"), async (req, res) => {
    let body = req.body;
    try {

        if (!body.role_name) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, i18n.translate("COMMON.VALIDATION_ERROR_TITLE", req.user.language),i18n.translate("COMMON.FIELD_MUST_BE_FILLED", req.user.language, ["role_name"]));
        if (!body.permissions || !Array.isArray(body.permissions) || body.permissions.length == 0) {
            throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, i18n.translate("COMMON.VALIDATION_ERROR_TITLE", req.user.language),i18n.translate("COMMON.FIELD_MUST_BE_TYPE", req.user.language, ["permissions", "Array"]));
        }

        let role = new Roles({
            role_name: body.role_name,
            is_active: true,
            created_by: req.user?.id
        });

        await role.save();

        for (let i = 0; i < body.permissions.length; i++) {
            let priv = new RolePrivileges({
                role_id: role._id,
                permission: body.permissions[i],
                created_by: req.user?.id
            });

            await priv.save();
        }


        res.json(Response.successResponse({ success: true }));

    } catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
});
router.put("/update",auth.checkRoles("roles_update") ,async (req, res) => {
    let body = req.body;

    try {
        // Güncellenecek alanlar için kontrol
        let updates = {};
        if (!body._id) {
            throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, i18n.translate("COMMON.VALIDATION_ERROR_TITLE", req.user.language), i18n.translate("COMMON.FIELD_MUST_BE_FILLED", req.user.language, ["_id"]));
        }

        if (body.role_name) {
            updates.role_name = body.role_name;
        }
        if (typeof body.is_active === "boolean") {
            updates.is_active = body.is_active;
        }

        // permissions alanını güncelle
        if (body.permissions && Array.isArray(body.permissions) && body.permissions.length > 0) {
            // Mevcut izinleri getir
            let permissions = await RolePrivileges.find({ role_id: body._id });

            // Silinmesi gereken izinleri belirle
            let removedPermissions = permissions.filter(x => !body.permissions.includes(x.permission));
            // Eklenmesi gereken yeni izinleri belirle
            let newPermissions = body.permissions.filter(x => !permissions.map(p => p.permission).includes(x));

            // Silinmesi gereken izinleri kaldır
            if (removedPermissions.length > 0) {
                await RolePrivileges.deleteMany({ _id: { $in: removedPermissions.map(x => x._id) } });
            }

            // Yeni izinleri ekle
            if (newPermissions.length > 0) {
                for (let i = 0; i < newPermissions.length; i++) {
                    let priv = new RolePrivileges({
                        role_id: body._id,
                        permission: newPermissions[i],
                        created_by: req.user?.id
                    });
                    await priv.save();
                }
            }
        }

        // Roles koleksiyonunu güncelle
        await Roles.updateOne({ _id: body._id }, updates);

        // Başarılı yanıt
        res.json(Response.successResponse({ success: true }));
    } catch (err) {
        // Hata yanıtı
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
});

router.delete("/delete",auth.checkRoles("roles_delete") ,async (req, res) => {
    let body = req.body;
    try {

        if (!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, i18n.translate("COMMON.VALIDATION_ERROR_TITLE", req.user.language),i18n.translate("COMMON.FIELD_MUST_BE_FILLED", req.user.language, ["_id"]));

        await Roles.remove({ _id: body._id });

        res.json(Response.successResponse({ success: true }));

    } catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
});

router.get("/role_privileges", async (req, res) => {
    res.json(role_privileges);
})

router.get("/role_privileges", async (req, res )=>{
    res.json(role_privileges);
});
module.exports= router;