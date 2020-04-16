const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createMember,
  getMemberByMemberId,
  getMembers,
  updateMember,
  deleteMember
} = require("./member.controller");
router.get("/list", checkToken, getMembers);
router.post("/create", checkToken, createMember);
router.get("/getById/:id", checkToken, getMemberByMemberId);
router.patch("/update", checkToken, updateMember);
router.delete("/delete", checkToken, deleteMember);

module.exports = router; 
