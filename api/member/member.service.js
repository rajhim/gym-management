const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into member_info(fullName, gender, address, mobileno,
                phoneno, email, dob, photo, package, status) 
                values(?,?,?,?,?,?,?,?,?)`,
      [
        data.fullname,
        data.gender,
        data.address,
        data.mobileno,
        data.phoneno,
        data.email,
        data.dob,
        data.photo, 
        data.package,
        data.status
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getMemberByMemberId: (id, callBack) => {
    pool.query(
      `select id,fullName, gender, address, mobileno,
      phoneno, email, dob, photo, package, status from member_info where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getMembers: callBack => {
    pool.query(
      `select id,fullName, gender, address, mobileno,
      phoneno, email, dob, photo, package, status from member_info`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateMember: (data, callBack) => {
    pool.query(
      `update registration set fullName=?, gender=?, email=?, password=?, phoneNumber=?, status=? where id = ?`,
      [
        data.fullname,
        data.gender,
        data.email,
        data.password,
        data.phoneNo,
        data.status,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteMember: (data, callBack) => {
    pool.query(
      `delete from registration where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
