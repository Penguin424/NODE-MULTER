import { Request, Response, response } from 'express';
import Photo from '../models/Photos';
import fs from 'fs-extra';
import { resolve } from 'path';

export const createPhoto = async(req: Request, res: Response): Promise<Response> => 
{
    const { title, description } = req.body;

    const newPhoto = 
    {
        title,
        description,
        imagePath: req.file.path,
    }

    const photo = new Photo(newPhoto);
    const photoDB = await photo.save();

    return res.json({
        ok: true,
        photoDB
    });

}

export const getPhotos = async(req: Request, res: Response): Promise<Response> => 
{
    const photosDB = await Photo.find({});

    return res.status(200).send(photosDB);
}

export const getPhoto = async(req: Request, res: Response): Promise<Response> => 
{
    const photoDB = await Photo.findById(req.params.id);

    return res.status(200).json({
        ok: true,
        photoDB
    });
}

export const deletePhoto = async(req: Request, res: Response): Promise<Response> => 
{
    const { id } = req.params;     

    const photodeleteDB = await Photo.findByIdAndDelete(id);

    if(photodeleteDB)
    {
        await fs.unlink(resolve(photodeleteDB.imagePath));
    }

    return res.status(200).json({
        ok: true,
        photodeleteDB
    });
}

export const updatePhoto = async(req: Request, res: Response) => 
{
    const {id} = req.params;
    const {title, description} = req.body;
    const updatedPhoto = await Photo.findByIdAndUpdate(id, {
        title,
        description
    });
    return res.status(200).json({
        ok: true,
        updatedPhoto
    });
}