import { Router } from 'express';

import MessageController from '../controllers/message.controller';


const router = Router();

router.post('/', MessageController.sendNewMessage);
router.get('/', MessageController.getAllMessages);

export default router;