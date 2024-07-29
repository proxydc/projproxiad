//queries reg accounts
const getAccounts = "select a.*, r.role_name from account a, role r where a.role_id = r.id order by a.id asc";
const getAccountById = "select * from account where id = $1";
const checkLoginExists = "select * from account a where a.login_name = $1";
const addAccount = "insert into account(login_name, display_name, pass_word, role_id) values ($1, $2, $3, $4)";
const updateAccount = "update account set display_name = $2, pass_word = $3, role_id = $4 where id = $1";
const deleteAccountById = "delete from account where id = $1";
const getAuthentification = "select * from account a where a.login_name = $1 and a.pass_word = $2";

//queries reg DCS
const getDCs = "select d.*, ds.label as status_name, acc.display_name as manager_name from dc d, dc_status ds, account acc where d.dc_status = ds.id and d.manager_id = acc.id order by d.creation_date desc";
const getDCsByManagerID = "select d.*, ds.label as status_name, acc.display_name as manager_name from dc d, dc_status ds, account acc where d.dc_status = ds.id and d.manager_id = acc.id and d.ref_managers LIKE $1 order by d.creation_date desc";
const getDCById = "select d.*, acc.display_name as manager_name, ds.label as status_name from dc d, dc_status ds, account acc where d.id = $1 and d.dc_status = ds.id and d.manager_id = acc.id ";
const getDCByIdCandidat = "select d.*, ds.label as status_name from dc d, dc_status ds where d.id = $1 and d.dc_status = ds.id";
const getDCDocById = "select dc.document, dc.familyname, dc.firstname, dc.nbexps, dc.poste from dc where id = $1 limit 1";
const checkDCExists = "select a from dc a where a.email = $1";
const addDC = "insert into dc(familyname, firstname, email, dc_status, document, manager_id, ref_managers, nbexps, creation_date, modification_date) values ($1, $2, $3, $4, $5, $6, $7, 0, $8, $9)"; // add tags ici
const updateDCByAdmin = "update dc set familyname=$2, firstname=$3, email=$4, dc_status=$5, tags = $6, nbexps = $7, poste = $8, modification_date = $9, ref_managers = $10 where id = $1"; //controle sur email
const updateDCDoc = "update dc set document = $2, dc_status=$3 where id = $1";
const deleteDCById = "delete from dc where id = $1";
const getDCsParDate = "select d.*, ds.label as status_name, acc.display_name as manager_name from dc d, dc_status ds, account acc where d.dc_status = ds.id and d.manager_id = acc.id and d.creation_date >= $1 and  d.creation_date <= $2 order by d.creation_date desc";
const getDCsByManagerIDParDate = "select d.*, ds.label as status_name, acc.display_name as manager_name from dc d, dc_status ds, account acc where d.dc_status = ds.id and d.manager_id = acc.id and d.ref_managers LIKE $1 and d.creation_date >= $2 and  d.creation_date <= $3 order by d.creation_date desc";


//queries reg DC-Status
const getAllDcStatus = "select * from dc_status";

module.exports = {
    getAuthentification,
    getAccounts,
    getAccountById,
    checkLoginExists,
    addAccount,
    updateAccount,
    deleteAccountById,

    getDCs,
    getDCsByManagerID,
    getDCById,
    getDCByIdCandidat,
    getDCDocById,
    checkDCExists,
    addDC,
    deleteDCById,
    updateDCByAdmin,
    updateDCDoc,
    getAllDcStatus,
    getDCsParDate,
    getDCsByManagerIDParDate



};