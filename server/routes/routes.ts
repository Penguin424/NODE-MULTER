import { Router } from 'express';
import multer from '../lib/multer';

import * as controllerPh from '../controllers/controllerPhoto';

const router = Router();

router.post('/photos', multer.single('image'), controllerPh.createPhoto);
router.get('/photos', controllerPh.getPhotos);
router.get('/photos/:id', controllerPh.getPhoto);
router.delete('/photos/:id', controllerPh.deletePhoto);
router.put('/photos/:id', controllerPh.updatePhoto);

export {router};