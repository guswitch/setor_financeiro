const express = require('express');
const routes = express.Router();
const requireDir = require('require-dir');

const UsersController = require('./app/controllers/UsersController');
const SessionController = require('./app/controllers/SessionController');
// const controllers = requireDir('./app/controllers')

const authMiddleware = require('./app/middleware/auth');
const AccountsPayable = require('./app/controllers/AccountsPayableController');
const CreditorController = require('./app/controllers/CreditorController');
const DepartmmentController = require('./app/controllers/DepartmmentController');
const DebtorController = require('./app/controllers/DebtorController');
const AccountsReceivableController = require('./app/controllers/AccountsReceivableController');


// Primeira rota
routes.get('/',(req,res) => {res.send('hello world');})

// Rotas de Login 
routes.post('/Session', SessionController.Store);
// routes.post('/Session/PostUser', SessionController.ReturnUserByToken);

// Middleware de verificação de token 
routes.get('/VerifyToken', authMiddleware, (req,res)=>{res.json('Autenticado')});

// User Routes
routes.get('/Users', UsersController.Index);
routes.get('/Users/Profile/:id', UsersController.Profile);
routes.post('/Register', UsersController.Register);
routes.put('/User/UpdateProfile/:id', UsersController.UpdateProfile);
routes.delete('/User/DeleteProfile/:id', UsersController.DeleteProfile);
routes.get('/User/ConfirmEmail/:token', UsersController.ConfirmEmail);
routes.post('User/ResendEmail', UsersController.ResendEmail);
routes.put('/User/UpdatePassword', UsersController.UpdatePassword);
routes.post('/RecoverPassword', UsersController.RecoverPassword);
routes.post('/RecoverPassword/ComparePin', UsersController.ComparePin);

// Departments Routes
routes.get('/Department/', DepartmmentController.Index);
routes.get('/Department/:id', DepartmmentController.Details);
routes.post('/Department/Create', DepartmmentController.Create);
routes.put('/Department/Update/:id', DepartmmentController.Update);
routes.delete('/Department/Delete/:id', DepartmmentController.Delete);

// Creditor Routes
routes.get('/Creditor/', CreditorController.Index);
routes.get('/Creditor/:id', CreditorController.Details);
routes.post('/Creditor/Create', CreditorController.Create);
routes.put('/Creditor/Update/:id', CreditorController.Update);
routes.delete('/Creditor/Delete/:id', CreditorController.Delete);

// Accounts Payable Routes
routes.get('/AccountsPayable/', AccountsPayable.Index);
routes.get('/AccountsPaid/', AccountsPayable.IndexAccountsPaid);
routes.get('/AccountsPayable/:id', AccountsPayable.Details);
routes.post('/AccountsPayable/Create', AccountsPayable.Create);
routes.put('/AccountsPayable/Update/:id', AccountsPayable.Update);
routes.delete('/AccountsPayable/Delete/:id', AccountsPayable.Delete);

// Debtor Routes
routes.get('/Debtor/', DebtorController.Index);
routes.get('/Debtor/:id', DebtorController.Details);
routes.post('/Debtor/Create', DebtorController.Create);
routes.put('/Debtor/Update/:id', DebtorController.Update);
routes.delete('/Debtor/Delete/:id', DebtorController.Delete);

// Accounts Receivable Routes
routes.get('/AccountsReceivable/', AccountsReceivableController.Index);
routes.get('/AccountsReceived/', AccountsReceivableController.IndexAccountsReceived);
routes.get('/AccountsReceivable/:id', AccountsReceivableController.Details);
routes.post('/AccountsReceivable/Create', AccountsReceivableController.Create);
routes.put('/AccountsReceivable/Update/:id', AccountsReceivableController.Update);
routes.delete('/AccountsReceivable/Delete/:id', AccountsReceivableController.Delete);

module.exports = routes;