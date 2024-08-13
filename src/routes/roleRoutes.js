import express from 'express';
import { createRole, assignPermissionsToRole, getRoles } from '../controllers/roleController.js';
import { authorize } from '../middlewares/authorize.js';

const router = express.Router();

// Only Admins should have access to these routes
router.post('/create', createRole);
router.post('/assign-permissions', assignPermissionsToRole);
router.get('/', authorize(['view_roles']), getRoles);

export default router;

// manage_users
// authorize(['manage_roles']),